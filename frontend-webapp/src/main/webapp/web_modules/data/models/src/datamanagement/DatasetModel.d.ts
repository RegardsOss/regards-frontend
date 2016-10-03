import { ModelAttribute } from "./ModelAttribute"
export interface DatasetModel {
  name: string
  id?: number
  attributes: Array<ModelAttribute>
}
