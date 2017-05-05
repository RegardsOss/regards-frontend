/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { ScrollArea } from '@regardsoss/adapters'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { reduxForm } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'

/**
* Profile edition form component
*/
export class ProfileEditionFormComponent extends React.Component {

  static propTypes = {
    // project metadata
    userMetadata: MetadataList.isRequired,
    // cancel function
    onCancel: React.PropTypes.func.isRequired,
    // submit function
    onEdit: React.PropTypes.func.isRequired,
    // from redux form
    pristine: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
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
    const { moduleTheme } = this.context
    return (
      <div>
        <form onSubmit={handleSubmit(onEdit)}>
          <Card>
            <CardTitle
              title={<FormattedMessage id="edit.profile.form.title" />}
              subtitle={<FormattedMessage id="edit.profile.form.message" />}
            />
            <CardText>
              <ScrollArea
                vertical
                horizontal={false}
                style={moduleTheme.profile.scrollArea.styles}
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
            <CardActions style={moduleTheme.profile.actions.styles}>
              <RaisedButton
                disabled={submitting}
                label={<FormattedMessage id="edit.profile.form.cancel" />}
                onClick={onCancel}
              />
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={<FormattedMessage id="edit.profile.form.confirm" />}
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
