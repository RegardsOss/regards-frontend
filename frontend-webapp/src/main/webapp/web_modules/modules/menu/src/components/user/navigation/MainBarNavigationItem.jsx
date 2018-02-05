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
import Measure from 'react-measure'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import { themeContextType } from '@regardsoss/theme'

/**
 * Item to display a navigation item (with or without subsections) in main app bar
 * @author Raphaël Mechali
 */
class MainBarNavigationItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
      moduleId: PropTypes.number.isRequired,
    }),
    displayed: PropTypes.bool.isRequired,
    onItemResized: PropTypes.func.isRequired,

    // TODO icon
    // TODO sub elements
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Called when component is resized, to force the inner table implementation at same width
   */
  onComponentResized = ({ width }) => {
    const { item, displayed, onItemResized } = this.props
    // handle events only when this item is displayed (to avoid setting width at 0 as item is hidden)
    if (displayed) {
      onItemResized(item.key, width)
    }
  }

  render() {
    const { item, displayed } = this.props
    const { moduleTheme: { user: { navigationItem } } } = this.context
    return (
      <div style={displayed ? navigationItem.displayStyle : navigationItem.hiddenStyle} >
        <Measure onMeasure={this.onComponentResized} >
          <FlatButton
            label={item.label}
            labelStyle={item.selected ? navigationItem.selectedTextStyle : navigationItem.defaultTextStyle}
          />
        </Measure>
      </div >
    )
  }
}
export default MainBarNavigationItem
