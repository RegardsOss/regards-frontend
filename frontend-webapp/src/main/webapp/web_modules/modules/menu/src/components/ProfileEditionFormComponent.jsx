/**
* LICENSE_PLACEHOLDER
**/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { ScrollArea } from '@regardsoss/adapters'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { reduxForm } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Profile edition form component
*/
export class ProfileEditionFormComponent extends React.Component {

  static propTypes = {
    // project metadata
    userMetadata: MetadataList.isRequired,
    // cancel function
    onCancel: PropTypes.func.isRequired,
    // submit function
    onEdit: PropTypes.func.isRequired,
    // from redux form
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount = () => {
    // this component is unmounted each time the dialog is no longer visible, what allows us to re-initialize
    // form fields values
    const { userMetadata } = this.props
    const initialFormValues = userMetadata.reduce((acc, { key, currentValue }) => ({
      ...acc,
      [key]: currentValue,
    }), {})
    this.props.initialize(initialFormValues)
  }

  render() {
    const {
      userMetadata, onEdit, onCancel,
      pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { moduleTheme: { user: { profile } } } = this.context
    return (
      <div>
        <form onSubmit={handleSubmit(onEdit)}>
          <Card>
            <CardTitle
              title={this.context.intl.formatMessage({ id: 'edit.profile.form.title' })}
              subtitle={this.context.intl.formatMessage({ id: 'edit.profile.form.message' })}
            />
            <CardText>
              <ScrollArea
                vertical
                horizontal={false}
                style={profile.scrollArea.styles}
              >
                {
                  // show only metadata that are meaningful after registration
                  userMetadata.map(metadata =>
                    metadata.onlyAtRegistration ?
                      null :
                      <MetadataField
                        key={metadata.key}
                        metadata={metadata}
                        fullWidth
                      />)
                }
                <br />
                <br />
              </ScrollArea>
            </CardText>
            <CardActions style={profile.actions.styles}>
              <RaisedButton
                disabled={submitting}
                label={this.context.intl.formatMessage({ id: 'edit.profile.form.cancel' })}
                onClick={onCancel}
              />
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={this.context.intl.formatMessage({ id: 'edit.profile.form.confirm' })}
                primary
                type="submit"
              />
            </CardActions>
          </Card>
        </form>
      </div >
    )
  }
}


export default reduxForm({ form: 'profileEditionForm' })(ProfileEditionFormComponent)
