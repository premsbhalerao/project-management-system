'use client';
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  description?: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  project_id: number;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Website Design', description: 'Redesign company website' },
    { id: 2, name: 'Mobile App', description: 'Build iOS & Android app' },
    { id: 3, name: 'Database Migration', description: 'Migrate to new database' }
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design homepage', status: 'IN_PROGRESS', project_id: 1 },
    { id: 2, title: 'Fix login bug', status: 'TODO', project_id: 1 },
    { id: 3, title: 'Write API docs', status: 'DONE', project_id: 2 },
    { id: 4, title: 'Setup database', status: 'IN_PROGRESS', project_id: 3 }
  ]);
  
  const [backendStatus, setBackendStatus] = useState('✅ Using Demo Data');

  const completedTasks = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Project Management System</h1>
        <p style={styles.subtitle}>Full-stack project management application</p>
      </header>

      {/* Status */}
      <div style={styles.statusCard}>
        <h2>Application Status</h2>
        <div style={styles.successStatus}>
          {backendStatus}
        </div>
        <p>Frontend: Running on Next.js</p>
        <p>Backend: Django REST API (Demo mode)</p>
      </div>

      {/* Dashboard Stats */}
      <div style={styles.dashboard}>
        <div style={styles.statCard}>
          <h3>📁 Projects</h3>
          <p style={styles.statNumber}>{projects.length}</p>
          <p style={styles.statLabel}>Active projects</p>
        </div>
        <div style={styles.statCard}>
          <h3>✅ Tasks</h3>
          <p style={styles.statNumber}>{tasks.length}</p>
          <p style={styles.statLabel}>Total tasks</p>
        </div>
        <div style={styles.statCard}>
          <h3>🏆 Completed</h3>
          <p style={styles.statNumber}>{completedTasks}</p>
          <p style={styles.statLabel}>Finished tasks</p>
        </div>
      </div>

      {/* Projects List */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>📋 Projects</h2>
          <button style={styles.smallButton}>+ Add Project</button>
        </div>
        <div style={styles.list}>
          {projects.map(project => (
            <div key={project.id} style={styles.listItem}>
              <div>
                <h4 style={styles.projectName}>{project.name}</h4>
                <p style={styles.projectDesc}>{project.description}</p>
              </div>
              <div style={styles.projectMeta}>
                <span style={styles.badge}>ID: {project.id}</span>
                <span style={styles.taskCount}>
                  {tasks.filter(t => t.project_id === project.id).length} tasks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>✅ Tasks</h2>
          <button style={{...styles.smallButton, backgroundColor: '#4CAF50'}}>+ Add Task</button>
        </div>
        <div style={styles.list}>
          {tasks.map(task => {
            const statusColors: Record<string, string> = {
              'TODO': '#FFA726',
              'IN_PROGRESS': '#29B6F6',
              'DONE': '#66BB6A'
            };
            
            return (
              <div key={task.id} style={styles.listItem}>
                <div>
                  <h4 style={styles.taskTitle}>{task.title}</h4>
                  <div style={styles.taskMeta}>
                    <span style={styles.projectBadge}>
                      Project: {projects.find(p => p.id === task.project_id)?.name || task.project_id}
                    </span>
                  </div>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: statusColors[task.status] || '#78909C'
                }}>
                  {task.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>🎯 Assignment: Full-Stack Developer Intern</p>
        <p>✅ Backend: Django REST Framework | ✅ Frontend: Next.js 14</p>
        <p>📅 Submitted on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8fafc',
    color: '#334155'
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '50px',
    paddingBottom: '30px',
    borderBottom: '2px solid #e2e8f0'
  },
  title: {
    color: '#3B82F6',
    fontSize: '3rem',
    marginBottom: '15px',
    fontWeight: '800'
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#64748b',
    fontWeight: '400'
  },
  statusCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    marginBottom: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0'
  },
  successStatus: {
    padding: '15px',
    borderRadius: '10px',
    margin: '15px 0',
    fontWeight: 'bold',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontSize: '1.1rem'
  },
  dashboard: {
    display: 'flex',
    gap: '25px',
    marginBottom: '50px',
    flexWrap: 'wrap' as const
  },
  statCard: {
    flex: 1,
    minWidth: '250px',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    textAlign: 'center' as const,
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  statNumber: {
    fontSize: '4rem',
    fontWeight: '800',
    margin: '20px 0',
    color: '#1e293b'
  },
  statLabel: {
    color: '#64748b',
    fontSize: '1rem'
  },
  section: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },
  smallButton: {
    padding: '10px 20px',
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  list: {
    marginTop: '20px'
  },
  listItem: {
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f8fafc'
    }
  },
  projectName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  },
  projectDesc: {
    color: '#64748b',
    fontSize: '1rem',
    marginBottom: '0'
  },
  projectMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '8px'
  },
  badge: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600'
  },
  taskCount: {
    color: '#64748b',
    fontSize: '14px'
  },
  taskTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '8px'
  },
  taskMeta: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  projectBadge: {
    backgroundColor: '#e2e8f0',
    color: '#475569',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '13px'
  },
  statusBadge: {
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    minWidth: '100px',
    textAlign: 'center' as const
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '60px',
    paddingTop: '30px',
    borderTop: '2px solid #e2e8f0',
    color: '#64748b',
    fontSize: '0.9rem'
  }
};