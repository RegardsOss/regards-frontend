

import { Schema, arrayOf } from 'normalizr'

export const LinkUIPluginDatasetConfiguration = {
  entityKey: 'datasetId',
  normalizrKey: 'linkuiplugindataset',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const entitySchema = new Schema(LinkUIPluginDatasetConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[LinkUIPluginDatasetConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  LINK_UI_PLUGIN_DATASET: entitySchema,
  LINK_UI_PLUGIN_DATASET_ARRAY: arrayOf(entitySchema),
  LinkUIPluginDatasetConfiguration,
}
