from rest_framework import serializers

from .models import Category
from .models import Task


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class TaskSerialzer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True, source="category"
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "category",
            "category_id",
            "priority_score",
            "deadline",
            "status",
            "created_at",
            "updated_at",
        ]
