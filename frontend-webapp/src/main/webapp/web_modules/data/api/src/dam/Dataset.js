import { Schema, arrayOf } from 'normalizr'

export const DatasetConfiguration = {
  entityKey: 'id',
  normalizrKey: 'datasets',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const datasetSchema = new Schema(DatasetConfiguration.normalizrKey, {
  idAttribute: dataset =>
    dataset.content[DatasetConfiguration.entityKey]
  ,
  assignEntity(output, key, value, input) {
    if (value && value.geometry) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.geometry = JSON.stringify(value.geometry)
      } catch (e) {
        console.error(`Invalid attribute geometry for collection ${value.id}`, e)
      }
    }
  },
})

// Schemas for API responses.
export default {
  DATASET: datasetSchema,
  DATASET_ARRAY: arrayOf(datasetSchema),
}
