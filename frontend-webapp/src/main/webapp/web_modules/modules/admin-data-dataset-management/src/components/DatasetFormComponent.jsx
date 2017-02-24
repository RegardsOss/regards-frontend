/**
 * LICENSE_PLACEHOLDER
 **/
import { map, forEach, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Dataset, Model, ModelAttribute, Datasource } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetFormComponent extends React.Component {

  static propTypes = {
    currentDataset: Dataset,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    modelList: React.PropTypes.objectOf(Model),
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    currentDatasource: Datasource,
    handleUpdateModel: React.PropTypes.func.isRequired,
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
    const isCreating = props.currentDataset === null || props.currentDataset === undefined
    this.state = {
      isCreating,
      isDisplayAttributeValue: !isCreating,
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
      const { currentDataset } = this.props
      const attributes = {}
      forEach(currentDataset.content.attributes, (attributeValueOrFragment, key) => {
        if (typeof attributeValueOrFragment === 'object') {
          // It's a fragment
          forEach(attributeValueOrFragment, (attribute, id) => {
            attributes[id] = attribute
          })
        } else {
          // This is an attribute
          attributes[key] = attributeValueOrFragment
        }
      })
      const initialValues = {
        label: currentDataset.content.label,
        model: currentDataset.content.model.id,
        attributes,
      }
      this.props.initialize(initialValues)
    }
  }

  /**
   * Fetch new attribute model restriction when the Field type change
   * @param event
   * @param index
   * @param value
   * @param input
   */
  handleChange = (event, index, value, input) => {
    this.setState({
      isDisplayAttributeValue: true,
    })
    input.onChange(value)
    this.props.handleUpdateModel(value)
  }

  render() {
    const { currentDataset, modelList, modelAttributeList, currentDatasource, submitting, invalid, backUrl } = this.props
    let title
    if (this.state.isCreating) {
      title = <FormattedMessage id="dataset.create.title" />
    } else {
      title = (<FormattedMessage
        id="dataset.edit.title"
        values={{
          name: this.props.currentDataset.content.label,
        }}
      />)
    }
    const datasource = currentDataset && currentDataset.content && currentDataset.content.datasource || currentDatasource && currentDatasource.content
    console.log('HELLOOOOOOOOOOOOOOOOOOOOO3', datasource, currentDataset)
    return (
      <ReduxConnectedForm
        i18nMessagesDir="modules/admin-data-dataset-management/src/i18n"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={<FormattedMessage id="dataset.form.subtitle" />}
          />
          <DatasetStepperComponent stepIndex={0} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="dataset.form.label" />}
            />
            <SelectField
              floatingLabelText={<FormattedMessage id="dataset.form.datasource" />}
              value={datasource.id}
              fullWidth
              disabled
            >
              <MenuItem
                value={datasource.id}
                primaryText={datasource.label}
              />
            </SelectField>
            <Field
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={<FormattedMessage id="dataset.form.model" />}
              disabled={!this.state.isCreating}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.id}
                  key={id}
                  primaryText={model.content.name}
                />
              ))}
            </Field>
            <ShowableAtRender show={this.state.isDisplayAttributeValue}>
              <Table
                selectable={false}
              >
                <TableHeader
                  enableSelectAll={false}
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn><FormattedMessage id="dataset.form.table.fragment" /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage id="dataset.form.table.label" /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage id="dataset.form.table.value" /></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  preScanRows={false}
                  showRowHover
                >
                  {map(modelAttributeList, (modelAttribute, id) => (
                    <TableRow key={id}>
                      <TableRowColumn>{modelAttribute.content.attribute.fragment.name}</TableRowColumn>
                      <TableRowColumn>{modelAttribute.content.attribute.name}</TableRowColumn>
                      <TableRowColumn>
                        <ShowableAtRender show={modelAttribute.content.mode === 'GIVEN'}>
                          <Field
                            name={`attributes.${modelAttribute.content.attribute.name}`}
                            fullWidth
                            component={RenderTextField}
                            type="text"
                            label={<FormattedMessage id="dataset.form.table.input" />}
                          />
                        </ShowableAtRender>
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="dataset.form.action.next" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="dataset.form.action.cancel" />}
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
  console.log(errors)
  return errors
}

export default reduxForm({
  form: 'dataset-form',
  validate,
})(DatasetFormComponent)

