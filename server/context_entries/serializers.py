from rest_framework import serializers

from .models import ContextEntries


class ContextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextEntries
        fields = "__all__"
