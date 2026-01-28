"""
Views for TaskFlow API
"""

from rest_framework import viewsets, generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Project, Task
from .serializers import (
    UserRegistrationSerializer, 
    UserSerializer,
    ProjectSerializer, 
    ProjectDetailSerializer,
    TaskSerializer, 
    TaskCreateSerializer,
    DashboardSerializer
)
from .permissions import IsOwner


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens for the new user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)


class UserProfileView(generics.RetrieveAPIView):
    """
    API endpoint to get current user profile
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Project CRUD operations
    """
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        """Return projects for the current user only"""
        return Project.objects.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectSerializer

    def perform_create(self, serializer):
        """Set the owner to current user when creating project"""
        serializer.save(owner=self.request.user)

    @swagger_auto_schema(
        operation_description="List all projects for the authenticated user",
        manual_parameters=[
            openapi.Parameter(
                'search', openapi.IN_QUERY,
                description="Search in name and description",
                type=openapi.TYPE_STRING
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Task CRUD operations
    """
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'status']
    ordering = ['-created_at']

    def get_queryset(self):
        """Return tasks for projects owned by current user"""
        queryset = Task.objects.filter(project__owner=self.request.user)
        
        # Filter by project if project_id is provided
        project_id = self.kwargs.get('project_pk') or self.request.query_params.get('project_id')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        
        # Filter by status if provided
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return TaskCreateSerializer
        return TaskSerializer

    def perform_create(self, serializer):
        """Set the project when creating task"""
        project_id = self.kwargs.get('project_pk') or self.request.data.get('project')
        project = Project.objects.get(id=project_id, owner=self.request.user)
        serializer.save(project=project)

    @swagger_auto_schema(
        operation_description="List tasks with optional filters",
        manual_parameters=[
            openapi.Parameter(
                'status', openapi.IN_QUERY,
                description="Filter by status (TODO, IN_PROGRESS, DONE)",
                type=openapi.TYPE_STRING,
                enum=['TODO', 'IN_PROGRESS', 'DONE']
            ),
            openapi.Parameter(
                'project_id', openapi.IN_QUERY,
                description="Filter by project ID",
                type=openapi.TYPE_INTEGER
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ProjectTasksView(generics.ListCreateAPIView):
    """
    API endpoint to list and create tasks for a specific project
    """
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        queryset = Task.objects.filter(
            project_id=project_id,
            project__owner=self.request.user
        )
        
        # Filter by status if provided
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskCreateSerializer
        return TaskSerializer

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_id')
        project = Project.objects.get(id=project_id, owner=self.request.user)
        serializer.save(project=project)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@swagger_auto_schema(
    operation_description="Get dashboard statistics for the authenticated user",
    responses={200: DashboardSerializer}
)
def dashboard_view(request):
    """
    API endpoint for dashboard statistics
    """
    user = request.user
    projects = Project.objects.filter(owner=user)
    tasks = Task.objects.filter(project__owner=user)
    
    data = {
        'total_projects': projects.count(),
        'total_tasks': tasks.count(),
        'todo_tasks': tasks.filter(status='TODO').count(),
        'in_progress_tasks': tasks.filter(status='IN_PROGRESS').count(),
        'completed_tasks': tasks.filter(status='DONE').count(),
        'recent_projects': projects[:5]
    }
    
    serializer = DashboardSerializer(data)
    return Response(serializer.data)
