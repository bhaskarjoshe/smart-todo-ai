from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .ai_module.suggest_task import suggest_task


class AISuggestionView(APIView):
    def post(self, request):
        task = request.data.get("task")
        context = request.data.get("context", [])

        if not task:
            return Response(
                {"error": "missing task data"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            result = suggest_task(task, context)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
