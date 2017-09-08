/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 * */
import map from 'lodash/map'
import has from 'lodash/has'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderSelectField, Field, RenderFileField, reduxForm, ValidationHelpers } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { EntitiesAttributesFormContainer, getInitialFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import CollectionStepperComponent from './CollectionStepperComponent'

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
    currentCollection: DataManagementShapes.Collection,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    modelList: DataManagementShapes.ModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
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
      if (has(props.currentCollection.content, 'descriptionFile.url')) {
        showDescriptionMode = DESCRIPTION_MODE.URL
      } else if (has(props.currentCollection.content, 'descriptionFile.type')) {
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
      const properties = getInitialFormValues(currentCollection)
      const initialValues = {
        label: currentCollection.content.label,
        geometry: currentCollection.content.geometry,
        model: currentCollection.content.model.id,
        descriptionUrl: get(currentCollection.content, 'descriptionFile.url', undefined),
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
              validate={ValidationHelpers.lengthLessThan(128)}
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
              name="geometry"
              fullWidth
              multiLine
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'collection.form.geometry' })}
            />
            <Field
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'collection.form.model' })}
              disabled={!this.state.isCreating && !this.state.isDuplicating}
              validate={ValidationHelpers.required}
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

export default reduxForm({
  form: 'collection-form',
})(CollectionFormComponent)

