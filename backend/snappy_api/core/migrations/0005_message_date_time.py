# Generated by Django 3.2.9 on 2021-11-29 04:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20211129_0433'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 11, 29, 4, 47, 46, 929475)),
            preserve_default=False,
        ),
    ]
