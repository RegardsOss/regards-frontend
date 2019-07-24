/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import DefaultRootIcon from 'material-ui/svg-icons/communication/location-on'
import NextLevelIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import BreadcrumbElement from './BreadcrumbElement'
import styles from './styles'

/**
 * Breadcrumb displayer (with element types).
 *
 * @author Raphaël Mechali
 */
export class Breadcrumb extends React.Component {
  /** Default label generator (more like a stub, not adviced in final versions!) */
  static DEFAULT_LABEL_GENERATOR = (elt, index) => `level ${index + 1}`

  /** Default navigation predicate implementation: always returns true  */
  static DEFAULT_NAVIGATION_ALLOWED_PREDICTATE = (elt, index) => true

  static propTypes = {
    /** list of breadcrumb elements */
    elements: PropTypes.arrayOf(PropTypes.any).isRequired,
    /** Element label generator: (element, index) => void */
    labelGenerator: PropTypes.func,
    /**
     * Predicate providing the navigation allowed state by element: (element, index) => boolean.
     * Note: last breadcrumb element is necessarily not navigable, so the predicate can return true
     * based on business navigation only!
     */
    navigationAllowedPredicate: PropTypes.func,
    /** On breadcrumb element action callback: (element, index) => void */
    onAction: PropTypes.func.isRequired,
    /** Root icon (optional, replaced by default if not provided) */
    rootIcon: PropTypes.node,
  }

  static defaultProps = {
    rootIcon: <DefaultRootIcon />,
    labelGenerator: Breadcrumb.DEFAULT_LABEL_GENERATOR,
    navigationAllowedPredicate: Breadcrumb.DEFAULT_NAVIGATION_ALLOWED_PREDICTATE,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Packs the rendering model for element and index as parameter, so that no newq reference is generated at render time
   * @param labelGenerator label generator
   */
  packElementModel = (labelGenerator, onAction, element, index) => ({
    label: labelGenerator(element, index),
    onAction: () => onAction(element, index),
  })

  render() {
    const {
      elements, rootIcon, labelGenerator, navigationAllowedPredicate, onAction,
    } = this.props
    const { moduleTheme: { breadcrumb: { style, iconStyle } } } = this.context
    return (
      <div style={style}>
        {
          // for each element, generate array of separator from previous (if not first) and clickable element.
          flatMap(elements,
            (element, index) => {
              const elementLabel = labelGenerator(element, index)
              const navigationAllowed = navigationAllowedPredicate(element, index)
              return [
                // add separator when not the first element
                index ? <NextLevelIcon key={`${index}:${elementLabel}.separator`} style={iconStyle} /> : null,
                // add element itself
                <BreadcrumbElement
                  key={`${index}:${elementLabel}.element`}
                  element={element}
                  index={index}
                  label={elementLabel}
                  navigationAllowed={navigationAllowed}
                  rootIcon={rootIcon}
                  isFirst={!index}
                  isLast={index === elements.length - 1}
                  onAction={onAction}
                />]
            })
        }
      </div>
    )
  }
}

export default withModuleStyle(styles, true)(Breadcrumb)
