/**
 * LICENSE_PLACEHOLDER
 **/
import { map, forEach, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Datasource, Model, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import DatasourceStepperComponent from './DatasourceStepperComponent'

/**
 * React component to list datasources.
 */
export class DatasourceFormComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    modelList: React.PropTypes.objectOf(Model),
    isDuplicating: React.PropTypes.bool,
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
      isDuplicating: props.isDuplicating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentDatasource } = this.props
      const initialValues = {
        label: currentDatasource.content.label,
        model: currentDatasource.content.model.id,
      }
      this.props.initialize(initialValues)
    }
  }

  render() {
    const { modelList, submitting, invalid, backUrl } = this.props
    let title
    if (this.state.isCreating) {
      title = <FormattedMessage id="datasource.create.title" />
    } else if (this.state.isDuplicating) {
      title = (<FormattedMessage
        id="datasource.duplicate.title"
        values={{
          name: this.props.currentDatasource.content.label,
        }}
      />)
    } else {
      title = (<FormattedMessage
        id="datasource.edit.title"
        values={{
          name: this.props.currentDatasource.content.label,
        }}
      />)
    }
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
          <DatasourceStepperComponent stepIndex={0} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="datasource.form.label" />}
            />
            <Field
              name="model"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="datasource.form.model" />}
              disabled={!this.state.isCreating && !this.state.isDuplicating}
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
})(DatasourceFormComponent)

