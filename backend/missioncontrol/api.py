from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response as DRFResponse
from rest_framework.views import APIView

from . import services
from .models import Task


class APIResponse(DRFResponse):
    """All API responses must use this class instead of Response"""
    def __init__(self, *, data=None, user_msg=None, **kwargs):
        data = data or {}
        if user_msg:
            data['userMsg'] = user_msg
        super().__init__(data=data, **kwargs)


@api_view(['GET'])
def health_check(request):
    return APIResponse(status=200)


class TaskListAPIView(APIView):

    def get(self, request):
        tasks = services.get_tasks()
        return APIResponse(status=200, data={'tasks': tasks})

    def post(self, request):
        name = request.POST.get('name')
        desc = request.POST.get('desc')
        if not all([name, desc]):
            return APIResponse(status=400, user_msg="'name' and 'desc' params are required.")
        new_task = services.create_task(name, desc)
        return APIResponse(status=201, data={'task': new_task}, user_msg='Task created.')


class TaskAPIView(APIView):

    def get(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
            return APIResponse(status=200, data={'task': task.to_json()})
        except ObjectDoesNotExist:
            return APIResponse(status=404, user_msg='Task not found')

    def put(self, request, task_id):
        name = request.data.get('name')
        desc = request.data.get('desc')
        status = request.data.get('status')
        if status and not Task.is_status_valid(status):
            return APIResponse(status=400, user_msg=f"'{status}' is not a valid status")
        try:
            task = Task.objects.get(id=task_id)
        except ObjectDoesNotExist:
            return APIResponse(status=404, user_msg='Task not found')
        if name:
            task.name = name
        if desc:
            task.description = desc
        if status:
            task.status = status
        task.save()
        return APIResponse(status=200, user_msg='Task updated.')



