import { Schema, arrayOf } from 'normalizr'

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const projectSchema = new Schema('projects', {
  idAttribute: project =>
     project.content.name
  ,
})

// Schemas for API responses.
export default {
  PROJECT: projectSchema,
  PROJECT_ARRAY: arrayOf(projectSchema),
}
