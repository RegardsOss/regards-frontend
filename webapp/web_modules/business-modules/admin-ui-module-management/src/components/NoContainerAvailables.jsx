/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'

/**
 * React component to display an information message thaht no layout containers are available for modules configuration.
 * @author Sébastien Binda
 */
class NoContainerAvailables extends React.PureComponent {
  static propTypes = {
    goToLayoutConfiguration: PropTypes.func.isRequired,
  }

  static buttonStyle = {
    marginTop: 20,
  }

  static cardStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  render() {
    const { intl: { formatMessage } } = this.context

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'module.no.container.available.title' })}
        />
        <CardText
          style={NoContainerAvailables.cardStyle}
        >
          {formatMessage({ id: 'module.no.container.available' })}
          <RaisedButton
            label={formatMessage({ id: 'module.no.container.available.configure.layout' })}
            primary
            onClick={this.props.goToLayoutConfiguration}
            style={NoContainerAvailables.buttonStyle}
          />
        </CardText>
      </Card>
    )
  }
}

export default NoContainerAvailables
