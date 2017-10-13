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
 **/
import map from 'lodash/map'
import keys from 'lodash/keys'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderSelectField, Field,ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { EntitiesAttributesFormContainer, getInitialFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import MenuItem from 'material-ui/MenuItem'
import DocumentStepperContainer from '../containers/DocumentStepperContainer'


/**
 * React component to list documents.
 */
export class DocumentFormComponent extends React.Component {

  static propTypes = {
    currentDocument: DataManagementShapes.Document,
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
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const isCreating = isNil(props.currentDocument)
    this.state = {
      isCreating,
      isDuplicating: props.isDuplicating,
      isDisplayAttributeValue: !isCreating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    let title
    if (this.state.isCreating) {
      title = this.context.intl.formatMessage({ id: 'document.create.title' })
    } else if (this.state.isDuplicating) {
      title = this.context.intl.formatMessage({ id: 'document.duplicate.title' }, { name: this.props.currentDocument.content.label })
    } else {
      title = this.context.intl.formatMessage({ id: 'document.edit.title' }, { name: this.props.currentDocument.content.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentDocument } = this.props
      const properties = getInitialFormValues(currentDocument)
      const initialValues = {
        label: currentDocument.content.label,
        geometry: currentDocument.content.geometry,
        model: currentDocument.content.model.id,
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
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'document.form.subtitle' })}
          />
          <DocumentStepperContainer
            stepIndex={0}
            isEditing={!this.state.isCreating}
            currentDocumentId={get(this.props.currentDocument, 'content.id', 'undefined')}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'document.form.label' })}
            />
            <Field
              name="geometry"
              fullWidth
              multiLine
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'document.form.geometry' })}
            />
            <Field
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'document.form.model' })}
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
            <EntitiesAttributesFormContainer
              isDisplayAttributeValue={this.state.isDisplayAttributeValue}
              modelAttributeList={modelAttributeList}
              isEditing={!this.state.isCreating && !this.state.isDuplicating}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'document.form.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'document.form.action.cancel' })}
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
  form: 'document-form',
  validate,
})(DocumentFormComponent)

