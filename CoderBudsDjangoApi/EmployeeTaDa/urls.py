from django.conf.urls import url
from EmployeeTaDa import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^employeename/$',views.EmployeeNameApi),
    url(r'^employeename/([0-9]+)$',views.EmployeeNameApi),

    url(r'^paid/$',views.PaidApi),
    url(r'^paid/([0-9]+)$',views.PaidApi),

    url(r'^tada/$',views.TADAApi),
    url(r'^tada/([0-9]+)$',views.TADAApi),
  
]