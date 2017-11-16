

const ingestPluginTypes = {
  PRE_PROCESSING: 'fr.cnes.regards.modules.ingest.domain.plugin.ISipPreprocessing',
  VALIDATION :'fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation',
  GENERATION : 'fr.cnes.regards.modules.ingest.domain.plugin.IAipGeneration',
  TAG : 'fr.cnes.regards.modules.ingest.domain.plugin.IAipTagging',
  POST_PROCESSING : 'fr.cnes.regards.modules.ingest.domain.plugin.ISipPreprocessing'
}

export default ingestPluginTypes