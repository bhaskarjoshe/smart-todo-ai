from django.contrib import admin

from .models import Category
from .models import Task

admin.site.register(Task)
admin.site.register(Category)
