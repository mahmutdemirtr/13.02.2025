from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Email, Survey, SearchedUsername
from .serializer import EmailSerializer, SurveySerializer
from .scrape_insta import fetch_user


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