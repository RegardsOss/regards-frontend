/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DefaultRootIcon from 'mdi-material-ui/MapMarker'
import NextLevelIcon from 'mdi-material-ui/ChevronRight'
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

  /** Default icon generator: generates no icon, use root icon instead */
  static DEFAULT_ICON_GENERATOR = (elt, index) => null

  /** Default navigation predicate implementation: always returns true  */
  static DEFAULT_NAVIGATION_ALLOWED_PREDICTATE = (elt, index) => true

  static propTypes = {
    /** list of breadcrumb elements */
    elements: PropTypes.arrayOf(PropTypes.any).isRequired,
    /** Element label generator: (element, index) => void */
    labelGenerator: PropTypes.func,
    /** Icon generator: (element, index) => (React.Element, optional) */
    iconGenerator: PropTypes.func,
    /**
     * Predicate providing the navigation allowed state by element: (element, index) => boolean.
     * Note: last breadcrumb element is necessarily not navigable, so the predicate can return true
     * based on business navigation only
     */
    navigationAllowedPredicate: PropTypes.func,
    /** On breadcrumb element action callback: (element, index) => void */
    onAction: PropTypes.func.isRequired,
    /**
     * Root icon (optional, replaced by default when not provided). Please note that iconGenerator will be called at level index 0
     * and that return values will have precedence on this rootIcon property (this is just a shortcut for various use case)
     */
    rootIcon: PropTypes.node,
  }

  static defaultProps = {
    rootIcon: <DefaultRootIcon />,
    labelGenerator: Breadcrumb.DEFAULT_LABEL_GENERATOR,
    iconGenerator: Breadcrumb.DEFAULT_ICON_GENERATOR,
    navigationAllowedPredicate: Breadcrumb.DEFAULT_NAVIGATION_ALLOWED_PREDICTATE,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Packs the rendering model for element and index as parameter, so that no newq reference is generated at render time
   * @param {Function} labelGenerator label generator
   * @param {Function} onAction on click action
   * @param {*} element corresponding element
   * @param {number} index corresponding element index in breadcrumb
   * @return {*} element model
   */
  packElementModel = (labelGenerator, onAction, element, index) => ({
    label: labelGenerator(element, index),
    onAction: () => onAction(element, index),
  })

  /**
   * Provides icon to use for given element
   * @param {*} element corresponding element
   * @param {number} index corresponding element index in breadcrumb
   * @return {React.Element} built icon (optional)
   */
  getElementIcon = (element, index) => {
    const { rootIcon, iconGenerator } = this.props
    const builtLevelIcon = iconGenerator(element, index)
    // for root icon, if none was built, use rootIcon from properties
    return index === 0 && !builtLevelIcon ? rootIcon : builtLevelIcon
  }

  render() {
    const {
      elements, labelGenerator, navigationAllowedPredicate, onAction,
    } = this.props
    const { moduleTheme: { breadcrumb: { style, breadcrumbIcon } } } = this.context
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
                index ? <NextLevelIcon key={`${index}:${elementLabel}.separator`} style={breadcrumbIcon.defaultStyle} /> : null,
                // add element itself
                <BreadcrumbElement
                  key={`${index}:${elementLabel}.element`}
                  element={element}
                  index={index}
                  label={elementLabel}
                  icon={this.getElementIcon(element, index)}
                  navigationAllowed={navigationAllowed}
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
