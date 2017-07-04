/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Main component of module menu
 * @author <%= author %>
 **/
class SampleComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { moduleTheme, intl } = this.context
    return (
      <div style={moduleTheme.exampleStyle}>
        {intl.formatMessage({ id: 'exampleMessage' })}
      </div>
    )
  }
}

export default SampleComponent
