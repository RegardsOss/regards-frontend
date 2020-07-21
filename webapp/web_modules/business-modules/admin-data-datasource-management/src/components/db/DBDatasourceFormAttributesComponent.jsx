/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import {
  reduxForm, RenderTextField, RenderSelectField, Field, FieldArray, ValidationHelpers, RenderArrayTextField,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import { IDBDatasourceParamsEnum, DATASOURCE_REFRESH_RATE } from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import SelectField from 'material-ui/SelectField'
import DBDatasourceStepperComponent from './DBDatasourceStepperComponent'

const { findParam } = PluginConfParamsUtils

const labelValidators = [ValidationHelpers.required, ValidationHelpers.lengthLessThan(128)]

/**
 * React component to edit datasources attributes.
 */
export class DBDatasourceFormAttributesComponent extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    currentConnection: DataManagementShapes.Connection,
    modelList: DataManagementShapes.ModelList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
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

  state = {
    isCreating: isNil(this.props.currentDatasource),
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    if (this.state.isCreating) {
      return this.context.intl.formatMessage({ id: 'datasource.create.title' })
    }
    return this.context.intl.formatMessage({ id: 'datasource.edit.title' }, { name: this.props.currentDatasource.content.label })
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentDatasource } = this.props

      const refreshRate = get(findParam(currentDatasource, IDBDatasourceParamsEnum.REFRESH_RATE), 'value')
      const modelName = get(findParam(currentDatasource, IDBDatasourceParamsEnum.MODEL), 'value')
      const tags = get(findParam(currentDatasource, IDBDatasourceParamsEnum.TAGS), 'value', [])

      const initialValues = {
        label: currentDatasource.content.label,
        model: modelName,
        pluginId: currentDatasource.content.pluginId,
        refreshRate,
        tags,
      }
      this.props.initialize(initialValues)
    } else {
      this.props.initialize({
        refreshRate: DATASOURCE_REFRESH_RATE,
      })
    }
  }

  render() {
    const {
      currentConnection, modelList, pluginMetaDataList, submitting, invalid, backUrl,
    } = this.props
    const title = this.getTitle()

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.subtitle' })}
          />
          <DBDatasourceStepperComponent stepIndex={1} />
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
              name="refreshRate"
              fullWidth
              component={RenderTextField}
              type="number"
              label={this.context.intl.formatMessage({ id: 'datasource.form.refreshRate' })}
            />
            <SelectField
              floatingLabelText={this.context.intl.formatMessage({ id: 'datasource.form.connection' })}
              fullWidth
              value={currentConnection.content.id}
              disabled
            >
              <MenuItem
                value={currentConnection.content.id}
                primaryText={currentConnection.content.label}
              />
            </SelectField>
            <Field
              name="model"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'datasource.form.model' })}
              disabled={!this.state.isCreating}
              validate={ValidationHelpers.required}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.name}
                  key={id}
                  primaryText={model.content.name}
                  className={`selenium-pickModel-${model.content.name}`}
                />
              ))}
            </Field>
            <Field
              name="pluginId"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'datasource.form.pluginConfiguration' })}
              disabled={!this.state.isCreating}
              validate={ValidationHelpers.required}
            >
              {map(pluginMetaDataList, ({ content: { pluginId, version } }) => (
                <MenuItem
                  key={pluginId}
                  value={pluginId}
                  primaryText={`${pluginId}: ${version}`}
                  className={`selenium-pickPlugin-${pluginId}`}
                />
              ))}
            </Field>
            <FieldArray
              name="tags"
              component={RenderArrayTextField}
              fieldsListLabel={this.context.intl.formatMessage({ id: 'datasource.form.tags' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.action.next' })}
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
  form: 'datasource-form',
})(DBDatasourceFormAttributesComponent)
