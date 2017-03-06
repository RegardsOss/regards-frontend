/**
 * LICENSE_PLACEHOLDER
 **/
import { map, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Datasource, Model, Connection } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import DatasourceStepperComponent from './DatasourceStepperComponent'

/**
 * React component to edit datasources attributes.
 */
export class DatasourceFormAttributesComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    currentConnection: Connection,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    modelList: React.PropTypes.objectOf(Model),
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const isCreating = props.currentDatasource === null || props.currentDatasource === undefined
    this.state = {
      isCreating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    if (this.state.isCreating) {
      return <FormattedMessage id="datasource.create.title" />
    }
    return (<FormattedMessage
      id="datasource.edit.title"
      values={{
        name: this.props.currentDatasource.content.label,
      }}
    />)
  }


  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentDatasource } = this.props
      const initialValues = {
        label: currentDatasource.content.label,
        model: currentDatasource.content.mapping.model,
      }
      this.props.initialize(initialValues)
    }
  }

  render() {
    const { currentConnection, modelList, submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    return (
      <ReduxConnectedForm
        i18nMessagesDir="modules/admin-data-datasource-management/src/i18n"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={<FormattedMessage id="datasource.form.subtitle" />}
          />
          <DatasourceStepperComponent stepIndex={1} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="datasource.form.label" />}
            />
            <SelectField
              floatingLabelText={<FormattedMessage id="datasource.form.connection" />}
              fullWidth
              value={currentConnection.content.id}
              disabled
            >
              <MenuItem
                value={currentConnection.content.id}
                primaryText={currentConnection.content.label}
              />
            </SelectField>
            <Field
              name="model"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="datasource.form.model" />}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.id}
                  key={id}
                  primaryText={model.content.name}
                />
              ))}
            </Field>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="datasource.form.action.next" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="datasource.form.action.cancel" />}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </ReduxConnectedForm>
    )
  }
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
  if (!keys(values).length) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (values.label) {
    if (values.label.length > 128) {
      errors.label = 'invalid.max_128_carac'
    }
  } else {
    errors.label = ErrorTypes.REQUIRED
  }
  if (!values.model) {
    errors.model = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'datasource-form',
  validate,
})(DatasourceFormAttributesComponent)

