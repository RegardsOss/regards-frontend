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
import { RadioButton } from 'material-ui/RadioButton'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import {
  RenderCheckbox, RenderRadio, RenderTextField, Field, FieldsGroup,
} from '@regardsoss/form-utils'
import { DataViewsConfiguration, DatasetViewsConfiguration } from '../../../shapes/ModuleConfiguration'

/**
 * Entity type general configuration
 * @author Raphaël Mechali
 */
class EntityTypeConfigurationComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    // Namespace and current form values are provided for type
    currentTypeNamespace: PropTypes.string.isRequired,
    currentTypeFormValues: PropTypes.oneOfType([
      DataViewsConfiguration,
      DatasetViewsConfiguration,
    ]).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { type, currentTypeNamespace, currentTypeFormValues } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        {/* 1. View initial results display mode  */}
        <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.initial.view.mode' })}>
          <Field name={`${currentTypeNamespace}.initialMode`} component={RenderRadio}>
            <RadioButton
              label={formatMessage({ id: 'search.results.form.configuration.result.show.list.initially' })}
              value={UIDomain.RESULTS_VIEW_MODES_ENUM.LIST}
              // Nota: List and table share the same redux space (unique configuration)
              disabled={!get(currentTypeFormValues, `views.${UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE}.enabled`, false)}
            />
            <RadioButton
              label={formatMessage({ id: 'search.results.form.configuration.result.show.table.initially' })}
              value={UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE}
              disabled={!get(currentTypeFormValues, `views.${UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE}.enabled`, false)}
            />
            <RadioButton
              label={formatMessage({ id: 'search.results.form.configuration.result.show.quicklook.initially' })}
              value={UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK}
              disabled={!get(currentTypeFormValues, `views.${UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK}.enabled`, false)}
            />
            <RadioButton
              label={formatMessage({ id: 'search.results.form.configuration.result.show.map.initially' })}
              value={UIDomain.RESULTS_VIEW_MODES_ENUM.MAP}
              disabled={!get(currentTypeFormValues, `views.${UIDomain.RESULTS_VIEW_MODES_ENUM.MAP}.enabled`, false)}
            />
          </Field>
        </FieldsGroup>
        {/* 2. View tab title (to be shown when module shows multiple entity types) */}
        <FieldsGroup clearSpaceToChildren spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.type.tab.title.message' })}>
          <Field
            name={`${currentTypeNamespace}.tabTitle.en`}
            component={RenderTextField}
            label={formatMessage({ id: 'search.results.form.configuration.result.type.tab.label.en' })}
            hintText={formatMessage({ id: 'search.results.form.configuration.result.type.tab.hint' })}
            fullWidth
          />
          <Field
            name={`${currentTypeNamespace}.tabTitle.fr`}
            component={RenderTextField}
            label={formatMessage({ id: 'search.results.form.configuration.result.type.tab.label.fr' })}
            hintText={formatMessage({ id: 'search.results.form.configuration.result.type.tab.hint' })}
            fullWidth
          />
        </FieldsGroup>
        <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.options.title' })}>
          {/* 3. Other options
              3.A - Refresh option */ }
          <Field
            name={`${currentTypeNamespace}.enableRefresh`}
            fullWidth
            component={RenderCheckbox}
            label={formatMessage({ id: 'search.results.form.configuration.result.options.enable.refresh' })}
          />
          { /** 3.B - Download */
            UIDomain.ResultsContextConstants.allowDownload(type)
              ? (
                <Field
                  name={`${currentTypeNamespace}.enableDownload`}
                  fullWidth
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'search.results.form.configuration.result.options.enable.download' })}
                />)
              : null
          }
          { /** 3.C - Services */
            UIDomain.ResultsContextConstants.allowServices(type)
              ? (
                <Field
                  name={`${currentTypeNamespace}.enableServices`}
                  fullWidth
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'search.results.form.configuration.result.options.enable.services' })}
                />)
              : null
          }

        </FieldsGroup>
      </div>
    )
  }
}
export default EntityTypeConfigurationComponent
