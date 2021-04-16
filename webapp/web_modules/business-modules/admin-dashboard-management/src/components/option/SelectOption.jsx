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
 import IconButton from 'material-ui/IconButton'
 **/
import isEqual from 'lodash/isEqual'
import FlatButton from 'material-ui/FlatButton'
import NotSelectedIcon from 'mdi-material-ui/CheckboxBlankCircleOutline'
import SelectedIcon from 'mdi-material-ui/CheckboxBlankCircle'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CELL_TYPE, CELL_TYPE_ENUM } from '../../domain/cellTypes'

/**
  * Table option to select a source or a session
  * @author Théo Lasserre
  */
class SelectOption extends React.Component {
   static propTypes = {
     entity: PropTypes.oneOfType([
       AdminShapes.Source,
       AdminShapes.Session,
     ]).isRequired,
     selectedEntity: PropTypes.oneOfType([
       AdminShapes.Source,
       AdminShapes.Session,
     ]),
     cellType: PropTypes.oneOf(CELL_TYPE),
     onEntitySelected: PropTypes.func.isRequired,
   }

   static contextTypes = {
     ...i18nContextType,
     ...themeContextType,
   }

   /**
    * On button clicked callback
    */
   onClick = () => {
     const { entity, onEntitySelected } = this.props
     onEntitySelected(entity)
   }

   render() {
     const { entity, selectedEntity, cellType } = this.props
     const { intl: { formatMessage }, moduleTheme: { dashboardStyle: { tableStyle: { selectOptionStyle } } } } = this.context
     return (
       <FlatButton
         label={cellType === CELL_TYPE_ENUM.SOURCE
           ? formatMessage({ id: 'dashboard.sources.table.option.select' })
           : formatMessage({ id: 'dashboard.sessions.table.option.select' })}
         onClick={this.onClick}
         style={selectOptionStyle.buttonStyle}
       >
         <SelectedIcon style={isEqual(entity, selectedEntity) ? selectOptionStyle.iconStyle : null} />
       </FlatButton>
     )
   }
}

export default SelectOption
