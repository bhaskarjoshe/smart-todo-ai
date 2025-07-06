from django.contrib import admin
from django.urls import include
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("tasks.urls")),
    path("api/", include("context_entries.urls")),
    path("api/ai/", include("ai.urls")),
]
