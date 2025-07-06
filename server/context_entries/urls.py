from django.urls import path

from .views import ContextEntriesView

urlpatterns = [
    path("context/", ContextEntriesView.as_view(), name="context-list-create")
]
