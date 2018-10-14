from django.db import IntegrityError

from missioncontrol.models import Task


def get_tasks():
    return Task.objects.all()


def create_task(name, desc):
    return Task.objects.create(name=name, description=desc)
