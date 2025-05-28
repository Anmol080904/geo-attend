
from django.urls import path
from employees import views
urlpatterns = [
    path("register-company/", views.register_company, name="register_company"),
    path("create-employee/", views.create_employee, name="create_employee"),
    path("employee/<int:employee_id>/", views.get_employee, name="get_employee"),
    path("employee/<int:employee_id>/update/", views.update_employee, name="update_employee"),
    path("employee/<int:employee_id>/delete/", views.delete_employee, name="delete_employee"),
    path("mark-attendance/", views.mark_attendance, name="mark_attendance"),
    path("attendance-records/", views.get_all_attendance_records, name="get_attendance_records"),
    path("login/",views.login_user,name="login_user"),
    path("logout/", views.logout_user, name="logout_user"),
]
