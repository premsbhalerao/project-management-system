"""
Custom permissions for TaskFlow API
"""

from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to access it.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the object has an owner attribute
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        # For tasks, check project owner
        if hasattr(obj, 'project'):
            return obj.project.owner == request.user
        return False


class IsProjectOwner(permissions.BasePermission):
    """
    Custom permission for tasks - check if user owns the parent project
    """

    def has_permission(self, request, view):
        # For creating tasks, verify project ownership
        if request.method == 'POST':
            project_id = view.kwargs.get('project_id') or request.data.get('project')
            if project_id:
                from .models import Project
                try:
                    project = Project.objects.get(id=project_id)
                    return project.owner == request.user
                except Project.DoesNotExist:
                    return False
        return True

    def has_object_permission(self, request, view, obj):
        return obj.project.owner == request.user
