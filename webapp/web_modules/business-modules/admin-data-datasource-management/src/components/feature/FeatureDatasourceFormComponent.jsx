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

import get from 'lodash/get'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import { CardActionsComponent } from '@regardsoss/components'
import {
  reduxForm, Field, ValidationHelpers, RenderTextField,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FemDomain } from '@regardsoss/domain'

const labelValidators = [ValidationHelpers.required, ValidationHelpers.lengthLessThan(128)]

/**
 * React component to edit FEM datasource.
 */
export class FeatureDatasourceFormComponent extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
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
    const { intl: { formatMessage } } = this.context
    if (this.props.isCreating) {
      return formatMessage({ id: 'fem.datasource.create.title' })
    }
    return formatMessage({ id: 'fem.datasource.edit.title' }, { name: this.props.currentDatasource.content.label })
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    const { isCreating, currentDatasource } = this.props
    if (!isCreating) {
      this.props.initialize({
        label: get(currentDatasource, 'content.label'),
        pluginConfiguration: get(currentDatasource, 'content'),
      })
    }
  }

  render() {
    const {
      submitting, invalid, backUrl, isEditing, currentDatasource,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { featureDataSource: { labelFieldStyle } } } = this.context
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={isEditing ? formatMessage({ id: 'fem.datasource.form.subtitle' }, { name: currentDatasource.content.label }) : null}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'datasource.form.label' })}
              validate={labelValidators}
              style={labelFieldStyle}
            />
            <Field
              key="femPlugin"
              name="pluginConfiguration"
              component={RenderPluginField}
              defaultPluginConfLabel={get(currentDatasource, 'content.label')}
              selectLabel={formatMessage({ id: 'datasource.form.pluginConfiguration' })}
              pluginType={FemDomain.PluginTypeEnum.GEOJSON}
              microserviceName={STATIC_CONF.MSERVICES.DAM}
              hideDynamicParameterConf
              hideGlobalParameterConf
              selectorDisabled={isEditing && get(currentDatasource, 'content.pluginConfiguration', null) !== null}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'datasource.form.mapping.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'datasource.form.action.cancel' })}
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
