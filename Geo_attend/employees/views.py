# views.py
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
import json
from .models import Employee, Location, AttendanceRecord
from .utils import is_within_geofence

# Utility to generate unique company ID
def generate_cmp_id():
    last_company = Location.objects.order_by('-id').first()
    next_id = 1 if not last_company else last_company.id + 1
    return f"CMP{next_id:04d}"

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    try:
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"status": "success", "message": "Logged in"})
        else:
            return JsonResponse({"status": "error", "message": "Invalid credentials"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)
@csrf_exempt
@require_http_methods(["POST"])
def logout_user(request):
    logout(request)
    return JsonResponse({"status": "success", "message": "Logged out"})
@csrf_exempt
@require_http_methods(["POST"])
def register_company(request):
    try:
        data = json.loads(request.body)
        name, email = data["name"], data["email"]
        lat, lng = data["lat"], data["lng"]
        radius = data.get("radius", 100)

        if Location.objects.filter(name=name).exists():
            return JsonResponse({"status": "error", "message": "Company already exists"}, status=400)

        cmp_id = generate_cmp_id()
        company = Location.objects.create(cmp_id=cmp_id, name=name, email=email, latitude=lat, longitude=lng, radius=radius)

        return JsonResponse({"status": "success", "company_id": company.id, "cmp_id": cmp_id})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def mark_attendance(request):
    try:
        data = json.loads(request.body)
        lat, lng, id= float(data["lat"]), float(data["lng"]), data["id"]

        employee = get_object_or_404(Employee, id=id)
        location = employee.company

        if not location:
            return JsonResponse({"status": "error", "message": "Company location not assigned."}, status=400)

        if is_within_geofence((lat, lng), location):
            AttendanceRecord.objects.create(user=employee, company=location, latitude=lat, longitude=lng)
            return JsonResponse({"status": "success", "message": "Attendance marked"})
        else:
            return JsonResponse({"status": "failed", "message": "Outside your company location zone"})

    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["GET"])
@login_required
def get_all_attendance_records(request):
    try:
        records = AttendanceRecord.objects.select_related("user", "company").all()

        result = []
        for record in records:
            result.append({
                "employee_id": record.user.id,
                "employee_name": f"{record.user.first_name} {record.user.last_name}",
                "company_name": record.company.name,
                "latitude": record.latitude,
                "longitude": record.longitude,
                "timestamp": record.timestamp.strftime("%Y-%m-%d %H:%M:%S") if record.timestamp else "N/A"
            })

        return JsonResponse({"status": "success", "records": result}, status=200)

    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def create_employee(request):
    try:
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        phone = data.get("phone")
        company_name = data.get("company")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"status": "error", "message": "User already exists"}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({"status": "error", "message": "Email already used"}, status=400)

        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )

        company = Location.objects.filter(name=company_name).first()
        if not company:
            return JsonResponse({"status": "error", "message": "Company not found"}, status=404)

        employee = Employee.objects.create(
            user=user,
            phone=phone,
            company=company
        )

        return JsonResponse({
            "status": "success",
            "user_id": user.id,
            "employee_id": employee.id
        })

    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)


@csrf_exempt
@require_http_methods(["GET"])
@login_required
def get_employee(request, employee_id):
    try:
        employee = get_object_or_404(Employee, id=employee_id)
        user = employee.user

        data = {
            "id": employee.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": employee.phone,
            "company": employee.company.name if employee.company else None
        }

        return JsonResponse({"status": "success", "employee": data})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)


@csrf_exempt
@require_http_methods(["PUT"])
@login_required
def update_employee(request, employee_id):
    try:
        data = json.loads(request.body)
        employee = get_object_or_404(Employee, id=employee_id)
        user = employee.user

        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.email = data.get("email", user.email)
        if data.get("password"):
            user.password = make_password(data["password"])
        user.save()

        employee.phone = data.get("phone", employee.phone)
        employee.save()

        return JsonResponse({"status": "success", "message": "Employee updated"})

    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)


@csrf_exempt
@require_http_methods(["DELETE"])
@login_required
def delete_employee(request, employee_id):
    try:
        employee = get_object_or_404(Employee, id=employee_id)
        user = employee.user

        # Deleting the Employee also deletes the User (cascade)
        user.delete()

        return JsonResponse({"status": "success", "message": "Employee deleted"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)