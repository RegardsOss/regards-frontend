import { Schema, arrayOf } from 'normalizr'

const userSchema = new Schema('users', {
  idAttribute: user =>
    user.content.id
  ,
})

// Schemas for API responses.
export default {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
}
