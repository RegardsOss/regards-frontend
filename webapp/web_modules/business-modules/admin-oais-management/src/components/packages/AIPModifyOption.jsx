/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { ResourceIconAction } from '@regardsoss/components'
import ModeEdit from 'mdi-material-ui/Pencil'
import dependencies from '../../dependencies'

/**
* Detail option cell for the infinite table used to display the contents of an aip
 * @author Simon MILHAU
*/
class AIPModifyOption extends React.Component {
  static propTypes = {
    entity: IngestShapes.AIPEntity,
    onModify: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    const { entity, onModify } = this.props
    onModify(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props
    return (
      <div>
        <ResourceIconAction
          displayLogic={someMatchHateoasDisplayLogic}
          resourceDependencies={dependencies.updateDependency}
          onClick={this.onClick}
          title={formatMessage({ id: 'oais.packages.tooltip.modify' })}
          disabled={entity.content.state === 'DELETED'}
        >
          <ModeEdit />
        </ResourceIconAction>
      </div>
    )
  }
}
export default AIPModifyOption
