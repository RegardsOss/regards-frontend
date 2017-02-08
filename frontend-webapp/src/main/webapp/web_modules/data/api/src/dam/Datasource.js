import { Schema, arrayOf } from 'normalizr'

const DatasourceConfiguration = {
  entityKey: 'id',
  normalizrKey: 'collection',
}

const datasource = new Schema(DatasourceConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[DatasourceConfiguration.entityKey]
  ,
})

// Schemas for API responses.
export default {
  DATASOURCE: datasource,
  DATASOURCE_ARRAY: arrayOf(datasource),
  DatasourceConfiguration,
}
