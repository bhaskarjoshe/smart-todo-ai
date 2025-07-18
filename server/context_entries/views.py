from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContextEntries
from .serializers import ContextEntrySerializer


class ContextEntriesView(APIView):
    def get(self, request):
        context = ContextEntries.objects.all().order_by("-created_at")
        serializer = ContextEntrySerializer(context, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ContextEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
