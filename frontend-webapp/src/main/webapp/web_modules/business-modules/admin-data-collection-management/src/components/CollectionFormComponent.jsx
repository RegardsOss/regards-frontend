/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { Collection, Model, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, RenderFileField, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import CollectionStepperComponent from './CollectionStepperComponent'
import { fragmentSelectors } from '../clients/FragmentClient'

const DESCRIPTION_MODE = {
  NOTHING: 'nothing',
  FILE: 'file',
  FILE_ALREADY_DEFINED: 'file_already_defined',
  URL: 'url',
}

/**
 * React component to list collections.
 */
export class CollectionFormComponent extends React.Component {

  static propTypes = {
    currentCollection: Collection,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    modelList: PropTypes.objectOf(Model),
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
    isDuplicating: PropTypes.bool,
    handleUpdateModel: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    change: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const isCreating = isNil(props.currentCollection)

    let showDescriptionMode = DESCRIPTION_MODE.NOTHING
    let disableNoDescription = false
    if (!isCreating) {
      if (props.currentCollection.content.descriptionUrl) {
        showDescriptionMode = DESCRIPTION_MODE.URL
      } else if (props.currentCollection.content.descriptionFileType) {
        showDescriptionMode = DESCRIPTION_MODE.FILE
        disableNoDescription = true
      }
    }
    this.state = {
      isCreating,
      disableNoDescription,
      showDescriptionMode,
      isDuplicating: props.isDuplicating,
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

  getAttributeName = (attribute) => {
    if (attribute.fragment.name === fragmentSelectors.noneFragmentName) {
      return `${attribute.name}`
    }
    return `${attribute.fragment.name} ${attribute.name}`
  }

  getTitle = () => {
    let title
    if (this.state.isCreating) {
      title = this.context.intl.formatMessage({ id: 'collection.create.title' })
    } else if (this.state.isDuplicating) {
      title = this.context.intl.formatMessage({ id: 'collection.duplicate.title' }, { name: this.props.currentCollection.content.label })
    } else {
      title = this.context.intl.formatMessage({ id: 'collection.edit.title' }, { name: this.props.currentCollection.content.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentCollection } = this.props
      const parameters = {}
      forEach(currentCollection.content.properties, (attributeValueOrFragment, key) => {
        if (isObject(attributeValueOrFragment)) {
          // It's a fragment
          forEach(attributeValueOrFragment, (attribute, fragmentName) => {
            parameters[fragmentName] = attribute
          })
        } else {
          // This is an attribute
          parameters[key] = attributeValueOrFragment
        }
      })
      const initialValues = {
        label: currentCollection.content.label,
        model: currentCollection.content.model.id,
        descriptionUrl: currentCollection.content.descriptionUrl,
        parameters,
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
    const { modelList, modelAttributeList, submitting, invalid, backUrl } = this.props
    const { showDescriptionMode, disableNoDescription } = this.state
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'collection.form.subtitle' })}
          />
          <CollectionStepperComponent stepIndex={0} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'collection.form.label' })}
            />
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
                    label={this.context.intl.formatMessage({ id: 'collection.form.radio.none' })}
                    disabled={disableNoDescription}
                  />
                  <RadioButton
                    value={DESCRIPTION_MODE.FILE}
                    label={this.context.intl.formatMessage({ id: 'collection.form.radio.descriptionFileContent' })}
                  />
                  <RadioButton
                    value={DESCRIPTION_MODE.URL}
                    label={this.context.intl.formatMessage({ id: 'collection.form.radio.descriptionUrl' })}
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
                    label={this.context.intl.formatMessage({ id: 'collection.form.descriptionUrl' })}
                  />
                </ShowableAtRender>
                <ShowableAtRender show={showDescriptionMode === DESCRIPTION_MODE.FILE}>
                  <ShowableAtRender show={!disableNoDescription}>
                    <FormattedMessage id="collection.form.descriptionFileContent" />
                  </ShowableAtRender>
                  <ShowableAtRender show={disableNoDescription}>
                    <FormattedMessage id="collection.form.descriptionFileContentReuploadToOverride" />
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
              label={this.context.intl.formatMessage({ id: 'collection.form.model' })}
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
                    <TableHeaderColumn><FormattedMessage id="collection.form.table.fragmentAndLabel" /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage id="collection.form.table.type" /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage id="collection.form.table.value" /></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  preScanRows={false}
                  showRowHover
                >
                  {map(modelAttributeList, (modelAttribute, id) => (
                    <TableRow key={id}>
                      <TableRowColumn>{this.getAttributeName(modelAttribute.content.attribute)}</TableRowColumn>
                      <TableRowColumn>{modelAttribute.content.attribute.type}</TableRowColumn>
                      <TableRowColumn>
                        <ShowableAtRender show={modelAttribute.content.mode === 'GIVEN'}>
                          <Field
                            name={`parameters.${modelAttribute.content.attribute.name}`}
                            fullWidth
                            component={RenderTextField}
                            type="text"
                            label={this.context.intl.formatMessage({ id: 'collection.form.table.input' })}
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
              mainButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.action.cancel' })}
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
  form: 'collection-form',
  validate,
})(CollectionFormComponent)

