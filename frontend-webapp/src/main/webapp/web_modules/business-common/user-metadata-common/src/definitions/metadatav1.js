/**
* LICENSE_PLACEHOLDER
**/
import countries from './countries'

/**
 * V1 metadata list: for first version only, constant metadata for all projects.
 * All label keys are defines in modules messages, exported by this module
 */
const editorTypes = {
  text: 'text.type',
  multilineText: 'multiline.text.type',
  choice: 'choice.type',
}

const editors = {
  textEditor: {
    type: editorTypes.text,
  },
  multilineTextEditor: {
    type: editorTypes.multilineText,
  },
  countriesEditor: {
    type: editorTypes.choice,
    choices: countries.map(key => ({
      key,
      labelKey: `country.${key}`,
    })),
  },
}

const METADATA_ARRAY_V1 = [{
  key: 'address',
  labelKey: 'user.metadata.address',
  editor: editors.textEditor,
  mandatory: false,
  onlyAtRegistration: false,
}, {
  key: 'country',
  labelKey: 'user.metadata.country',
  editor: editors.countriesEditor,
  mandatory: true,
  onlyAtRegistration: false,
}, {
  key: 'organization',
  labelKey: 'user.metadata.organization',
  editor: editors.textEditor,
  mandatory: true,
  onlyAtRegistration: false,
}, {
  key: 'reason',
  labelKey: 'user.metadata.reason',
  editor: editors.multilineTextEditor,
  mandatory: true,
  onlyAtRegistration: true,
}]

/**
 * Finds in user model (optional) the metadata for key as parameter
 * @param metadataKey searched metadata key
 * @param user user model (optional) as returned by server ({content: {..., metaData}, links})
 * @return found metadata server model or undefined
 */
function findUserMetaData(metadataKey, user) {
  const metaData = (user && user.content && user.content.metaData) || []
  return metaData.find(({ key }) => key === metadataKey)
}

/**
 * Returns metadata array, optionnaly completed with known user values
 * @param user user model (optional) as returned by server ({content: {..., metaData}, links})
 * @return metadata array as defined in this model, completed with user known values
 */
function getMetadataArray(user) {
  return METADATA_ARRAY_V1.map((metadata) => {
    const correspondingServerMetadata = findUserMetaData(metadata.key, user)
    return {
      // find in server data the metadata matching current UI model. If undefined, let the field undefined
      currentValue: correspondingServerMetadata && correspondingServerMetadata.value, // undefined when no meta or no value
      ...metadata,
    }
  })
}

/**
 * Packs metadata form values (where key is metadata key) into metaData field for user transfer object
 * @param user user model as returned by server ({content: {..., metaData}, links})
 * @param {*} formValues edition form values (optional)
 * @return a suitable value for user.content.metaData field
 */
function packMetaDataField(user, formValues = {}) {
  return METADATA_ARRAY_V1.map(({ key }) => {
    const metadataEntity = findUserMetaData(key, user)
    return {
      id: metadataEntity && metadataEntity.id, // undefined when metadata does not yet exist on server side
      key,
      value: formValues[key] || metadataEntity.value,
    }
  })
}

export default {
  editorTypes,
  editors,
  getMetadataArray,
  packMetaDataField,
}
