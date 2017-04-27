

import { Schema, arrayOf } from 'normalizr'

export const LinkPluginDatasetConfiguration = {
  entityKey: 'datasetId',
  normalizrKey: 'linkplugindataset',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const entitySchema = new Schema(LinkPluginDatasetConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[LinkPluginDatasetConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  LINK_PLUGIN_DATASET: entitySchema,
  LINK_PLUGIN_DATASET_ARRAY: arrayOf(entitySchema),
  LinkPluginDatasetConfiguration,
}
