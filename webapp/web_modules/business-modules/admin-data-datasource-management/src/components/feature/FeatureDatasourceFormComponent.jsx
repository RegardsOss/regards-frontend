/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import {
  reduxForm, RenderTextField, RenderSelectField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import {
  IAIPDatasourceParamsEnum,
} from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'

const { findParam } = PluginConfParamsUtils

const labelValidators = [ValidationHelpers.required, ValidationHelpers.lengthLessThan(128)]

/**
 * React component to edit FEM datasource.
 */
export class FeatureDatasourceFormComponent extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    modelList: DataManagementShapes.ModelList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,

    // from reduxForm
    submitting: PropTypes.bool,
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
      return this.context.intl.formatMessage({ id: 'fem.datasource.create.title' })
    }
    return this.context.intl.formatMessage({ id: 'fem.datasource.edit.title' }, { name: this.props.currentDatasource.content.label })
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    const { isCreating, currentDatasource } = this.props

    if (!isCreating) {
      const modelName = get(findParam(currentDatasource, IAIPDatasourceParamsEnum.MODEL), 'value')
      const initialValues = {
        label: currentDatasource.content.label,
        model: modelName,
      }
      this.props.initialize(initialValues)
    }
  }

  render() {
    const {
      modelList, submitting, invalid, backUrl, isEditing, currentDatasource,
    } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'fem.datasource.form.subtitle' }, { name: currentDatasource.content.label })}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'datasource.form.label' })}
              validate={labelValidators}
            />
            <Field
              name="model"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'datasource.form.model' })}
              disabled={isEditing}
              validate={ValidationHelpers.required}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.name}
                  key={model.content.name}
                  primaryText={model.content.name}
                  className={`selenium-pickModel-${model.content.name}`}
                />
              ))}
            </Field>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.mapping.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'fem-datasource-form',
})(FeatureDatasourceFormComponent)
