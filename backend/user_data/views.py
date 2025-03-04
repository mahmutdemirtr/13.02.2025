from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
import stripe
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView
from .models import Email, Survey, SearchedUsername, SubscriptionDetails
from .serializer import EmailSerializer, SurveySerializer, SubscriptionDetailSerializer
from .scrape_insta import fetch_user

stripe.api_key = settings.STRIPE_SECRET_KEY

# Create your views here.
class EmailViewSet(ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.get_object()
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)

class SurveyViewSet(ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    def list(self, request):
        email = self.request.session.get('email')
        print(email)
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.get_object()
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        email = serializer.validated_data.pop('email')
        print(email)
        if not email:
            raise serializers.ValidationError({'detail': 'Session email is missing.'})
        username = SearchedUsername.objects.first()
        if not username:
            raise serializers.ValidationError({'detail': 'No username found in the database.'})
        client_email = Email.objects.filter(email=email).first()
        if not client_email:
            raise serializers.ValidationError({'detail': 'Client email not found.'})
        serializer.save(client_email=client_email, username_searched=username)
        


class StoreUsername(APIView):
    def get(self, request):
        query = SearchedUsername.objects.first()
        if query:
            return Response({'username': query.username})
        else:
            return Response({'username': 'No username found'})
    def post(self, request):
        username = request.data.get('username')
        if username:
            if (SearchedUsername.objects.count() == 0):
                SearchedUsername.objects.create(username=username)
            else:
                SearchedUsername.objects.all().delete()
                SearchedUsername.objects.create(username=username)
            return Response({'username': username})
        else:
            return Response({'error': 'Username not found'}, status=400)

class ScrapeData(APIView):
    def get(self, request):
        username = SearchedUsername.objects.first().username
        print(username)
        user_info = fetch_user(username)
        print(user_info)
        return Response(user_info)

@api_view(["POST"])
def process_subscription(request):
    try:
        email = request.data.get('email')
        payment_method_id = request.data.get("payment_method_id")
        if not email or not payment_method_id:
            return Response({"error": "Payment method ID and Email are required"}, status=400)

        customers = stripe.Customer.list(email=email).data
        if customers:
            customer = customers[0]
            stripe.PaymentMethod.attach(payment_method_id, customer=customer.id)
            stripe.Customer.modify(
                customer.id,
                invoice_settings={'default_payment_method': payment_method_id}
            )
        else:
            customer = stripe.Customer.create(
                email=email,
                payment_method=payment_method_id,
                invoice_settings={"default_payment_method": payment_method_id},
            )

        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": settings.STRIPE_PRICE_ID}],
            expand=["latest_invoice.payment_intent"],
        )

        payment_intent = subscription.latest_invoice.payment_intent
        if payment_intent.status != "succeeded":
            return Response({"error": "Payment failed", "status": payment_intent.status}, status=400)

        return Response({"success": True, "subscription_id": subscription.id})

    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=400)

@api_view(["POST"])
def check_subscription(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        customers = stripe.Customer.list(email=email).data
        if not customers:
            return Response({"subscribed": False})

        customer = customers[0]

        subscriptions = stripe.Subscription.list(customer=customer.id, status="active").data
        
        if subscriptions:
            return Response({"subscribed": True})
        
        return Response({"subscribed": False})

    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=400)
