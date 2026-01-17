# Generated manually for CompanySchedule model

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_booking_calendar_event_alter_company_closes_at_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompanySchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('day_of_week', models.IntegerField(choices=[(0, 'Segunda-feira'), (1, 'Terça-feira'), (2, 'Quarta-feira'), (3, 'Quinta-feira'), (4, 'Sexta-feira'), (5, 'Sábado'), (6, 'Domingo')])),
                ('enabled', models.BooleanField(default=True)),
                ('opens_at', models.TimeField()),
                ('closes_at', models.TimeField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='api.company')),
            ],
            options={
                'db_table': 'company_schedule',
                'ordering': ['day_of_week'],
            },
        ),
        migrations.AddConstraint(
            model_name='companyschedule',
            constraint=models.UniqueConstraint(fields=['company', 'day_of_week'], name='unique_company_day'),
        ),
    ]

