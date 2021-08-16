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
import { AdminShapes } from '@regardsoss/shape'
import map from 'lodash/map'
import get from 'lodash/get'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ListItem } from 'material-ui/List'
import { DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM } from '../domain/dataProviderProperties'
import { FEM_REQUESTS_PROPERTIES_ENUM } from '../domain/femProperties'
import { FEATURE_PROVIDER_REQUESTS_PROPERTIES_ENUM } from '../domain/featureProviderProperties'
import { INGEST_REQUESTS_PROPERTIES_ENUM, INGEST_PRODUCTS_PROPERTIES_ENUM } from '../domain/ingestProperties'
import { STORAGE_REQUESTS_PROPERTIES_ENUM } from '../domain/storageProperties'
import { DIFFUSION_PRODUCTS_PROPERTIES_ENUM } from '../domain/diffusionProperties'
import { STEP_SUB_TYPES_ENUM } from '../domain/stepSubTypes'

/**
 * Display a step properties
 * @author Théo Lasserre
 */
class DisplayPropertiesComponent extends React.Component {
  static propTypes = {
    properties: PropTypes.arrayOf(PropTypes.string).isRequired,
    sessionStep: AdminShapes.SessionStep,
    stepSubType: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  getIntValue = (sessionStep, property) => parseInt(get(sessionStep, `properties.${property}`, '0'), 10)

  getPropValue = (property) => {
    const { sessionStep, stepSubType } = this.props
    // Data provider specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.DATA_PROVIDER) {
      if (property === DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM.PRODUCTS_ERRORS) {
        return this.getIntValue(sessionStep, 'generationError') + this.getIntValue(sessionStep, 'ingestionFailed')
      }
    }
    // Feature manager specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.FEATURE_MANAGER) {
      if (property === FEM_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
        return this.getIntValue(sessionStep, 'inErrorReferencingRequests') + this.getIntValue(sessionStep, 'inErrorDeleteRequests') + this.getIntValue(sessionStep, 'inErrorUpdateRequests') + this.getIntValue(sessionStep, 'inErrorNotifyRequests')
      }
    }
    return this.getIntValue(sessionStep, property)
  }

  getItemStyle = (propValue, itemStyle1, itemStyle2) => propValue > 0 ? itemStyle1 : itemStyle2

  getStyle = (property, propValue) => {
    const { stepSubType } = this.props
    const {
      moduleTheme: {
        selectedSessionStyle: {
          listItemStyle, listItemNoValueStyle, listItemErrorStyle,
          listItemWaitStyle,
        },
      },
    } = this.context

    let style = this.getItemStyle(propValue, listItemStyle, listItemNoValueStyle)

    // Data provider specific style
    if (stepSubType === STEP_SUB_TYPES_ENUM.DATA_PROVIDER
        && property === DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM.PRODUCTS_ERRORS) {
      style = this.getItemStyle(propValue, listItemErrorStyle, listItemNoValueStyle)
    }
    // Feature provider specific style
    if (stepSubType === STEP_SUB_TYPES_ENUM.FEATURE_PROVIDER
      && property === FEATURE_PROVIDER_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      style = this.getItemStyle(propValue, listItemErrorStyle, listItemNoValueStyle)
    }
    // Feature manager specific style
    if (stepSubType === STEP_SUB_TYPES_ENUM.FEATURE_MANAGER
      && property === FEM_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      style = this.getItemStyle(propValue, listItemErrorStyle, listItemNoValueStyle)
    }
    // Ingest specific style
    if (stepSubType === STEP_SUB_TYPES_ENUM.INGEST) {
      if (property === INGEST_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
        style = this.getItemStyle(propValue, listItemErrorStyle, listItemNoValueStyle)
      } else if (property === INGEST_PRODUCTS_PROPERTIES_ENUM.PRODUCT_WAIT_VERSION_MODE) {
        style = this.getItemStyle(propValue, listItemWaitStyle, listItemNoValueStyle)
      }
    }
    // Storage specific style
    if (stepSubType === STEP_SUB_TYPES_ENUM.STORAGE
      && property === STORAGE_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      style = this.getItemStyle(propValue, listItemErrorStyle, listItemNoValueStyle)
    }
    // Diffusion specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.DISSEMINATION
      && property === DIFFUSION_PRODUCTS_PROPERTIES_ENUM.INDEXED_ERROR) {
      style = this.getItemStyle(propValue, listItemErrorStyle, listItemNoValueStyle)
    }
    return style
  }

  displayListItem = (property) => {
    const { sessionStep, stepSubType } = this.props
    const { intl: { formatMessage } } = this.context
    const propValue = this.getPropValue(property)
    const style = this.getStyle(property, propValue)

    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.${sessionStep.type}.${stepSubType}.${property}` }, { value: propValue || 0 })}
        title={formatMessage({ id: `dashboard.selectedsession.${sessionStep.type}.${stepSubType}.${property}.tooltip` }, { value: propValue || 0 })}
        disabled
        style={style}
      />
    )
  }

  render() {
    const { properties } = this.props
    return (
      map(properties, (property) => this.displayListItem(property))
    )
  }
}
export default DisplayPropertiesComponent
