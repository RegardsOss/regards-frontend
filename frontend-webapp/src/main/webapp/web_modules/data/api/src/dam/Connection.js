import { Schema, arrayOf } from 'normalizr'

const ConnectionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'connection',
}

const connection = new Schema(ConnectionConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[ConnectionConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  CONNECTION: connection,
  CONNECTION_ARRAY: arrayOf(connection),
  ConnectionConfiguration,
}
