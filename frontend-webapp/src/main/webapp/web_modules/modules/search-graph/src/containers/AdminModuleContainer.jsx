/**
 * LICENSE_PLACEHOLDER
 **/
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'
import { FormattedMessage } from 'react-intl'

/**
 * Module container for admin interface (module instance configuration)
 */
class AdminModuleContainer extends React.Component {

  render() {
    return (
      <div>
        <Field
          name="conf.title"
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="menu.form.title" />}
        />
        <Field
          name="conf.displayAuthentication"
          component={RenderCheckbox}
          label={<FormattedMessage id="menu.form.displayauthentication" />}
        />
        <Field
          name="conf.displayLocaleSelector"
          component={RenderCheckbox}
          label={<FormattedMessage id="menu.form.displaylocale" />}
        />
        <Field
          name="conf.displayThemeSelector"
          component={RenderCheckbox}
          label={<FormattedMessage id="menu.form.displaytheme" />}
        />
      </div>
    )
  }
}

export default AdminModuleContainer
