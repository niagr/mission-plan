import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication, CSRFCheck
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied

from .models import User


class JWTTokenAuthentication(BaseAuthentication):

    model = None

    def get_model(self):
        return User

    def authenticate(self, request):
        token = request.COOKIES.get('authToken')
        self.enforce_csrf(request)
        if not token:
            raise AuthenticationFailed('No auth token found in cookies')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            email = payload['email']
            userid = payload['id']
            user = User.objects.get(email=email,
                                    id=userid,
                                    is_active=True)
        except (jwt.ExpiredSignature, jwt.DecodeError, jwt.InvalidTokenError, jwt.exceptions.InvalidSignatureError):
            raise AuthenticationFailed('Invalid auth token')
        except User.DoesNotExist:
            raise AuthenticationFailed('No such user')
        return user, token

    def enforce_csrf(self, request):
        """
        Enforce CSRF validation for session based authentication.
        """
        reason = CSRFCheck().process_view(request, None, (), {})
        if reason:
            # CSRF failed, bail with explicit error message
            raise PermissionDenied('CSRF Failed: %s' % reason)
