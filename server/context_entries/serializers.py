from rest_framework import serializers

from .models import ContextEntries


class ContextEntrySerializer(serializers.Serializer):
    class Meta:
        model = ContextEntries
        fields = "__all__"
