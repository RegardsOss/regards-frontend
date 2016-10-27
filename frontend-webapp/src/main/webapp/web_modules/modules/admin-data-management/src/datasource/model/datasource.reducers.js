import { ADD_DATASOURCE } from './datasource.actions';

const predefinedValues = {
  1: {
    id: 1,
    connectionId: 1,
    modelObjectId: 1,
    pluginDatasourceId: 1,
    name: 'Datasource #1',
  },
};

export default (state = {
  isFetching: false,
  items: predefinedValues, // TODO -> should be empty here
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    case ADD_DATASOURCE:
      const newState = Object.assign({}, state);
      newState.items[action.entity.id] = action.entity;
      return newState;
    default:
      return state;
  }
};
