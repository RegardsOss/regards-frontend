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

  displayListItem = (property) => {
    const { sessionStep, stepSubType } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          listItemStyle, listItemNoValueStyle, listItemErrorStyle,
          listItemWaitStyle,
        },
      },
    } = this.context
    let propValue = get(sessionStep, `properties.${property}`, 0)
    let style = listItemNoValueStyle
    if (propValue > 0) {
      style = listItemStyle
    }

    // Data provider specific properties : DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM
    if (stepSubType === STEP_SUB_TYPES_ENUM.DATA_PROVIDER) {
      if (property === DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM.PRODUCTS_ERRORS) {
        propValue = parseInt(get(sessionStep, 'properties.generationError', 0), 10) + parseInt(get(sessionStep, 'properties.ingestionFailed', 0), 10)
        style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
      }
    }
    // Feature provider specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.FEATURE_PROVIDER) {
      if (property === FEATURE_PROVIDER_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
        style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
      }
    }
    // Feature manager specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.FEATURE_MANAGER) {
      if (property === FEM_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
        propValue = parseInt(get(sessionStep, 'properties.inErrorReferencingRequests', 0), 10) + parseInt(get(sessionStep, 'properties.inErrorDeleteRequests', 0), 10) + parseInt(get(sessionStep, 'properties.inErrorUpdateRequests', 0), 10) + parseInt(get(sessionStep, 'properties.inErrorNotifyRequests', 0), 10)
        style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
      }
    }
    // Ingest specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.INGEST) {
      if (property === INGEST_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
        style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
      } else if (property === INGEST_PRODUCTS_PROPERTIES_ENUM.PRODUCT_WAIT_VERSION_MODE) {
        style = propValue > 0 ? listItemWaitStyle : listItemNoValueStyle
      }
    }
    // Storage specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.STORAGE) {
      if (property === STORAGE_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
        style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
      }
    }
    // Diffusion specific properties
    if (stepSubType === STEP_SUB_TYPES_ENUM.DISSEMINATION) {
      if (property === DIFFUSION_PRODUCTS_PROPERTIES_ENUM.INDEXED_ERROR) {
        style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
      }
    }

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
