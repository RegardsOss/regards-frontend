/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'invalid.require_max_more_than_min': ' The max value must be bigger than min value',
  'invalid.require_plugin_configuration': 'You must select which plugin configuration you want to use',
  'accessright.title': 'Manage dataset access rights by access group',
  'accessright.subtitle': 'Select a group acces, then select dataset it can access and configure that access',
  'accessright.form.accesslevel': 'Access level to collection meta-data',
  'accessright.form.accesslevel.NO_ACCESS': 'No access',
  'accessright.form.accesslevel.RESTRICTED_ACCESS': 'Restricted access',
  'accessright.form.accesslevel.FULL_ACCESS': 'Full access',
  'accessright.form.dataAccessLevel': 'Level of access to data',
  'accessright.form.dataAccessLevel.NO_ACCESS': 'No access',
  'accessright.form.dataAccessLevel.INHERITED_ACCESS': 'Inherited access',
  'accessright.form.dataAccessLevel.CUSTOM_ACCESS': 'Custom access configured by a plugin',
  'accessright.form.accessGroup': 'Data access group',
  'accessright.form.dataset.title': 'Dataset list',
  'accessright.form.dataset.input': 'Search by collection name',
  'accessright.form.action.save': 'Save',
  'accessright.form.action.advanced.hide': 'Hide',
  'accessright.form.action.advanced.show': 'Display advanced configuration',
  'accessright.form.title': 'Input form of one or many access right creation',
  'accessright.form.subtitle': 'Lorem lipsum',
  'accessright.form.quality': 'Data quality retrieved',
  'accessright.form.quality.min': 'Minimal quality required',
  'accessright.form.quality.max': 'Maximale quality  required',
  'accessright.form.quality.level': 'Level of quality',
  'accessright.form.quality.level.ACCEPTED': 'Accepted',
  'accessright.form.quality.level.ACCEPTED_WITH_WARNINGS': 'Acceptés with warning(s)',
  'accessright.form.quality.level.REJECTED': 'Refused',
  'component.plugin-parameter.action.choose-plugin': 'Select a plugin',
  'component.plugin-parameter.action.reset': 'Deselect a plugin',
}, Locales.en)

export default messages
