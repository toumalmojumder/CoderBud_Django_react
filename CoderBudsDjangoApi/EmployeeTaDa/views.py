from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from EmployeeTaDa.models import EmployeeName, Paid, TADA
from EmployeeTaDa.serializers import EmployeeNameSerializer,PaidSerializer,TADASerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def EmployeeNameApi(request,id=0):
    if request.method=='GET':
        employeeNames = EmployeeName.objects.all()
        employeeNames_Serializer = EmployeeNameSerializer(employeeNames, many=True)
        return JsonResponse(employeeNames_Serializer.data, safe=False)

    elif request.method=='POST':
        employeeName_data=JSONParser().parse(request)
        employeeName_serializer = EmployeeNameSerializer(data=employeeName_data)
        if employeeName_serializer.is_valid():
            employeeName_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        employeeName_data = JSONParser().parse(request)
        employeeName=EmployeeName.objects.get(EmployeeId=employeeName_data['EmployeeId'])
        employeeName_serializer=EmployeeNameSerializer(employeeName,data=employeeName_data)
        if employeeName_serializer.is_valid():
            employeeName_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        employeeName=EmployeeName.objects.get(EmployeeId=id)
        employeeName.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def PaidApi(request,id=0):
    if request.method=='GET':
        paids = Paid.objects.all()
        paids_Serializer = PaidSerializer(paids, many=True)
        return JsonResponse(paids_Serializer.data, safe=False)

    elif request.method=='POST':
        paid_data=JSONParser().parse(request)
        paid_serializer = PaidSerializer(data=paid_data)
        if paid_serializer.is_valid():
            paid_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        paid_data = JSONParser().parse(request)
        paid=Paid.objects.get(PaidId=paid_data['paid_data'])
        paid_serializer=PaidSerializer(paid,data=paid_data)
        if paid_serializer.is_valid():
            paid_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        paid=Paid.objects.get(PaidId=id)
        paid.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def TADAApi(request,id=0):
    if request.method=='GET':
        tadas = TADA.objects.all()
        tadas_Serializer = TADASerializer(tadas, many=True)
        return JsonResponse(tadas_Serializer.data, safe=False)

    elif request.method=='POST':
        tada_data=JSONParser().parse(request)
        tada_serializer = TADASerializer(data=tada_data)
        if tada_serializer.is_valid():
            tada_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        tada_data = JSONParser().parse(request)
        tada=TADA.objects.get(Id=tada_data['tada_data'])
        tada_serializer=PaidSerializer(tada,data=tada_data)
        if tada_serializer.is_valid():
            tada_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        tada=TADA.objects.get(Id=id)
        tada.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
