from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import SurveyViewSet, EmailViewSet, StoreUsername, ScrapeData, create_checkout_session, stripe_webhook

router = DefaultRouter()
router.register(r'emails', EmailViewSet, basename='email')
router.register(r'surveys', SurveyViewSet, basename='survey')

urlpatterns = [
    path('store_username/', StoreUsername.as_view(), name='store_username'),
    path('scrape/', ScrapeData.as_view(), name='scrape_data'),
    path('create-checkout-session/', create_checkout_session, name="create_checkout_session"),
    path('', include(router.urls)),
    path("webhook/", stripe_webhook, name="stripe_webhook"),
]
