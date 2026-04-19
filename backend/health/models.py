from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

class Settings(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    heart_rate_threshold = models.IntegerField(default=100)
    alert_sound = models.BooleanField(default=True)

class Health(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    age = models.IntegerField()
    heart_rate = models.IntegerField()
    blood_pressure = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)