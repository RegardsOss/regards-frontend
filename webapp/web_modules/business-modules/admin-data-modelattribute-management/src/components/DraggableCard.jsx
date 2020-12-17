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
import { DragSource } from 'react-dnd'
import Paper from 'material-ui/Paper'
import { themeContextType } from '@regardsoss/theme'
import moduleStyles from '../styles/styles'

export class DraggableCard extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
    children: PropTypes.element.isRequired,
    shadow: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types
    draggableToContainerType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    isFragment: PropTypes.bool,
    // From DragSource
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      connectDragSource, isDragging, shadow, value, children,
    } = this.props
    const style = moduleStyles(this.context.theme).cardEspaced
    const overrideStyles = {
      ...style,
      marginBottom: 2,
      paddingLeft: 5,
      opacity: isDragging ? 0.2 : 1,
      cursor: 'move',
    }

    return connectDragSource(
      <div>
        <Paper
          style={overrideStyles}
          id={value.id}
          key={value.id}
          zDepth={shadow}
        >
          {children}
        </Paper>
      </div>,
    )
  }
}

/**
 * Define behaviour of items dragged
 * @type {{beginDrag: ((props)), endDrag: ((props, monitor))}}
 */
const CardSource = {
  /**
   * Attach to the drag action the content of the card.
   * The container will be able to retrieve these infos
   * @param props
   * @returns {}
   */
  beginDrag(props) {
    return {
      entityDragged: props.value,
      isFragment: props.isFragment,
      draggableToContainerType: props.draggableToContainerType,
    }
  },
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export default DragSource((props) => props.draggableToContainerType, CardSource, collect)(DraggableCard)
