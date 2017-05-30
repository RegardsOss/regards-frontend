/**
 * LICENSE_PLACEHOLDER
 **/
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to display module administration module.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {

  render() {
    return (
      <div>
        <Field
          name="conf.title"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'menu.form.title' })}
        />
        <Field
          name="conf.displayAuthentication"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'menu.form.displayauthentication' })}
        />
        <Field
          name="conf.displayLocaleSelector"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'menu.form.displaylocale' })}
        />
        <Field
          name="conf.displayThemeSelector"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'menu.form.displaytheme' })}
        />
      </div>
    )
  }
}

AdminContainer.contextTypes = {
  ...i18nContextType,
}

export default AdminContainer
