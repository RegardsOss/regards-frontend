import { HateoasLink } from "../hateoas/HateoasLink"

export interface Project {
  name: string
  projectId: string
  description: string
  isPublic: boolean
  links: Array<HateoasLink>
  icon: string
}

export interface ProjectsStore {
  isFetching: boolean
  items: Array<Project>
  lastUpdate: string
}
