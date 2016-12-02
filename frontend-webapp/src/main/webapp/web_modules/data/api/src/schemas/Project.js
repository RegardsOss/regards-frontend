import { Schema, arrayOf } from 'normalizr'

export const ProjectConfiguration = {
  entityKey: 'name',
  normalizrKey: 'projects',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const projectSchema = new Schema(ProjectConfiguration.normalizrKey, {
  idAttribute: project =>
     project.content[ProjectConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  PROJECT: projectSchema,
  PROJECT_ARRAY: arrayOf(projectSchema),
}
