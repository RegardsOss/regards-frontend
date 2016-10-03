import { HateoasLink } from "../hateoas/HateoasLink"

export interface ResourceAccess {
  description: string,
  microservice: string,
  resource: string,
  verb: string
  links: Array<HateoasLink>
}
