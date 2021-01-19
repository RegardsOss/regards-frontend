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
import { Card, CardText } from 'material-ui/Card'
import Icon from 'mdi-material-ui/AlertOctagon'

class ErrorCardComponent extends React.Component {
  static propTypes = {
    message: PropTypes.node,
  }

  static defaultProps = {
    message: <span>Oops! Error occured when retrieving the content.</span>,
  }

  static ROOT_STYLE = {
    display: 'flex',
    justifyContent: 'center',
  }

  static CARD_STYLE = {
    padding: 5,
  }

  static TEXT_LAYOUT_STYLE = {
    display: 'flex',
    alignItems: 'center',
  }

  static ICON_STYLE = {
    color: 'Red',
    width: 30,
    height: 30,
    marginRight: 20,
  }

  render() {
    return (
      <div style={ErrorCardComponent.ROOT_STYLE}>
        <Card style={ErrorCardComponent.CARD_STYLE}>
          <CardText>
            <div
              style={ErrorCardComponent.TEXT_LAYOUT_STYLE}
            >
              <Icon style={ErrorCardComponent.ICON_STYLE} />
              {this.props.message}
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default ErrorCardComponent
