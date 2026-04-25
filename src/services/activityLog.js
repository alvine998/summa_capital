/**
 * Activity Log Service
 * Handles logging, retrieval, and management of user activities
 */

export const ACTIVITY_TYPES = {
  // Authentication
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  
  // Asset Management
  CREATE_ASSET: 'CREATE_ASSET',
  UPDATE_ASSET: 'UPDATE_ASSET',
  DELETE_ASSET: 'DELETE_ASSET',
  PUBLISH_ASSET: 'PUBLISH_ASSET',
  ARCHIVE_ASSET: 'ARCHIVE_ASSET',
  
  // Early Access
  CREATE_EARLY_ACCESS: 'CREATE_EARLY_ACCESS',
  UPDATE_EARLY_ACCESS: 'UPDATE_EARLY_ACCESS',
  DELETE_EARLY_ACCESS: 'DELETE_EARLY_ACCESS',
  
  // User Management
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  UPDATE_USER_ROLE: 'UPDATE_USER_ROLE',
  
  // Gallery
  UPLOAD_GALLERY: 'UPLOAD_GALLERY',
  DELETE_GALLERY: 'DELETE_GALLERY',
  
  // Settings
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  
  // Messages
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  VIEW_MESSAGE: 'VIEW_MESSAGE'
};

export const getActivityLabel = (type) => {
  const labels = {
    LOGIN: 'Logged in',
    LOGOUT: 'Logged out',
    CREATE_ASSET: 'Created asset',
    UPDATE_ASSET: 'Updated asset',
    DELETE_ASSET: 'Deleted asset',
    PUBLISH_ASSET: 'Published asset',
    ARCHIVE_ASSET: 'Archived asset',
    CREATE_EARLY_ACCESS: 'Created early access',
    UPDATE_EARLY_ACCESS: 'Updated early access',
    DELETE_EARLY_ACCESS: 'Deleted early access',
    CREATE_USER: 'Created user',
    UPDATE_USER: 'Updated user',
    DELETE_USER: 'Deleted user',
    UPDATE_USER_ROLE: 'Updated user role',
    UPLOAD_GALLERY: 'Uploaded gallery image',
    DELETE_GALLERY: 'Deleted gallery image',
    UPDATE_SETTINGS: 'Updated settings',
    DELETE_MESSAGE: 'Deleted message',
    VIEW_MESSAGE: 'Viewed message'
  };
  return labels[type] || type;
};

export const logActivity = (type, data = {}) => {
  try {
    const user = localStorage.getItem('summacapital_user');
    const userData = user ? JSON.parse(user) : null;
    
    const activity = {
      id: Date.now(),
      type,
      label: getActivityLabel(type),
      user: userData?.name || 'Unknown User',
      userId: userData?.id || null,
      timestamp: new Date().toISOString(),
      details: data,
      ipAddress: 'N/A' // Would come from backend in production
    };

    // Get existing activities
    const existingActivities = localStorage.getItem('activity_log');
    const activities = existingActivities ? JSON.parse(existingActivities) : [];

    // Add new activity at the beginning
    activities.unshift(activity);

    // Keep only last 1000 activities (optional limit)
    const limitedActivities = activities.slice(0, 1000);

    // Save to localStorage
    localStorage.setItem('activity_log', JSON.stringify(limitedActivities));

    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

export const getActivityLog = () => {
  try {
    const log = localStorage.getItem('activity_log');
    return log ? JSON.parse(log) : [];
  } catch (error) {
    console.error('Error retrieving activity log:', error);
    return [];
  }
};

export const getActivitiesByType = (type) => {
  const log = getActivityLog();
  return log.filter(activity => activity.type === type);
};

export const getActivitiesByUser = (userId) => {
  const log = getActivityLog();
  return log.filter(activity => activity.userId === userId);
};

export const clearActivityLog = () => {
  try {
    localStorage.removeItem('activity_log');
    return true;
  } catch (error) {
    console.error('Error clearing activity log:', error);
    return false;
  }
};

export const exportActivityLog = () => {
  const log = getActivityLog();
  const csv = [
    ['ID', 'Type', 'Label', 'User', 'Timestamp', 'Details'].join(','),
    ...log.map(activity => [
      activity.id,
      activity.type,
      activity.label,
      activity.user,
      activity.timestamp,
      JSON.stringify(activity.details)
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `activity_log_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
