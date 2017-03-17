import { Schema } from 'normalizr'

export const LayoutConfiguration = {
  entityKey: 'applicationId',
  normalizrKey: 'layout',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const layoutSchema = new Schema(LayoutConfiguration.normalizrKey, {
  idAttribute: layout =>
    layout.content[LayoutConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.layout) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.layout = JSON.parse(value.layout)
      } catch (e) {
        console.error(`Invalid layout configuration for layout ${value.id}`)
      }
    }
  },
})

// Schemas for API responses.
export default {
  LAYOUT: layoutSchema,
}
