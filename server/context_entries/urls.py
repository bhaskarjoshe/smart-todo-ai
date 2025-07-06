from django.urls import path

from server.context_entries.views import ContextEntriesView

urlpatterns = [
    path("context/", ContextEntriesView.as_view(), name="context-list-create")
]
