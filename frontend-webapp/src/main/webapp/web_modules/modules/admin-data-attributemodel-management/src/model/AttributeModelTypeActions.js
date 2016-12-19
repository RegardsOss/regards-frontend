const { CALL_API, getJSON } = require('redux-api-middleware')

export const REQUEST_ATTRIBUTE_MODEL_TYPE_LIST = 'admin-data-attributemodel-management/type/REQUEST_LIST'
export const RECEIVE_ATTRIBUTE_MODEL_TYPE_LIST = 'admin-data-attributemodel-management/type/RECEIVE_LIST'
export const FAILED_ATTRIBUTE_MODEL_TYPE_LIST = 'admin-data-attributemodel-management/type/FAILED_LIST'

export const fetchAttributeModelTypeList = () => ({
  [CALL_API]: {
    types: [
      REQUEST_ATTRIBUTE_MODEL_TYPE_LIST,
      {
        type: RECEIVE_ATTRIBUTE_MODEL_TYPE_LIST,
        payload: (action, state, res) => getJSON(res),
      },
      {
        type: FAILED_ATTRIBUTE_MODEL_TYPE_LIST,
        meta: (action, state, res) => {
          if (res.status === '500') {
            return { errorMessage: 'authentication.error.500' }
          }
          return { errorMessage: 'authentication.error' }
        },
      },

    ],
    endpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-dam/models/attributes/types`,
    method: 'GET',
  },
})
