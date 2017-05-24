/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Dataset, Model, ModelAttribute, Datasource } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, RenderFileField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import DatasetStepperComponent from './DatasetStepperComponent'

const DESCRIPTION_MODE = {
  NOTHING: 'nothing',
  FILE: 'file',
  FILE_ALREADY_DEFINED: 'file_already_defined',
  URL: 'url',
}
/**
 * React component to list datasets.
 */
export class DatasetFormAttributesComponent extends React.Component {

  static propTypes = {
    currentDataset: Dataset,
    modelList: PropTypes.objectOf(Model),
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
    handleUpdateModel: PropTypes.func.isRequired,
    currentDatasource: Datasource,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const isCreating = props.currentDataset === null || props.currentDataset === undefined
    let showDescriptionMode = DESCRIPTION_MODE.NOTHING
    let disableNoDescription = false
    if (!isCreating) {
      if (props.currentDataset.content.descriptionUrl) {
        showDescriptionMode = DESCRIPTION_MODE.URL
      } else if (props.currentDataset.content.descriptionFileType) {
        showDescriptionMode = DESCRIPTION_MODE.FILE
        disableNoDescription = true
      }
    }
    this.state = {
      isCreating,
      showDescriptionMode,
      disableNoDescription,
      isDisplayAttributeValue: !isCreating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }


  onChange = (event, value) => {
    switch (value) {
      case DESCRIPTION_MODE.FILE:
        this.props.change('descriptionUrl', '')
        this.setState({
          showDescriptionMode: DESCRIPTION_MODE.FILE,
        })
        break
      case DESCRIPTION_MODE.URL:
        this.props.change('descriptionFileContent', '')
        this.setState({
          showDescriptionMode: DESCRIPTION_MODE.URL,
        })
        break
      case DESCRIPTION_MODE.NOTHING:
        this.props.change('descriptionFileContent', '')
        this.props.change('descriptionUrl', '')
        this.setState({
          showDescriptionMode: DESCRIPTION_MODE.NOTHING,
        })
        break
      default:
        throw new Error('Unexpected state')
    }
  }

  getTitle = () => {
    let title
    if (!this.props.isEditing) {
      title = <FormattedMessage id="dataset.create.title" />
    } else {
      title = (<FormattedMessage
        id="dataset.edit.title"
        values={{
          name: this.props.currentDataset.content.label,
        }}
      />)
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (this.props.isEditing) {
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
        descriptionUrl: currentDataset.content.descriptionUrl,
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
    const { modelList, modelAttributeList, currentDatasource, submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    const { showDescriptionMode, disableNoDescription } = this.state
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'dataset.form.subtitle' })}
          />
          <DatasetStepperComponent stepIndex={0} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'dataset.form.label' })}
            />
            <SelectField
              floatingLabelText={this.context.intl.formatMessage({ id: 'dataset.form.datasource' })}
              value={currentDatasource.content.pluginConfigurationId}
              fullWidth
              disabled
            >
              <MenuItem
                value={currentDatasource.content.pluginConfigurationId}
                primaryText={currentDatasource.content.label}
              />
            </SelectField>
            <div className="row">
              <div className="col-sm-30">
                <br />
                <RadioButtonGroup
                  valueSelected={showDescriptionMode}
                  onChange={this.onChange}
                  name="descriptionMode"
                >
                  <RadioButton
                    value={DESCRIPTION_MODE.NOTHING}
                    label={this.context.intl.formatMessage({ id: 'dataset.form.radio.none' })}
                    disabled={disableNoDescription}
                  />
                  <RadioButton
                    value={DESCRIPTION_MODE.FILE}
                    label={this.context.intl.formatMessage({ id: 'dataset.form.radio.descriptionFileContent' })}
                  />
                  <RadioButton
                    value={DESCRIPTION_MODE.URL}
                    label={this.context.intl.formatMessage({ id: 'dataset.form.radio.descriptionUrl' })}
                  />
                </RadioButtonGroup>
              </div>
              <div className="col-sm-70">
                <ShowableAtRender show={showDescriptionMode === DESCRIPTION_MODE.URL}>
                  <Field
                    name="descriptionUrl"
                    fullWidth
                    component={RenderTextField}
                    type="text"
                    label={this.context.intl.formatMessage({ id: 'dataset.form.descriptionUrl' })}
                  />
                </ShowableAtRender>
                <ShowableAtRender show={showDescriptionMode === DESCRIPTION_MODE.FILE}>
                  <ShowableAtRender show={!disableNoDescription}>
                    <FormattedMessage id="dataset.form.descriptionFileContent" />
                  </ShowableAtRender>
                  <ShowableAtRender show={disableNoDescription}>
                    <FormattedMessage id="dataset.form.descriptionFileContentReuploadToOverride" />
                  </ShowableAtRender>
                  <Field
                    name="descriptionFileContent"
                    fullWidth
                    accept=".md,.pdf"
                    component={RenderFileField}
                  />
                </ShowableAtRender>
              </div>
            </div>
            <Field
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'dataset.form.model' })}
              disabled={this.props.isEditing}
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
                            label={this.context.intl.formatMessage({ id: 'dataset.form.table.input' })}
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
              mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
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
  form: 'dataset-attributes-form',
  validate,
})(DatasetFormAttributesComponent)

