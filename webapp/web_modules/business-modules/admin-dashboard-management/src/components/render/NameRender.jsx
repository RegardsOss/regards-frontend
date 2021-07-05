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

import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import FlatButton from 'material-ui/FlatButton'
import { StringValueRender } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { COMPONENT_TYPE, COMPONENT_TYPE_ENUM } from '../../domain/componentTypes'
import DisplayIconsComponent from '../DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../../domain/displayIconTypes'

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
    selectedEntity: PropTypes.oneOfType([
      AdminShapes.Source,
      AdminShapes.Session,
    ]),
    componentType: PropTypes.oneOf(COMPONENT_TYPE),
    onSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
    * On button clicked callback
    */
  onClick = () => {
    const { entity, onSelected, componentType } = this.props
    onSelected(entity, componentType)
  }

  isSelected = () => {
    const { entity, selectedEntity, componentType } = this.props
    let isSelected = false
    switch (componentType) {
      case COMPONENT_TYPE_ENUM.SESSION:
        isSelected = isEqual(entity.content.id, get(selectedEntity, 'content.id'))
        break
      case COMPONENT_TYPE_ENUM.SOURCE:
        isSelected = isEqual(entity.content.name, get(selectedEntity, 'content.name'))
        break
      default:
    }
    return isSelected
  }

  render() {
    const {
      entity,
    } = this.props
    const {
      moduleTheme: { dashboardStyle: { tableStyle } },

    } = this.context
    return <div style={tableStyle.nameRenderStyle.divStyle}>
      <FlatButton
        onClick={this.onClick}
        style={this.isSelected() ? tableStyle.selectOptionStyle.textStyle : null}
      >
        <StringValueRender
          value={entity.content.name}
        />
      </FlatButton>
      <DisplayIconsComponent
        entity={entity}
        displayIconType={DISPLAY_ICON_TYPE_ENUM.COUNT}
      />
    </div>
  }
}
export default NameRender
