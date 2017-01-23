/**
 * LICENSE_PLACEHOLDER
 **/
import { DragSource } from 'react-dnd'
import Paper from 'material-ui/Paper'
import { themeContextType } from '@regardsoss/theme'


class CardDragContainer extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: React.PropTypes.any,
    children: React.PropTypes.element.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    draggableToContainerType: React.PropTypes.string.isRequired,
    shadow: React.PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    isFragment: React.PropTypes.bool,
    // From DragSource
    isDragging: React.PropTypes.bool,
    connectDragSource: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { connectDragSource, isDragging, shadow, value, children } = this.props
    const style = this.context.muiTheme.layout.cardEspaced

    return connectDragSource(
      <div>
        <Paper
          style={{
            ...style,
            marginBottom: 2,
            paddingLeft: 5,
            opacity: isDragging ? 0.2 : 1,
          }}
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

export default DragSource(props => props.draggableToContainerType, CardSource, collect)(CardDragContainer)
