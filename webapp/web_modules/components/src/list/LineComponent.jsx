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
import merge from 'lodash/merge'
import Checkbox from 'material-ui/Checkbox'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display a line into the PageableListComponent.
 * @author Sébastien Binda
 */
class LineComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired,
    lineComponent: PropTypes.func.isRequired,
    displayCheckbox: PropTypes.bool,
    disabled: PropTypes.bool,
    onEntityCheck: PropTypes.func,
    isSelected: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    additionalPropToLineComponent: PropTypes.object,
  }

  static defaultProps = {
    displayCheckbox: true,
    disabled: false,
    onEntityCheck: () => {
    },
    isSelected: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Root component style */
  static ROOT_STYLE = { lineHeight: '38px' }

  /** Checkbox container style */
  static CHECKBOX_STYLE = { maxWidth: 150, display: 'inline-block' }

  /** Element container styles */
  static ELEMENT_STYLE = { display: 'inline-block' }

  /** User callback: entity check */
  onEntityCheck = () => {
    const { entity, onEntityCheck } = this.props
    onEntityCheck(entity.content)
  }

  render() {
    if (this.props.entity) {
      const element = React.createElement(
        this.props.lineComponent,
        merge({}, { entity: this.props.entity }, this.props.additionalPropToLineComponent),
      )

      let checkbox = null
      if (this.props.displayCheckbox === true) {
        checkbox = (
          <div style={LineComponent.CHECKBOX_STYLE}>
            <Checkbox
              checked={this.props.isSelected}
              onCheck={this.onEntityCheck}
              disabled={this.props.disabled}
            />
          </div>
        )
      }

      return (
        <div className="infinite-list-item" style={LineComponent.ROOT_STYLE}>
          {checkbox}
          <div style={LineComponent.ELEMENT_STYLE}>
            {element}
          </div>
        </div>
      )
    }

    return null
  }
}

export default LineComponent
