# models.py
from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    cmp_id = models.CharField(max_length=10, unique=True,null=True, blank=True)
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    radius = models.IntegerField(default=100)

    def __str__(self):
        return f"{self.name} ({self.cmp_id})"

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    id = models.IntegerField(unique=True, blank=True, primary_key=True)
    phone = models.CharField(max_length=15,null=True, blank=True)
    company = models.ForeignKey(Location, on_delete=models.CASCADE,null=True, related_name='employees',blank=True)

    def __str__(self):
        return f"({self.id})"

class AttendanceRecord(models.Model):
    user = models.ForeignKey(Employee, on_delete=models.CASCADE)
    company = models.ForeignKey(Location, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attendance by {self.user.username} on {self.timestamp}"
