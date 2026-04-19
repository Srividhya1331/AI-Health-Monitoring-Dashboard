from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect


# ✅ redirect root → dashboard API
def root_redirect(request):
    return redirect("/api/dashboard/")


urlpatterns = [
    path("", root_redirect),          # 🔥 NO MESSAGE NOW
    path("admin/", admin.site.urls),
    path("api/", include("health.urls")),
]