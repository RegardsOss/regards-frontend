/**
 * LICENSE_PLACEHOLDER
 **/
import { DropTarget } from 'react-dnd'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'

export class ContainerCard extends React.Component {

  static propTypes = {
    title: React.PropTypes.element.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    acceptAttrType: React.PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    children: React.PropTypes.any,
    // eslint-disable-next-line react/no-unused-prop-types
    onChange: React.PropTypes.func.isRequired,
    // from DropTarget
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }


  render() {
    const { title, children, canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    const style = this.context.muiTheme.layout.cardEspaced
    const styles = {}
    if (isActive) {
      styles.backgroundColor = 'lightgreen'
      styles.border = '1px dashed gray'
    } else {
      styles.border = '1px solid gray'
    }
    return connectDropTarget(
      <div>
        <Card style={{ ...style, ...styles }}>
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
