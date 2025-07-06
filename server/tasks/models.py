from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    usage_count = models.IntegerField(default=0)

    class Meta:
        db_table = "category"

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICE = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    priority_score = models.IntegerField(default=0)
    deadline = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "task"

    def __str__(self):
        return self.title
