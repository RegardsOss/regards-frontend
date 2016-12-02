import { Schema, arrayOf } from 'normalizr'

export const ProjectUserConfiguration = {
  entityKey: 'id',
  normalizrKey: 'projectusers',
}

const projectUserSchema = new Schema(ProjectUserConfiguration.normalizrKey, {
  idAttribute: projectUser =>
    projectUser.content[ProjectUserConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  PROJECT_USER: projectUserSchema,
  PROJECT_USER_ARRAY: arrayOf(projectUserSchema),
}
