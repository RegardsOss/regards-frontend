/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
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
 * @param user user model (optional) as returned by server ({content: {..., metadata}, links})
 * @return found metadata server model or undefined
 */
function findUserMetadata(metadataKey, user) {
  const metadata = get(user, 'content.metadata', [])
  return metadata.find(({ key }) => key === metadataKey)
}

/**
 * Returns metadata array, optionnaly completed with known user values
 * @param user user model (optional) as returned by server ({content: {..., metadata}, links})
 * @return metadata array as defined in this model, completed with user known values
 */
function getMetadataArray(user) {
  return METADATA_ARRAY_V1.map((metadata) => {
    const correspondingServerMetadata = findUserMetadata(metadata.key, user)
    return {
      // find in server data the metadata matching current UI model. If undefined, let the field undefined
      currentValue: correspondingServerMetadata && correspondingServerMetadata.value, // undefined when no meta or no value
      ...metadata,
    }
  })
}

/**
 * Packs metadata form values (where key is metadata key) into metadata field for user transfer object
 * @param user user model as returned by server ({content: {..., metadata}, links})
 * @param {*} formValues edition form values (optional)
 * @return a suitable value for user.content.metadata field
 */
function packMetadataField(user, formValues = {}) {
  return METADATA_ARRAY_V1.map(({ key }) => {
    const metadataEntity = findUserMetadata(key, user)
    return {
      id: metadataEntity && metadataEntity.id, // undefined when metadata does not yet exist on server side
      key,
      value: formValues[key] || (metadataEntity && metadataEntity.value),
    }
  })
}

export default {
  editorTypes,
  editors,
  getMetadataArray,
  packMetadataField,
}
