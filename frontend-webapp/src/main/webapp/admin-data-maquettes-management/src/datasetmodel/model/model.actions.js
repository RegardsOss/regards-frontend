
// Add a new datasetmodel
export const ADD_DATASET_MODEL = 'ADD_DATASET_MODEL'

export const addDatasetModel = (name, attributes) => ({
  type: ADD_DATASET_MODEL,
  entity: {
    id: Math.floor(Math.random() * 60) + 10,
    attributes,
    name,
  },
})
