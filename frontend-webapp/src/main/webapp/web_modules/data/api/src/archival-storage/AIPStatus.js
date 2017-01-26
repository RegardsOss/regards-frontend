/**
 * LICENSE_PLACEHOLDER
 **/
import { Schema, arrayOf } from 'normalizr'

/**
 * AIP status management for normalizr
 */
export const AIPStatusConfiguration = {
  entityKey: 'id',
  normalizrKey: 'aips',
}

const aipStatusSchemaSchema = new Schema(AIPStatusConfiguration.normalizrKey, {
  idAttribute: model => model.content[AIPStatusConfiguration.entityKey],
})

// Schemas for API responses.
export default {
  AIP_STATUS: aipStatusSchemaSchema,
  AIP_STATUS_ARRAY: arrayOf(aipStatusSchemaSchema),
  AIPStatusConfiguration,
}
