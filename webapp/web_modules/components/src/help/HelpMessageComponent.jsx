/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Info from 'mdi-material-ui/LightbulbOutline'

export default class HelpMessageComponent extends React.Component {
  static propTypes = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  }

  static styleContainer = { display: 'flex', alignItems: 'center' }

  static styleIcon = { width: '24px', height: '24px', marginRight: '10px' }

  render() {
    return (
      <span style={HelpMessageComponent.styleContainer}>
        <Info style={HelpMessageComponent.styleIcon} />
        {this.props.message}
      </span>)
  }
}
