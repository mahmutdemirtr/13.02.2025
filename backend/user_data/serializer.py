from rest_framework import serializers
from .models import Email, Survey

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['email']

class SurveySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    class Meta:
        model = Survey
        fields = ('client_email', 'email', 'username_searched', 'gender', 'age', 'insta_activity', 'device_used', 'most_used_app_after_insta')
        extra_kwargs = {
            'client_email': {'read_only': True},
            'username_searched': {'read_only': True},
        }