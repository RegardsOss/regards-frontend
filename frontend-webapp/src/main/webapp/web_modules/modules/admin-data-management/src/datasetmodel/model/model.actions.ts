import { ModelAttribute } from "@regardsoss/models"

// Add a new datasetmodel
export const ADD_DATASET_MODEL = 'ADD_DATASET_MODEL'

export const addDatasetModel = (name: string, attributes: Array<ModelAttribute>) => ({
  type: ADD_DATASET_MODEL,
  entity: {
    id: Math.floor(Math.random() * 60) + 10,
    attributes,
    name
  }
})
