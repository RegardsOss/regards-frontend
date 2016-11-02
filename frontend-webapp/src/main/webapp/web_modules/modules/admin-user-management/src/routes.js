import { PlainRoute } from 'react-router';

export const projectAccountCreateRoute = {
  path: 'users/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountCreateContainer = require('./containers/ProjectAccountCreateContainer');
      cb(null, {
        content: ProjectAccountCreateContainer.default,
      });
    });
  },
};

export const projectAccountReadRoute = {
  path: 'users/:user_id',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountReadComponent = require('./containers/ProjectAccountReadContainer');
      cb(null, {
        content: ProjectAccountReadComponent.default,
      });
    });
  },
};

export const projectAccountEditRoute = {
  path: 'users/:user_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountEditContainer = require('./containers/ProjectAccountEditContainer');
      cb(null, {
        content: ProjectAccountEditContainer.default,
      });
    });
  },
};

export const projectAccountsRoutes = {
  path: 'users',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAcountsContainer = require('./containers/ProjectAccountsContainer');
      cb(null, {
        content: ProjectAcountsContainer.default,
      });
    });
  },
};

export const userManagementRouter = {
  path: '',
  childRoutes: [
    projectAccountCreateRoute,
    projectAccountReadRoute,
    projectAccountEditRoute,
    projectAccountsRoutes,
  ],
};
