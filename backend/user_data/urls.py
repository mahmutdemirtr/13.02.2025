from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import SurveyViewSet, EmailViewSet, StoreUsername, ScrapeData, process_subscription, check_subscription

router = DefaultRouter()
router.register(r'emails', EmailViewSet, basename='email')
router.register(r'surveys', SurveyViewSet, basename='survey')

urlpatterns = [
    path('store_username/', StoreUsername.as_view(), name='store_username'),
    path('scrape/', ScrapeData.as_view(), name='scrape_data'),
    path('pay/', process_subscription, name='process_subscription'),
    path('check_subscription/', check_subscription, name='check subscription'),
    path('', include(router.urls))
]
