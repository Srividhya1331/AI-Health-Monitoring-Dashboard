from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Health, Settings, UserProfile
from .serializers import HealthSerializer


# 🔧 Normalize email (IMPORTANT)
def normalize_email(email):
    return (email or "").strip().lower()


# 🔐 REGISTER
@api_view(["POST"])
def register_view(request):
    email = normalize_email(request.data.get("email"))
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    if User.objects.filter(username=email).exists():
        return Response({"error": "User already exists"}, status=400)

    # ✅ Create Django user
    user = User.objects.create_user(
        username=email,
        email=email,
        password=password
    )

    # ✅ Create profile
    UserProfile.objects.get_or_create(
        email=email,
        defaults={"name": email.split("@")[0]},
    )

    return Response({
        "status": "registered",
        "user": user.username,
    })


# 🔐 LOGIN (WORKS FOR ANY REGISTERED USER)
@api_view(["POST"])
def login_view(request):
    email = normalize_email(request.data.get("email"))
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    try:
        user = User.objects.get(username=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Account not found. Please register first."},
            status=404,
        )

    if not user.check_password(password):
        return Response({"error": "Wrong password"}, status=400)

    # ✅ Ensure profile exists
    UserProfile.objects.get_or_create(
        email=email,
        defaults={"name": email.split("@")[0]},
    )

    return Response({
        "token": "dummy-token",
        "user": user.username,
    })


# 📊 DASHBOARD (USER-SPECIFIC)
@api_view(["GET"])
def dashboard(request):
    email = normalize_email(request.GET.get("email"))

    if not email:
        return Response({"error": "Email required"}, status=400)

    # ✅ Get or create profile
    user_profile, _ = UserProfile.objects.get_or_create(
        email=email,
        defaults={"name": email.split("@")[0]},
    )

    # ✅ Get or create settings
    settings_obj, _ = Settings.objects.get_or_create(user=user_profile)

    # ✅ Add default health data if empty
    if Health.objects.filter(user=user_profile).count() == 0:
        Health.objects.create(
            user=user_profile,
            age=22,
            heart_rate=75,
            blood_pressure="120/80",
        )
        Health.objects.create(
            user=user_profile,
            age=25,
            heart_rate=82,
            blood_pressure="130/85",
        )

    # ✅ Fetch data
    health_data = Health.objects.filter(user=user_profile).order_by("created_at")
    serializer = HealthSerializer(health_data, many=True)

    return Response({
        "user": user_profile.name,
        "email": user_profile.email,
        "threshold": settings_obj.heart_rate_threshold,
        "data": serializer.data,
    })


# ➕ ADD HEALTH DATA
@api_view(["POST"])
def add_health(request):
    email = normalize_email(request.data.get("email"))

    if not email:
        return Response({"error": "Email required"}, status=400)

    try:
        user = UserProfile.objects.get(email=email)
    except UserProfile.DoesNotExist:
        return Response({"error": "User not found"}, status=400)

    serializer = HealthSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=user)
        return Response({
            "status": "success",
            "data": serializer.data,
        })

    return Response(serializer.errors, status=400)


# ⚙️ UPDATE SETTINGS
@api_view(["POST"])
def update_settings(request):
    email = normalize_email(request.data.get("email"))

    if not email:
        return Response({"error": "Email required"}, status=400)

    try:
        user = UserProfile.objects.get(email=email)
    except UserProfile.DoesNotExist:
        return Response({"error": "User not found"}, status=400)

    settings_obj, _ = Settings.objects.get_or_create(user=user)

    settings_obj.heart_rate_threshold = request.data.get(
        "threshold", settings_obj.heart_rate_threshold
    )
    settings_obj.alert_sound = request.data.get(
        "sound", settings_obj.alert_sound
    )

    settings_obj.save()

    return Response({
        "status": "updated",
        "threshold": settings_obj.heart_rate_threshold,
        "sound": settings_obj.alert_sound,
    })