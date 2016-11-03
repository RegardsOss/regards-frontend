export const SET_DATASOURCE = 'dataset/SET_DATASOURCE'
export function setDatasource(idDatasource) {
  return {
    type: SET_DATASOURCE,
    idDatasource,
  }
}


export const SET_VIEW_STATE = 'dataset/SET_VIEW_STATE'
export function setViewState(viewState) {
  return {
    type: SET_VIEW_STATE,
    viewState,
  }
}


export const SET_DATASET_LABEL = 'dataset/SET_DATASET_LABEL'
export function setDatasetLabel(label) {
  return {
    type: SET_DATASET_LABEL,
    label,
  }
}

export const SET_DATASET_MODELTYPE = 'dataset/SET_DATASET_MODELTYPE'
export function setDatasetModelType(modelType) {
  return {
    type: SET_DATASET_MODELTYPE,
    modelType,
  }
}

export const SET_DATASET_DEFAULTMODELATTRIBUTES = 'dataset/SET_DATASET_DEFAULTMODELATTRIBUTES'

export function setDatasetDefaultModelAttributes(defaultModelAttributes) {
  return {
    type: SET_DATASET_DEFAULTMODELATTRIBUTES,
    defaultModelAttributes,
  }
}
