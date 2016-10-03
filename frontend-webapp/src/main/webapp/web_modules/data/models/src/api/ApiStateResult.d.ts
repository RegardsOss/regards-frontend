export interface ApiResultItems {
  entities: any,
  results: Array<string|number>
}

/**
 * Normalized action from api result
 */
export interface NormalizedAction {
  type: string,
  payload: ApiResultItems
}

export interface ApiStateResult<T> {
  isFetching: boolean,
  items: Array<T>,
  ids: Array<string>,
  lastUpdate: string
}
