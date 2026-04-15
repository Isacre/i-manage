from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import (
    company, 
    service,
    files,
    healthcheck,
)
from rest_framework import permissions
from users.views import CustomUserViewSet

schema_view = get_schema_view(
   openapi.Info(
      title="iManage API",
      default_version='v1',
      description="Gerenciamento de agendas e serviços",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()

router.register(
    r"company",
    company.CompanyViewSet,
    basename="company"
)

router.register(
    r"service",
    service.ServiceViewSet,
    basename="service"
)

router.register(
    r"files",
    files.TemporaryImageUploadView,
    basename="files"
)

urlpatterns = [
    path("", include(router.urls)),
    path('auth/users/', CustomUserViewSet.as_view({'post': 'create'}), name='user-create'),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('healthcheck/', healthcheck.HealthCheckView.as_view(), name='healthcheck'),
]