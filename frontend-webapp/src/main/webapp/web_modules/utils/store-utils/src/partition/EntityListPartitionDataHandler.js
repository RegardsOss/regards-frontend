/**
* LICENSE_PLACEHOLDER
**/

const dataHandler = normalizerKey => ({ payload: { entities, ...otherPayloadData } }) =>
  ({ items: entities[normalizerKey], ...otherPayloadData })

export default dataHandler

