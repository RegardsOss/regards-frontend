import { PluginParameter, PluginParameterType } from '@regardsoss/model'

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

/**
 * Shared prop
 */
const pluginParameterComponentPropTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  fieldKey: PropTypes.string,
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
}

export default buildMenuItemPrimaryText
