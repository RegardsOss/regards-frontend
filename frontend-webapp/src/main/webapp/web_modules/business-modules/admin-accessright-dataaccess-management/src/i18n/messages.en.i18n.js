/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'invalid.require_max_more_than_min': ' The max value must be bigger than min value',
  'invalid.require_plugin_configuration': 'You must select which plugin configuration you want to use',
  'accessright.table.dataset.label': 'Dataset',
  'accessright.table.actions': 'Actions',
  'accessright.title': 'Manage dataset access rights for access group {name}',
  'accessright.subtitle': 'Here under, you can configure access rights for all datasets for the access group {name}.',
  'accessright.form.meta.accessLevel': 'Access level to dataset meta-data',
  'accessright.form.meta.accessLevel.NO_ACCESS': 'No access',
  'accessright.form.meta.accessLevel.RESTRICTED_ACCESS': 'Dataset access',
  'accessright.form.meta.accessLevel.FULL_ACCESS': 'Dataset and Dataobjects access',
  'accessright.form.data.accessLevel': 'Access level to data',
  'accessright.form.data.accessLevel.NO_ACCESS': 'Refused',
  'accessright.form.data.accessLevel.INHERITED_ACCESS': 'Authorized',
  'accessright.form.data.accessLevel.CUSTOM_ACCESS': 'Authorized by plugin',
  'accessright.form.data.accessLevel.NOT_APPLICABLE': '-',
  'accessright.form.accessGroup': 'Data access group',
  'accessright.form.dataset.title': 'Dataset list',
  'accessright.form.dataset.input': 'Search by collection name',
  'accessright.form.action.save': 'Save',
  'accessright.form.action.advanced.hide': 'Hide',
  'accessright.form.action.advanced.show': 'Display advanced configuration',
  'accessright.form.title': 'Input form of one or many access right creation',
  'accessright.form.subtitle': 'Setting up access rights for {nbSelectedDataset} datasets',
  'accessright.form.quality': 'Data quality retrieved',
  'accessright.form.quality.min': 'Minimal quality required',
  'accessright.form.quality.max': 'Maximale quality  required',
  'accessright.form.quality.level': 'Level of quality',
  'accessright.form.quality.level.ACCEPTED': 'Accepted',
  'accessright.form.quality.level.ACCEPTED_WITH_WARNINGS': 'Acceptés with warning(s)',
  'accessright.form.quality.level.REJECTED': 'Refused',
  'accessright.form.error.message': 'Error saving your configuration.',
  'accessright.edit.tooltip': 'Edit access rights for this dataset',
  'accessright.delete.tooltip': 'Remove access rights for this dataset',
  'accessright.list.delete.message': 'Are you sur you wnat to delete the {name} access rights ?',
  'component.plugin-parameter.action.choose-plugin': 'Select a plugin',
  'component.plugin-parameter.action.reset': 'Deselect a plugin',
  'accessright.edit.multiples.button.label': 'Configure access rights for selected datasets',
}, Locales.en)

export default messages
