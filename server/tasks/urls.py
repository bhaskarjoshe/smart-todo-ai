from django.urls import path

from .views import CategoryListView
from .views import TaskDetailView
from .views import TaskListView

urlpatterns = [
    path("tasks/", TaskListView.as_view(), name="task-list-create"),
    path("tasks/<int:pk>/", TaskDetailView.as_view(), name="task-detail"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
]
