from django.db import models
from api.models.base_model import BaseModel

DAY_CHOICES = [
    (0, 'Segunda-feira'),
    (1, 'Terça-feira'),
    (2, 'Quarta-feira'),
    (3, 'Quinta-feira'),
    (4, 'Sexta-feira'),
    (5, 'Sábado'),
    (6, 'Domingo'),
]

class CompanySchedule(BaseModel):
    """
    Armazena horários de funcionamento individuais para cada dia da semana
    """
    company = models.ForeignKey(
        'api.Company',
        on_delete=models.CASCADE,
        related_name='schedules'
    )
    day_of_week = models.IntegerField(
        choices=DAY_CHOICES,
        null=False,
        blank=False
    )
    enabled = models.BooleanField(default=True)
    opens_at = models.TimeField(null=False, blank=False)
    closes_at = models.TimeField(null=False, blank=False)

    class Meta:
        db_table = 'company_schedule'
        unique_together = [['company', 'day_of_week']]
        ordering = ['day_of_week']

    def __str__(self):
        day_name = dict(DAY_CHOICES)[self.day_of_week]
        return f"{self.company.name} - {day_name}: {self.opens_at} às {self.closes_at}"

