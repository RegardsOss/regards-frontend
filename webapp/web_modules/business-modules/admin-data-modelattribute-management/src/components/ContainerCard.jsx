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
    const {
      title, children, canDrop, isOver, connectDropTarget,
    } = this.props
    const isActive = canDrop && isOver
    const style = moduleStyles(this.context.muiTheme)
    const styles = {}
    if (isActive) {
      styles.backgroundColor = 'lightgreen'
      styles.border = '1px dashed gray'
    } else {
      styles.border = '1px solid gray'
    }
    const allStyles = { ...style.cardEspaced, ...style.cardFullHeight, ...styles }
    return connectDropTarget(
      <div style={style.cardFullHeight}>
        <Card style={allStyles}>
          <CardTitle title={title} />
          <CardText>
            {children}
          </CardText>
        </Card>
      </div>)
  }
}

const cardTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    props.onChange(item.draggableToContainerType, item.isFragment, item.entityDragged)
  },
}

export default DropTarget((props) => props.acceptAttrType, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(ContainerCard)
