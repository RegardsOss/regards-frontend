import { Schema, arrayOf } from 'normalizr'

export const ProjectConnectionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'projectConnections',
}

const projectConnectionSchema = new Schema(ProjectConnectionConfiguration.normalizrKey, {
  idAttribute: projectConnection =>
     projectConnection.content[ProjectConnectionConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  PROJECT_CONNECTION: projectConnectionSchema,
  PROJECT_CONNECTION_ARRAY: arrayOf(projectConnectionSchema),
}
