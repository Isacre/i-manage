from djoser.views import UserViewSet
from rest_framework.response import Response
from rest_framework import status


class CustomUserViewSet(UserViewSet):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Usuário criado com sucesso"}, status=status.HTTP_201_CREATED)
