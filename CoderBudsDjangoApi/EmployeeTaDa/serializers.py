from rest_framework import serializers
from EmployeeTaDa.models import EmployeeName, Paid, TADA

class EmployeeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeName
        fields = ('EmployeeId',
                  'EmployeeName')

class  PaidSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Paid
        fields = ('PaidId',
                  'Paid')


class TADASerializer(serializers.ModelSerializer):
    class Meta:
        model = TADA
        fields = ('Id',
                  'Date'
                  'employee_name',
                  'travel_cost',
                  'lunch_cost',
                  'instruments_cost',
                  'paid')