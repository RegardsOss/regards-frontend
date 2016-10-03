import { HateoasLink } from "../hateoas/HateoasLink"
import { ResourceAccess } from "./ResourceAccess"


export interface Role {
  name: string,
  parentRole: Role,
  permissions: Array<ResourceAccess>
  links: Array<HateoasLink>
}
