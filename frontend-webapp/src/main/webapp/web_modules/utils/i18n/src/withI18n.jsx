/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider } from '@regardsoss/i18n'

const withI18n = path => Component => class WithI18n extends React.Component {
  render() {
    return (
      <I18nProvider messageDir={path}>
        <Component {...this.props} />
      </I18nProvider>
    )
  }
}

export default withI18n
