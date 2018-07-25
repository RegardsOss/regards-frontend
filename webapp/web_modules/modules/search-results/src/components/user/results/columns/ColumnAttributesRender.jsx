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
import { DamDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TableColumnBuilder } from '@regardsoss/components'
import { ColumnPresentationModel } from '../../../../models/table/TableColumnModel'

/**
 * Renders column attributes
 * @author Raphaël Mechali
 */
class ColumnAttributesRender extends React.Component {
  static propTypes = {
    entity: ColumnPresentationModel.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity: { key, visible, attributes } } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { columnsDialog } } } = this.context
    // 1 - build attributes label
    const attributesLabel =
      key === TableColumnBuilder.selectionColumnKey || key === TableColumnBuilder.optionsColumnKey ?
        // 1.a That model is not related with attributes (options / selection columns): show NA label
        formatMessage({ id: 'search.results.configure.columns.attribute.not.available' }) :
        // 1.b There is a list: format each attribute and join on separator
        attributes.map(attribute => DamDomain.AttributeModelController.getAttributeModelFullLabel(attribute))
          .join(formatMessage({ id: 'search.results.configure.columns.attribute.label.separator' }))

    return (
      <div
        style={visible ? columnsDialog.visibleColumnCell : columnsDialog.hiddenColumnCell}
        title={attributesLabel}
      >
        {
          attributesLabel
        }
      </div>
    )
  }
}
export default ColumnAttributesRender
