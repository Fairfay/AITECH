from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)

from application.views import (
    LeadViewSet
)


# Инициализация DRF-роутера для автоматической генерации URL по ViewSets
router = DefaultRouter()
router.register(r'leads', LeadViewSet, basename='leads')

urlpatterns = [
    # API маршруты
    path('api/identity/', include('identity.urls')),
    path('api/v1/', include(router.urls)),
    path('api/admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
# Добавление отладочных инструментов и медиафайлов в режиме DEBUG
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)),]
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
