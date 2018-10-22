import re
import uuid

from django.core.exceptions import ValidationError
from django.db import models, IntegrityError


class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.TextField(unique=True)

    class DuplicateError(IntegrityError):
        pass

    @staticmethod
    def is_name_valid(name):
        m = re.match(r'^[a-z0-9][a-z0-9\-]+[a-z0-9]$', name)
        if m is None:
            return False
        else:
            return True

    @classmethod
    def create_board(cls, name):
        if cls.is_name_valid(name):
            try:
                return cls.objects.create(name=name)
            except IntegrityError as ex:
                if 'UNIQUE constraint failed' in str(ex):
                    raise cls.DuplicateError from ex
                else:
                    raise
        else:
            raise ValidationError('Invalid name')

    @classmethod
    def get_board(cls, board_id):
        return cls.objects.get(id=board_id)

    @classmethod
    def get_all_boards(cls):
        return cls.objects.all()

    @classmethod
    def get_tasks(cls, board_id):
        return cls.get_board(board_id).tasks.all()

    def to_json(self):
        return {'id': self.id,
                'name': self.name}


class Task(models.Model):

    STATUS_PENDING = 'PENDING'
    STATUS_IN_PROGRESS = 'IN_PROGRESS'
    STATUS_REVIEW = 'REVIEW'
    STATUS_DONE = 'DONE'

    STATUS_CHOICES = {STATUS_PENDING: 'PENDING',
                      STATUS_IN_PROGRESS: 'IN_PROGRESS',
                      STATUS_REVIEW: 'REVIEW',
                      STATUS_DONE: 'DONE'}

    board = models.ForeignKey(to=Board, on_delete=models.CASCADE, related_name='tasks')
    name = models.TextField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=tuple(STATUS_CHOICES.items()), default=STATUS_PENDING)

    class DuplicateError(IntegrityError):
        pass

    @classmethod
    def is_status_valid(cls, status):
        return status in cls.STATUS_CHOICES

    @classmethod
    def create_task(cls, board_id, name, desc):
        board = Board.get_board(board_id)
        return cls.objects.create(name=name, description=desc, board=board)

    @classmethod
    def get_task(cls, task_id):
        return cls.objects.get(id=task_id)

    @classmethod
    def update_task(cls, task, *, name=None, desc=None, status=None):
        if status:
            if not cls.is_status_valid(status):
                raise ValidationError('Invalid status')
            task.status = status
        if name:
            task.name = name
        if desc:
            task.description = desc
        task.save()
        return task

    @classmethod
    def update_task_by_id(cls, task_id, **kwargs):
        task = cls.get_task(task_id)
        return cls.update_task(task, **kwargs)

    def to_json(self):
        return {'id': self.id,
                'name': self.name,
                'desc': self.description,
                'status': self.status}
