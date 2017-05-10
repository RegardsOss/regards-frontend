/**
* LICENSE_PLACEHOLDER
**/

/**
 * Plugin parameter shape for business plugiun
 */
export const BusinessPluginParamater = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  dynamic: React.PropTypes.bool.isRequired,
  // possible choices, only when dynamic, or empty for free dynamic value
  dynamicsValues: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
  })),
})

/**
 * Description of business plugin configuration, common to all services
 */
export const BusinessPluginConfiguration = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  pluginId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  version: React.PropTypes.string.isRequired,
  priorityOrder: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired,
  pluginClassName: React.PropTypes.string.isRequired,
  interfaceNames: React.PropTypes.arrayOf(React.PropTypes.string),
  parameters: React.PropTypes.arrayOf(BusinessPluginParamater),
})

