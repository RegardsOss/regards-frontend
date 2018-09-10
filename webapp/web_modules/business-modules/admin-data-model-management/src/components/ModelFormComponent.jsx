/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import trim from 'lodash/trim'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import {
  RenderTextField,
  RenderFileFieldWithMui,
  Field,
  RenderSelectField,
  reduxForm,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display edit and create project form
 */
export class ModelFormComponent extends React.Component {
  static propTypes = {
    currentModel: DataManagementShapes.Model,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    if (this.props.isCreating) {
      return this.context.intl.formatMessage({ id: 'model.create.title' })
    }
    if (this.props.isEditing) {
      return this.context.intl.formatMessage({ id: 'model.edit.title' }, { name: this.props.currentModel.content.name })
    }
    return this.context.intl.formatMessage({ id: 'model.duplicate.title' }, { name: this.props.currentModel.content.name })
  }

  /**
   * Builds a function that will apply validators as parameter (from first to last) only when
   * import file is not provided (when import file is provided, those fields are no longer mandatory)
   * @param {[function]} validators validators for field
   * @return {function} validator
   */
  getFieldOrImportValidator = validators => function fieldValidator(value, values) {
    let error
    if (!values.file) {
      error = validators.reduce((acc, validator) => acc || validator(value, values), undefined)
    }
    return error
  }

  /**
   * Validates name field
   * @return validation error
   */
  validateName = this.getFieldOrImportValidator([
    ValidationHelpers.required,
    ValidationHelpers.validAlphaNumericUnderscore,
    ValidationHelpers.lengthMoreThan(3),
  ])

  /**
   * Validates type field
   * @return validation error
   */
  validateType = this.getFieldOrImportValidator([ValidationHelpers.required])

  /**
   * Handles component initialization
   */
  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentModel } = this.props
      this.props.initialize({
        name: currentModel.content.name,
        description: currentModel.content.description,
        type: currentModel.content.type,
      })
    }
  }

  render() {
    const {
      pristine, submitting, isCreating, isEditing, invalid,
    } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <Field
              name="name"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'model.form.name' })}
              validate={this.validateName}
              disabled={isEditing}
              normalize={trim}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'model.form.description' })}
            />
            <Field
              name="type"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'model.form.type' })}
              validate={this.validateType}
              disabled={!isCreating}
            >
              <MenuItem value="COLLECTION" primaryText={this.context.intl.formatMessage({ id: 'model.type.collection' })} />
              <MenuItem value="DATA" primaryText={this.context.intl.formatMessage({ id: 'model.type.data' })} />
              <MenuItem value="DATASET" primaryText={this.context.intl.formatMessage({ id: 'model.type.dataset' })} />
              <MenuItem value="DOCUMENT" primaryText={this.context.intl.formatMessage({ id: 'model.type.document' })} />
            </Field>
            <ShowableAtRender show={isCreating}>
              <hr />
              <br />
              <FormattedMessage id="model.form.file" />
              <Field
                name="file"
                component={RenderFileFieldWithMui}
                accept=".xml"
              />
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'model.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'model.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'model-form',
})(ModelFormComponent)
