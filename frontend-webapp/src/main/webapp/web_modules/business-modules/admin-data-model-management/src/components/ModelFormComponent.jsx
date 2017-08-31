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
import trim from 'lodash/trim'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderFileField, Field, RenderSelectField, reduxForm, ValidationHelpers } from '@regardsoss/form-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

const nameValidators = [ValidationHelpers.required, ValidationHelpers.validAlphaNumericUnderscore, ValidationHelpers.lengthMoreThan(3)]

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

  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentModel } = this.props
      this.props.initialize({
        description: currentModel.content.description,
        name: currentModel.content.name,
      })
    }
  }

  render() {
    const { pristine, submitting, isCreating, isEditing } = this.props
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
            <ShowableAtRender show={!isEditing}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'model.form.name' })}
                validate={nameValidators}
                normalize={trim}
              />
            </ShowableAtRender>
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'model.form.description' })}
            />
            <ShowableAtRender show={isCreating}>
              <div>
                <Field
                  name="type"
                  fullWidth
                  component={RenderSelectField}
                  label={this.context.intl.formatMessage({ id: 'model.form.type' })}
                >
                  <MenuItem value="COLLECTION" primaryText={this.context.intl.formatMessage({ id: 'model.type.collection' })} />
                  <MenuItem value="DATA" primaryText={this.context.intl.formatMessage({ id: 'model.type.data' })} />
                  <MenuItem value="DATASET" primaryText={this.context.intl.formatMessage({ id: 'model.type.dataset' })} />
                </Field>
                <hr />
                <br />
                <FormattedMessage id="model.form.file" />
                <Field
                  name="file"
                  fullWidth
                  component={RenderFileField}
                  accept=".xml"
                />
              </div>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'model.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
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

