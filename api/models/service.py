from django.db import models
from api.models.base_model import BaseModel
from api.models.company import Company

class Service(BaseModel):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=264)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    max_duration = models.IntegerField(blank=False, null=False)
    price = models.FloatField(blank=False, null=False)
    
    class Meta:
        db_table = 'service'

