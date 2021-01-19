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
import { BoardComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import microserviceBoardItems from './MicroserviceBoardItems'

/**
 * React component displaying the configurable microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
class MicroserviceBoardComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    microservices: PropTypes.arrayOf(PropTypes.string).isRequired,
    isMicroserviceActive: PropTypes.func.isRequired,
    isMicroserviceBackupable: PropTypes.func.isRequired,
    toggleMaintenance: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const items = microserviceBoardItems(
      this.props.project,
      this.props.microservices,
      this.props.isMicroserviceActive,
      this.props.isMicroserviceBackupable,
      this.props.toggleMaintenance,
      this.context.intl,
      this.context.muiTheme,
    )
    return (
      <BoardComponent items={items} />
    )
  }
}

export default MicroserviceBoardComponent
