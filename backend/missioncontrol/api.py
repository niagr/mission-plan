from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response as DRFResponse
from rest_framework.views import APIView

from .models import Task, Board


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

    @staticmethod
    def get(request, board_id):
        """
        Get list of tasks
        :return APIResponse 200 Array of task objects
        """
        tasks = Board.get_tasks(board_id)
        return APIResponse(status=200, data={'tasks': [t.to_json() for t in tasks]})

    @staticmethod
    def post(request, board_id):
        """
        Create new task
        :return: APIResponse:
                    200 The new task object
                    400 Wrong params
        """
        name = request.POST.get('name')
        desc = request.POST.get('desc')
        if not all([name, desc]):
            return APIResponse(status=400, user_msg="'name' and 'desc' params are required.")
        try:
            new_task = Task.create_task(board_id, name, desc)
        except ObjectDoesNotExist:
            return APIResponse(status=404, user_msg=f'Board with ID {board_id} not found')
        return APIResponse(status=201, data={'task': new_task.to_json()}, user_msg='Task created.')


class TaskAPIView(APIView):

    @staticmethod
    def get(request, board_id, task_id):
        """
        Gets the task with the specified ID
        :param task_id: ID of the task to retrieve
        :return: APIResponse:
                    200 The task object
                    404 If the task with specified ID does not exist
        """
        try:
            task = Task.objects.get(id=task_id)
            return APIResponse(status=200, data={'task': task.to_json()})
        except ObjectDoesNotExist:
            return APIResponse(status=404, user_msg='Task not found')

    @staticmethod
    def put(request, task_id):
        """
        Modify a task.
        POST params: name, desc, status
        :param task_id: ID of the task to modify
        :return: APIResponse:
                    200 The updated task
                    400 Wrong params
                    404 If the task with specified ID does not exist
        """
        name = request.data.get('name')
        desc = request.data.get('desc')
        status = request.data.get('status')
        if status and not Task.is_status_valid(status):
            return APIResponse(status=400, user_msg=f"'{status}' is not a valid status")
        try:
            task = Task.update_task_by_id(task_id, name=name, desc=desc, status=status)
        except ObjectDoesNotExist:
            return APIResponse(status=404, user_msg='Task not found')
        return APIResponse(status=200, data={'task': task.to_json()}, user_msg='Task updated.')


class BoardListAPIView(APIView):

    @staticmethod
    def post(request):
        name = request.POST.get('name')
        if not name:
            return APIResponse(status=400, user_msg="The 'name' param is required")
        name = name.lower()
        if not Board.is_name_valid(name):
            return APIResponse(status=400, user_msg="Invalid name. Board names may contain a-z, 0-9, and a '-' (hyphen)"
                                                    " anywhere between the first and last characters ")
        try:
            board = Board.create_board(name=name)
        except Board.DuplicateError:
            return APIResponse(status=400, user_msg="A board with this name already exists")
        return APIResponse(status=201, user_msg="Board created successfully", data=board.to_json())

    @staticmethod
    def get(request):
        boards = Board.get_all_boards()
        return APIResponse(status=200, data={'boards': [b.to_json() for b in boards]})


class BoardAPIView(APIView):

    @staticmethod
    def get(request, board_id):
        try:
            board = Board.get_board(board_id)
            return APIResponse(status=200, data=board.to_json())
        except ObjectDoesNotExist:
            return APIResponse(status=404, user_msg=f'No board with ID {board_id} found')
