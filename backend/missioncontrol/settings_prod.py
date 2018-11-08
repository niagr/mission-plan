from .settings import *
from .settings import REST_FRAMEWORK as REST_FRAMEWORK_COMMON

DEBUG = False

REST_FRAMEWORK = {
    **REST_FRAMEWORK_COMMON,
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}