/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { ScrollArea } from '@regardsoss/adapters'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { reduxForm, RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'

/**
* Profile edition form component
*/
class ProfileEditionFormComponent extends React.Component {

  static propTypes = {
    // project metadata
    projectMetadata: MetadataList.isRequired,
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
    // TODO, also initialize the metadata
    // const initialValues = {}
    // initialValues[mailFieldId] = this.props.initialMail
    // initialValues[useExistingAccountFieldId] = false
    // this.props.initialize(initialValues)
  }

  render() {
    const {
      projectMetadata, onEdit, onCancel,
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
                  projectMetadata.map(metadata =>
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
                disabled={submitting || invalid || pristine}
                label={<FormattedMessage id="edit.profile.form.confirm" />}
                primary
                type="submit"
              />
              <RaisedButton
                disabled={submitting}
                label={<FormattedMessage id="edit.profile.form.cancel" />}
                primary
                onClick={onCancel}
              />
            </CardActions>
          </Card>
        </form>
      </div >
    )
  }
}


export default reduxForm({ form: 'profileEditionForm' })(ProfileEditionFormComponent)
