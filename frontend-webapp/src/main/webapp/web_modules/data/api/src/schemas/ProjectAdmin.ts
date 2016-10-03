import { Schema, arrayOf } from "normalizr"
import ProjectSchema from "./Project"
/**
 * This type is not used anymore - à confirmer
 */
// Schemas for API responses.
const projectAdminSchema = new Schema('projectAdmins', {
  idAttribute: projectAdmin => projectAdmin.links[0].href
})

projectAdminSchema.define({
  projects: ProjectSchema.PROJECT_ARRAY
})

// Schemas for API responses.
export default {
  PROJECT_ADMIN: projectAdminSchema,
  PROJECT_ADMIN_ARRAY: arrayOf(projectAdminSchema)
}
