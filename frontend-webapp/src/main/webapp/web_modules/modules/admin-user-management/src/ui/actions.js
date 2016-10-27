export const SELECT_PROJECT_USER = 'SELECT_PROJECT_USER';
export const UIActions = {
  selectProjectUser(id) {
    return {
      type: SELECT_PROJECT_USER,
      id,
    };
  },
};
