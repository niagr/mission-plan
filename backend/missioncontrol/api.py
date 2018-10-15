from rest_framework.decorators import api_view
from rest_framework.response import Response

from missioncontrol import services

class APIResponse(Response):
    """All API responses must use this class instead of Response"""
    def __init__(self, *, data=None, user_msg=None, **kwargs):
        data = data or {}
        if user_msg:
            data['userMsg'] = user_msg
        super().__init__(data=data, **kwargs)


@api_view(['GET'])
def health_check(request):
    return APIResponse(status=200)


@api_view(['GET'])
def get_tasks(request):
    tasks = services.get_tasks()
    tasks = [{'name': t.name, 'desc': t.description} for t in tasks]
    return APIResponse(status=200, data={'tasks': tasks})


@api_view(['POST'])
def create_task(request):
    name = request.POST.get('name')
    desc = request.POST.get('desc')
    if not all([name, desc]):
        return APIResponse(status=400, user_msg="'name' and 'desc' params are required.")
    new_task = services.create_task(name, desc)
    return APIResponse(status=201, data={'taskId': new_task.id}, user_msg='Task created.')
