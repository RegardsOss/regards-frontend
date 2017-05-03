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

const metadataV1 = [{
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

export default {
  editorTypes,
  editors,
  metadataV1,
}
