from datetime import datetime, timedelta
import arrow
from api.models.booking import Booking
from api.models.company_schedule import CompanySchedule
from api.utils.utils import round_time_to_next_10min
from dateutil import tz, parser

class CompanyModule:
    def __init__(self):
        pass

    def get_booking_start_time(self, now, target_date, opens_at):
       """
       Defines the first available for booking, if the selected date is today, the next rounded available slot, if not, the moment the company opens at
       """
       if now.date() == target_date:
           return round_time_to_next_10min(now)
       return opens_at

    def get_company_hours(self, date_str, company, service_max_duration):
       """
       Returns date, opens_at and closes_at formatted with timezone for datetime manipulation.
       Usa horários individuais por dia se disponíveis, caso contrário usa os horários padrão da empresa.
       """
       timezone_obj = tz.gettz(company.timezone or 'America/Sao_Paulo')
       now = arrow.now(timezone_obj)
       date = parser.parse(date_str).date()
       
       # Obter o dia da semana (0=Segunda, 6=Domingo)
       day_of_week = date.weekday()
       
       # Tentar obter horário específico do dia
       try:
           schedule = CompanySchedule.objects.get(company=company, day_of_week=day_of_week, enabled=True)
           opens_at_time = schedule.opens_at
           closes_at_time = schedule.closes_at
       except CompanySchedule.DoesNotExist:
           # Fallback para horários padrão da empresa
           opens_at_time = company.opens_at
           closes_at_time = company.closes_at
       
       opens_at = arrow.get(datetime.combine(date, opens_at_time), tzinfo=timezone_obj)
       closes_datetime = datetime.combine(date, closes_at_time)
       closes_at = arrow.get(closes_datetime - timedelta(minutes=service_max_duration), tzinfo=timezone_obj)

       return date, opens_at, closes_at, now


       