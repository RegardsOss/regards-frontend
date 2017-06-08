import findIndex from 'lodash/findIndex'
import { PluginMetaData, PluginParameter, PluginParameterType } from '@regardsoss/model'

/**
 * Builds a node allowing to display a left & a right text in the {@code primaryText} of a {@link MenuItem}.
 *
 * @author Xavier-Alexandre Brochard
 */
const buildMenuItemPrimaryText = (leftContent, rightContent) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {leftContent}
    <span style={{ color: '#bdbdbd' }}>
      {rightContent}
    </span>
  </div>
)

const getFieldName = (name, pluginMetaData, suffix) => {
  const index = findIndex(pluginMetaData.content.parameters, ['name', name])
  return `parameters.${index}${suffix}`
}

/**
 * Shared prop
 */
const pluginParameterComponentPropTypes = {
  pluginMetaData: PluginMetaData,
  // eslint-disable-next-line react/no-unused-prop-types
  pluginParameter: PluginParameter,
  pluginParameterType: PluginParameterType,
  // eslint-disable-next-line react/no-unused-prop-types
  mode: PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
  // eslint-disable-next-line react/no-unused-prop-types
  change: PropTypes.func, // Callback provided by redux-form in order to manually change a field value
}

export {
  buildMenuItemPrimaryText,
  pluginParameterComponentPropTypes,
  getFieldName,
}

export default buildMenuItemPrimaryText
