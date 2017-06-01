/**
 * LICENSE_PLACEHOLDER
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
    const { connectDragSource, isDragging, shadow, value, children } = this.props
    const style = moduleStyles(this.context.theme).cardEspaced
    const overrideStyles = {
      ...style,
      marginBottom: 2,
      paddingLeft: 5,
      opacity: isDragging ? 0.2 : 1,
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

export default DragSource(props => props.draggableToContainerType, CardSource, collect)(DraggableCard)
