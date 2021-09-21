from django.db import models

# Create your models here.

class EmployeeName(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=100)
    

class Paid(models.Model):
    PaidId = models.AutoField(primary_key=True)
    Paid = models.CharField(max_length=100)
    

class TADA(models.Model):
    date = models.DateField()
    employee_name = models.ForeignKey(EmployeeName,on_delete=models.CASCADE)
    travel_cost = models.DecimalField(max_digits=6, decimal_places=2)
    lunch_cost = models.DecimalField(max_digits=6, decimal_places=2)
    instruments_cost = models.DecimalField(max_digits=6, decimal_places=2)
    paid = models.ForeignKey(Paid,on_delete=models.CASCADE)


