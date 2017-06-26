/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'

const style = {
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

/**
 * In case of an http status 413: Request Entity Too Large
 *
 * @author Xavier-Alexandre Brochard
 */
class DefaultRequestEntityTooLargeComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="utils/display-control/src/i18n">
        <div style={style.wrapper}>
          <FormattedMessage id="request.entity.too.large" />
        </div>
      </I18nProvider>
    )
  }
}

export default DefaultRequestEntityTooLargeComponent
