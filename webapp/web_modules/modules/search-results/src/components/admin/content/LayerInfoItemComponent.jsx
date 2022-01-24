/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import {
  RenderRadio, RenderSelectField, RenderTextField, ValidationHelpers, FieldsGroup, RenderCheckbox, Field,
} from '@regardsoss/form-utils'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import RadioButton from 'material-ui/RadioButton'
import messages from '../../../i18n'

const {
  validStringSize,
} = ValidationHelpers
const validString255 = [validStringSize(0, 255)]

/**
 * Display a form to create or edit a Layer
 * @author Théo Lasserre
 */
export class LayerInfoItemComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    mapEngine: PropTypes.string.isRequired,
    getMenuItems: PropTypes.func.isRequired,
    validateBackgroundURL: PropTypes.func.isRequired,
    validateBackgroundConf: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired, // current selected form values from RenderArrayObjectField
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  displayLayersNameField = (layerType) => {
    const {
      name,
    } = this.props
    const { intl: { formatMessage } } = this.context
    if (layerType === UIDomain.CESIUM_LAYER_TYPES_ENUM.WMS || layerType === UIDomain.CESIUM_LAYER_TYPES_ENUM.WMTS
      || layerType === UIDomain.MIZAR_LAYER_TYPES_ENUM.WMS || layerType === UIDomain.MIZAR_LAYER_TYPES_ENUM.WMTS) {
      return <Field
        name={`${name}.layersName`}
        component={RenderTextField}
        label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.layersName' })}
        fullWidth
        validate={ValidationHelpers.required}
      />
    }
    return null
  }

  render() {
    const {
      name, mapEngine, getMenuItems, validateBackgroundURL, validateBackgroundConf, entity,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <>
        <FieldsGroup name={`${name}.commonFields`} clearSpaceToChildren>
          <Field
            name={`${name}.layerName`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.name' })}
            validate={validString255}
          />
          <Field
            name={`${name}.enabled`}
            fullWidth
            component={RenderCheckbox}
            label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.enable' })}
          />
          <Field
            name={`${name}.background`}
            fullWidth
            component={RenderCheckbox}
            label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.background' })}
          />
        </FieldsGroup>
        <FieldsGroup name={`${name}.layerViewModeFields`} title={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.viewMode.title' })}>
          <Field name={`${name}.layerViewMode`} component={RenderRadio} defaultSelected={UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D}>
            {
              map(UIDomain.MAP_VIEW_MODES_ENUM, (mapViewMode) => (
                <RadioButton
                  key={mapViewMode}
                  label={formatMessage({ id: `search.results.form.configuration.result.MAP.viewMode.${mapViewMode}` })}
                  value={mapViewMode}
                />
              ))
            }
          </Field>
        </FieldsGroup>
        <Field
          name={`${name}.url`}
          component={RenderTextField}
          label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.url' })}
          fullWidth
          validate={validateBackgroundURL}
        />
        <Field
          name={`${name}.type`}
          component={RenderSelectField}
          label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.type' })}
          fullWidth
        >
          {
            getMenuItems(mapEngine)
          }
        </Field>
        {
          this.displayLayersNameField(entity.type)
        }
        <Field
          name={`${name}.conf`}
          component={RenderTextField}
          label={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.conf' })}
          validate={validateBackgroundConf}
          fullWidth
        />
      </>
    )
  }
}
export default withI18n(messages)(LayerInfoItemComponent)
