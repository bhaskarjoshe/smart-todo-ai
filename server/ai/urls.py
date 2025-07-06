from django.urls import path

from .views import AISuggestionView

urlpatterns = [
    path("suggest/", AISuggestionView.as_view(), name="ai-suggest"),
]
