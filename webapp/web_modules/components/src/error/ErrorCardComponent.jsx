/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Icon from 'material-ui/svg-icons/content/report'

class ErrorCardComponent extends React.Component {
  static propTypes = {
    message: PropTypes.node,
  }

  static defaultProps = {
    message: <span>Oops! Error occured when retrieving the content.</span>,
  }

  render() {
    const cardStyle = { padding: 5 }
    const iconStyle = {
      color: 'Red',
      width: 30,
      height: 30,
      marginRight: 20,
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card style={cardStyle}>
          <CardText >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon
                style={iconStyle}
              />
              {this.props.message}
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default ErrorCardComponent
