/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'

/**
 * React component to display module administration module.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    return (
      <div>
        <Field
          name="conf.title"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'menu.form.title' })}
        />
        <Field
          name="conf.displayAuthentication"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displayauthentication' })}
        />
        <Field
          name="conf.displayLocaleSelector"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaylocale' })}
        />
        <Field
          name="conf.displayThemeSelector"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaytheme' })}
        />
      </div>
    )
  }
}

export default AdminContainer
