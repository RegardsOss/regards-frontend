import { DatasetDefaultModelAttribute } from "@regardsoss/models"
export const SET_DATASOURCE = 'dataset/SET_DATASOURCE'
export function setDatasource (idDatasource: number): Object {
  return {
    type: SET_DATASOURCE,
    idDatasource: idDatasource
  }
}


export const SET_VIEW_STATE = 'dataset/SET_VIEW_STATE'
export function setViewState (viewState: string): Object {
  return {
    type: SET_VIEW_STATE,
    viewState: viewState
  }
}


export const SET_DATASET_LABEL = 'dataset/SET_DATASET_LABEL'
export function setDatasetLabel (label: string): Object {
  return {
    type: SET_DATASET_LABEL,
    label: label
  }
}

export const SET_DATASET_MODELTYPE = 'dataset/SET_DATASET_MODELTYPE'
export function setDatasetModelType (modelType: number): Object {
  return {
    type: SET_DATASET_MODELTYPE,
    modelType: modelType
  }
}

export const SET_DATASET_DEFAULTMODELATTRIBUTES = 'dataset/SET_DATASET_DEFAULTMODELATTRIBUTES'

export function setDatasetDefaultModelAttributes (defaultModelAttributes: Array<DatasetDefaultModelAttribute>): Object {
  return {
    type: SET_DATASET_DEFAULTMODELATTRIBUTES,
    defaultModelAttributes: defaultModelAttributes
  }
}
