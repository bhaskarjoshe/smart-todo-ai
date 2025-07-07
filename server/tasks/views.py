from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category
from .models import Task
from .serializers import CategorySerializer
from .serializers import TaskSerialzer


class TaskListView(APIView):
    def get(self, request):
        try:
            tasks = Task.objects.all().order_by("-created_at")
            serializer = TaskSerialzer(tasks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Failed to fetch tasks", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        try:
            serializer = TaskSerialzer(data=request.data)
            if serializer.is_valid():
                task = serializer.save()
                if task.category:
                    task.category.usage_count += 1
                    task.category.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "Failed to create task", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CategoryListView(APIView):
    def get(self, request):
        try:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Failed to fetch categories", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        try:
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "Failed to create category", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
