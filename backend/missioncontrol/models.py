from django.db import models


class Task(models.Model):
    name = models.TextField()
    description = models.TextField()
