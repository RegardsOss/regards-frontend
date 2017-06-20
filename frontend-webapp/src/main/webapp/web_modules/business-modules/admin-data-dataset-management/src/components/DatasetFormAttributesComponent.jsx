/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import keys from 'lodash/keys'
import has from 'lodash/has'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderSelectField, RenderFileField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { EntitiesAttributesFormContainer, getInitialFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

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
    currentDataset: DataManagementShapes.Dataset,
    modelList: DataManagementShapes.ModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    handleUpdateModel: PropTypes.func.isRequired,
    currentDatasource: DataManagementShapes.Datasource,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isCreatinguUsingDatasetValues: PropTypes.bool.isRequired,
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
    const isCreating = isNil(props.currentDataset)
    let showDescriptionMode = DESCRIPTION_MODE.NOTHING
    let disableNoDescription = false
    if (!isCreating) {
      if (has(props.currentDataset.content, 'descriptionFile.url')) {
        showDescriptionMode = DESCRIPTION_MODE.URL
      } else if (has(props.currentDataset.content, 'descriptionFile.type')) {
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
      title = this.context.intl.formatMessage({ id: 'dataset.create.title' })
    } else {
      title = this.context.intl.formatMessage({ id: 'dataset.edit.title' }, { name: this.props.currentDataset.content.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (this.props.isEditing || this.props.isCreatinguUsingDatasetValues) {
      const { currentDataset } = this.props
      const properties = getInitialFormValues(currentDataset)
      const initialValues = {
        label: currentDataset.content.label,
        geometry: currentDataset.content.geometry,
        model: currentDataset.content.model.id,
        descriptionUrl: get(currentDataset.content, 'descriptionFile.url', undefined),
        properties,
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
          <DatasetStepperContainer
            stepIndex={0}
            currentDatasetIpId={get(currentDataset, 'content.ipId', '')}
            currentDatasetId={get(currentDataset, 'content.id', '')}
            isEditing={this.props.isEditing}
          />
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
              name="geometry"
              fullWidth
              multiLine
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'dataset.form.geometry' })}
            />
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
            <EntitiesAttributesFormContainer
              isDisplayAttributeValue={this.state.isDisplayAttributeValue}
              modelAttributeList={modelAttributeList}
            />
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

