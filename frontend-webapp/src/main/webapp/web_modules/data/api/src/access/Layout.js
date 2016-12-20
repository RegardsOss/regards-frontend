import { Schema } from 'normalizr'

export const LayoutConfiguration = {
  entityKey: 'id',
  normalizrKey: 'layout',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const layoutSchema = new Schema(LayoutConfiguration.normalizrKey, {
  idAttribute: layout =>
    layout.content[LayoutConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  LAYOUT: layoutSchema,
}
