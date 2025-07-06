from django.urls import path

from server.tasks.views import CategoryListView
from server.tasks.views import TaskListView

urlpatterns = [
    path("tasks/", TaskListView.as_view(), name="task-list-create"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
]
