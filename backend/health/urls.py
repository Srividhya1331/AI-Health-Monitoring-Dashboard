from django.urls import path
from .views import register_view, login_view, dashboard, add_health, update_settings

urlpatterns = [
    path("register/", register_view),
    path("login/", login_view),
    path("dashboard/", dashboard),
    path("add-health/", add_health),
    path("settings/", update_settings),
]