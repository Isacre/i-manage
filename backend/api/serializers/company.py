from api.models.company import Company
from api.models.company_schedule import CompanySchedule
from rest_framework import serializers

class CompanyScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanySchedule
        fields = ['day_of_week', 'enabled', 'opens_at', 'closes_at']

class DayScheduleSerializer(serializers.Serializer):
    enabled = serializers.BooleanField()
    opens_at = serializers.CharField()
    closes_at = serializers.CharField()

class CompanySerializer(serializers.ModelSerializer):
    schedule = serializers.SerializerMethodField()
    # Campo write_only para aceitar schedule no update
    schedule_data = serializers.DictField(
        child=DayScheduleSerializer(),
        required=False,
        allow_null=True,
        write_only=True
    )
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'phone', 'identifier', 'opens_at', 'closes_at', 'image', 'work_days', 'timezone', 'address', 'banner', 'primary_color', 'keywords', 'schedule', 'schedule_data']
    
    def get_schedule(self, obj):
        """Retorna o schedule formatado como um dicionário com chaves de 0-6"""
        schedules = CompanySchedule.objects.filter(company=obj).order_by('day_of_week')
        schedule_dict = {}
        for schedule in schedules:
            schedule_dict[str(schedule.day_of_week)] = {
                'enabled': schedule.enabled,
                'opens_at': schedule.opens_at.strftime('%H:%M'),
                'closes_at': schedule.closes_at.strftime('%H:%M'),
            }
        # Preencher dias faltantes com valores padrão desabilitados
        for day in range(7):
            if str(day) not in schedule_dict:
                schedule_dict[str(day)] = {
                    'enabled': False,
                    'opens_at': '08:00',
                    'closes_at': '18:00',
                }
        return schedule_dict

class CompanyRegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    timezone = serializers.CharField()
    identifier = serializers.CharField()
    address = serializers.CharField()
    keywords = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    schedule = serializers.DictField(
        child=DayScheduleSerializer(),
        required=False,
        allow_null=True
    )
    image = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    banner = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    
