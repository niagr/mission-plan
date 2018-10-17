from django.db import models

class Task(models.Model):

    STATUS_PENDING = 'PENDING'
    STATUS_IN_PROGRESS = 'IN_PROGRESS'
    STATUS_REVIEW = 'REVIEW'
    STATUS_DONE = 'DONE'

    STATUS_CHOICES = {STATUS_PENDING: 'PENDING',
                      STATUS_IN_PROGRESS: 'IN_PROGRESS',
                      STATUS_REVIEW: 'REVIEW',
                      STATUS_DONE: 'DONE',}

    name = models.TextField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=tuple(STATUS_CHOICES.items()), default=STATUS_PENDING)

    @classmethod
    def is_status_valid(cls, status):
        return status in cls.STATUS_CHOICES

    def to_json(self):
        return {'id': self.id,
                'name': self.name,
                'desc': self.description,
                'status': self.status}
