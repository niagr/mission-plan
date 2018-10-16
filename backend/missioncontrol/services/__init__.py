from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

from missioncontrol.models import Task


def get_tasks():
    return Task.objects.all()


def create_task(name, desc):
    return Task.objects.create(name=name, description=desc)


class TaskStatusError(Exception):
    pass


def change_task_status(task_id, to_status):
    if to_status not in Task.STATUS_CHOICES:
        raise TaskStatusError(f"'{to_status}' is not a valid status")
    try:
        task = Task.objects.get(id=task_id)
    except ObjectDoesNotExist as ex:
        raise TaskStatusError(f'Task with ID "{task_id}" not found') from ex
    task.status = to_status
    task.save()