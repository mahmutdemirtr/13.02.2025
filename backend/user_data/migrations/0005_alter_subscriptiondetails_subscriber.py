# Generated by Django 4.2.18 on 2025-03-04 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_data', '0004_subscriptiondetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptiondetails',
            name='subscriber',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_data.email'),
        ),
    ]
