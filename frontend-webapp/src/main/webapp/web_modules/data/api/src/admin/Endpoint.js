import { Schema, arrayOf } from 'normalizr'

export const EndpointConfiguration = {
  entityKey: 'id',
  normalizrKey: 'endpoint',
}

const schema = new Schema(EndpointConfiguration.normalizrKey, {
  idAttribute: entity => entity.content[EndpointConfiguration.entityKey],
  assignEntity: (output, key, value, input) => {
    console.log('output', output)
    console.log('key', key)
    console.log('value', value)
    console.log('input', input)
    if (key === 'content') {
      output = `${output.content.resource}@${output.content.verb}`
    }
  },
})

// Schemas for API responses.
export default {
  ENDPOINT: schema,
  ENDPOINT_ARRAY: arrayOf(schema),
}
