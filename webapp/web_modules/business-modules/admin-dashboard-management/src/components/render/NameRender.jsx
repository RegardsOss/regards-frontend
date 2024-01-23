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

import FlatButton from 'material-ui/FlatButton'
import { StringValueRender } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import DisplayIconsComponent from '../DisplayIconsComponent'

/**
  * Table cell render for attribute
  * @author Théo Lasserre
  */
class NameRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([
      AdminShapes.Source,
      AdminShapes.Session,
    ]).isRequired,
    selectedEntityId: PropTypes.string,
    entityType: PropTypes.string,
    onSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static isSelected(entity, selectedEntityId) {
    return entity.content.name === selectedEntityId
  }

  /**
    * On button clicked callback
    */
  onClick = () => {
    const {
      entity, onSelected, entityType,
    } = this.props
    onSelected(entity, entityType)
  }

  render() {
    const {
      entity, selectedEntityId,
    } = this.props
    const {
      moduleTheme: { dashboardStyle: { tableStyle } },

    } = this.context
    return <div style={tableStyle.nameRenderStyle.divStyle}>
      <FlatButton
        onClick={this.onClick}
        style={NameRender.isSelected(entity, selectedEntityId) ? tableStyle.selectOptionStyle.textStyle : null}
      >
        <StringValueRender
          value={entity.content.name}
        />
      </FlatButton>
      <DisplayIconsComponent
        entity={entity}
      />
    </div>
  }
}
export default NameRender
