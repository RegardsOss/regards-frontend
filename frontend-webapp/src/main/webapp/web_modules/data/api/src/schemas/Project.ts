import { Schema, arrayOf } from "normalizr"
import { Project } from "@regardsoss/models"

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const projectSchema = new Schema('projects', {
  idAttribute: (project: Project) => {
    return project.name
  }
})

// Schemas for API responses.
export default {
  PROJECT: projectSchema,
  PROJECT_ARRAY: arrayOf(projectSchema)
}
