import { PlainRoute } from 'react-router';
import AdminApp from './AdminApp';
import ProjectAdminApp from './ProjectAdminApp';

export const projectAdminRouter = {
  path: 'admin/:project',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, ProjectAdminApp);
    });
  },
};


export const projectAdminDataRouter = {
  path: 'admin/:project/datamanagement',
  getChildRoutes(nextState, cb) {
    const adminDataManagement = require('@regardsoss/admin-data-management');
    // do asynchronous stuff to find the child routes
    cb(null, [adminDataManagement.dataManagementRouter]);
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, ProjectAdminApp);
    });
  },
};

export const projectAdminUserRouter = {
  path: 'admin/:project/usermanagement',
  getChildRoutes(nextState, cb) {
    const adminUserManagement = require('@regardsoss/admin-user-management');
    // do asynchronous stuff to find the child routes
    cb(null, [adminUserManagement.userManagementRouter]);
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, ProjectAdminApp);
    });
  },
};


export const instanceAdminRouter = {
  path: 'admin',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, AdminApp);
    });
  },
};


export const adminRouter = {
  path: '',
  childRoutes: [
    instanceAdminRouter,
    projectAdminRouter,
    projectAdminDataRouter,
    projectAdminUserRouter,
  ],
};
