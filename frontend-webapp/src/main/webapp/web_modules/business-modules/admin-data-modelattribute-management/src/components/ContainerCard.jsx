/**
 * LICENSE_PLACEHOLDER
 **/
import { DropTarget } from 'react-dnd'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import moduleStyles from '../styles/styles'

export class ContainerCard extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    acceptAttrType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any,
    // eslint-disable-next-line react/no-unused-prop-types
    onChange: PropTypes.func.isRequired,
    // from DropTarget
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { title, children, canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    const style = moduleStyles(this.context.muiTheme).cardEspaced
    const styles = {}
    if (isActive) {
      styles.backgroundColor = 'lightgreen'
      styles.border = '1px dashed gray'
    } else {
      styles.border = '1px solid gray'
    }
    const allStyles = { ...style, ...styles }
    return connectDropTarget(
      <div>
        <Card style={allStyles}>
          <CardTitle title={title} />
          <CardText>
            {children}
          </CardText>
        </Card>
      </div>,
    )
  }
}

const cardTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    props.onChange(item.draggableToContainerType, item.isFragment, item.entityDragged)
  },
}

export default DropTarget(props => props.acceptAttrType, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(ContainerCard)
