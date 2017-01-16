import { Schema, arrayOf } from 'normalizr'

export const RoleConfiguration = {
  entityKey: 'name',
  normalizrKey: 'roles',
}

const roleSchema = new Schema(RoleConfiguration.normalizrKey, {
  idAttribute: role =>
     role.content[RoleConfiguration.entityKey]
  ,
})


// Schemas for API responses.
export default {
  ROLE: roleSchema,
  ROLE_ARRAY: arrayOf(roleSchema),
}
