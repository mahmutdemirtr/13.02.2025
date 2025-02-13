from django.db import models

# Create your models here.
class Email(models.Model):
    email = models.EmailField(max_length=128, null=False)

    def save(self, *args, **kwargs):
        if not Email.objects.filter(email=self.email).exists():
            super().save(*args, **kwargs)

    def __str__(self):
        return self.email

class Survey(models.Model):
    username_searched = models.CharField(max_length=30, null=False)
    gender = models.CharField(max_length=30, null=False)
    age = models.CharField(max_length=30, null=False)
    insta_activity = models.CharField(max_length=60, null=False)
    device_used = models.CharField(max_length=30, null=False)
    most_used_app_after_insta = models.CharField(max_length=30, null=False)
    client_email = models.ForeignKey(
        Email,
        on_delete=models.CASCADE,
    )

class SearchedUsername(models.Model):
    username = models.CharField(max_length=30)

    def __str__(self):
        return self.username