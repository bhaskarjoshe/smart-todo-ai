from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category
from .models import Task
from .serializers import CategorySerializer
from .serializers import TaskSerialzer


class TaskListView(APIView):
    def get(self, request):
        tasks = Task.objects.all().order_by("-created_at")
        serializer = TaskSerialzer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskSerialzer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            if task.category:
                task.category.usage_count += 1
                task.category.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
