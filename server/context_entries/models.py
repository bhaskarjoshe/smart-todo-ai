from django.db import models


class ContextEntries(models.Model):
    SOURCE_CHOICES = [
        ("whatsapp", "Whatsapp"),
        ("email", "Email"),
        ("note", "Note"),
    ]

    content = models.TextField()
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    insights = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "context_entries"

    def __str__(self):
        return f"{self.source}: {self.content[:30]}"
