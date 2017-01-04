import { Schema, arrayOf } from 'normalizr'

export const DatasetConfiguration = {
  entityKey: 'name',
  normalizrKey: 'datasets',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const datasetSchema = new Schema(DatasetConfiguration.normalizrKey, {
  idAttribute: dataset =>
    dataset.content[DatasetConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  DATASET: datasetSchema,
  DATASET_ARRAY: arrayOf(datasetSchema),
}
