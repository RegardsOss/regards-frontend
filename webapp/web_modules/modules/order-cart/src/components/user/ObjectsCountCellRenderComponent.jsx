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
import { themeContextType } from '@regardsoss/theme'
import DuplicatedObjectsMessageComponents from './options/DuplicatedObjectsMessageComponents'

/**
 * Renders the objects cell in basket tree table. Nota: it adds the explanation message option when
 * effective objects count is different of total objects count
 * @author Raphaël Mechali
 */
class ObjectsCountCellRenderComponent extends React.Component {
  static propTypes = {
    effectiveObjectsCount: PropTypes.number.isRequired,
    totalObjectsCount: PropTypes.number.isRequired,
    onShowDuplicatedMessage: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { effectiveObjectsCount, totalObjectsCount, onShowDuplicatedMessage } = this.props
    const { objectsCountRender } = this.context.moduleTheme.user.content.table
    return (
      <div style={objectsCountRender.style}>
        <div style={objectsCountRender.numberTextStyle}>
          { /* 1 - Show count */
            effectiveObjectsCount
          }
        </div>
        {/* 2 - Show option explanation message */}
        <DuplicatedObjectsMessageComponents
          totalObjectsCount={totalObjectsCount}
          effectiveObjectsCount={effectiveObjectsCount}
          onShowDuplicatedMessage={onShowDuplicatedMessage}
        />
      </div>
    )
  }
}
export default ObjectsCountCellRenderComponent
