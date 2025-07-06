from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from server.tasks.models import Category
from server.tasks.models import Task
from server.tasks.serializers import CategorySerializer
from server.tasks.serializers import TaskSerailzer


class TaskListView(APIView):
    def get(self, request):
        tasks = Task.objects.all().order_by("-created_at")
        serializer = TaskSerailzer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskSerailzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
