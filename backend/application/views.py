from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from application.models import Lead
from application.serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    '''CRUD для сделок'''
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = []

    def get_permissions(self):
        """
        Разрешаем создание заявок всем (AllowAny),
        остальные операции только авторизованным
        пользователям (IsAuthenticated)
        """
        if self.action == 'create':
            return [AllowAny()]
        else:
            return [IsAuthenticated()]
