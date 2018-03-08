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
  static propTypes = {
    /** list of breadcrumb elements */
    // eslint-disable-next-line
    elements: PropTypes.array,
    /** Element label generator: (element, index) => void */
    // eslint-disable-next-line react/no-unused-prop-types
    labelGenerator: PropTypes.func.isRequired,
    /** On breadcrumb element action callback: (element, index) => void */
    // eslint-disable-next-line react/no-unused-prop-types
    onAction: PropTypes.func.isRequired,
    /** Root icon (optional, replaced by default if not provided) */
    rootIcon: PropTypes.node,
  }

  static defaultProps = {
    rootIcon: <DefaultRootIcon />,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => this.onPropertiesChanged(this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps)

  onPropertiesChanged = ({
    elements, labelGenerator, onAction,
  }) => {
    // recompute the dynamic list of elements to show
    this.setState({
      elements: (elements || []).map(this.packElementModel.bind(this, labelGenerator, onAction)),
    })
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
    const { elements } = this.state
    const { rootIcon } = this.props
    const { moduleTheme: { breadcrumb: { style, iconStyle } } } = this.context
    return (
      <div style={style}>
        {
          // for each element, generate array of separator from previous (if not first) and clickable element.
          flatMap(elements, ({ label, onAction }, index) =>
            [
              // add separator when not the first element
              index ? <NextLevelIcon key={`${label}.separator`} style={iconStyle} /> : null,
              // add element itself
              <BreadcrumbElement
                isFirst={!index}
                isLast={index === elements.length - 1}
                key={label}
                label={label}
                onAction={onAction}
                rootIcon={rootIcon}
              />,

            ])
        }
      </div>
    )
  }
}

export default withModuleStyle(styles, true)(Breadcrumb)
