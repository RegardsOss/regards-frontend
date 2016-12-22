/**
 * LICENSE_PLACEHOLDER
 **/
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'
import { FormattedMessage } from 'react-intl'

/**
 * React component to display module administration module.
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
          label={<FormattedMessage id="menu.form.title" />}
        />
        <Field
          name="conf.displayAuthentication"
          component={RenderCheckbox}
          label={<FormattedMessage id="menu.form.displayauthentication" />}
        />
      </div>
    )
  }
}

export default AdminContainer
