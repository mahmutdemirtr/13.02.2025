# Generated by Django 5.1.2 on 2025-01-20 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_data', '0002_searchedusername'),
    ]

    operations = [
        migrations.AlterField(
            model_name='survey',
            name='age',
            field=models.CharField(max_length=30),
        ),
    ]
