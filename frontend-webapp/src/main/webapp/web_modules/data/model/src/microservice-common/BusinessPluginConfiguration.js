/**
* LICENSE_PLACEHOLDER
**/

/**
 * Plugin parameter shape for business plugiun
 */
export const BusinessPluginParamater = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  dynamic: PropTypes.bool.isRequired,
  // possible choices, only when dynamic, or empty for free dynamic value
  dynamicsValues: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
  })),
})

/**
 * Description of business plugin configuration, common to all services
 */
export const BusinessPluginConfiguration = PropTypes.shape({
  id: PropTypes.number.isRequired,
  pluginId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  priorityOrder: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  pluginClassName: PropTypes.string.isRequired,
  interfaceNames: PropTypes.arrayOf(PropTypes.string),
  parameters: PropTypes.arrayOf(BusinessPluginParamater),
})

