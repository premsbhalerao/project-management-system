from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

# Demo data
projects = [
    {"id": 1, "name": "Website Design"},
    {"id": 2, "name": "Mobile App"},
]

tasks = [
    {"id": 1, "title": "Design homepage", "status": "TODO"},
    {"id": 2, "title": "Fix bugs", "status": "IN_PROGRESS"},
]

def get_projects(request):
    return JsonResponse(projects, safe=False)

def get_tasks(request):
    return JsonResponse(tasks, safe=False)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/projects/', get_projects),
    path('api/tasks/', get_tasks),
]