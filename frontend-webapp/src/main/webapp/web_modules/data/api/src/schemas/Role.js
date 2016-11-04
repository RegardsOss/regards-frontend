import { Schema, arrayOf } from 'normalizr'

const NAME = 'roles'
const roleSchema = new Schema(NAME, {
  idAttribute: (role) => {
    return role.name
  },
})


// Schemas for API responses.
export default {
  ROLE_SCHEMA: roleSchema,
  ROLE_SCHEMA_ARRAY: arrayOf(roleSchema),
}
