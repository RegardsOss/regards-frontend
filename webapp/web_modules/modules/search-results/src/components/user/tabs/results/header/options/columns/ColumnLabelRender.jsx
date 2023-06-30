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
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TableColumnBuilder } from '@regardsoss/components'

/**
 * Renders column label
 * @author Raphaël Mechali
 */
class ColumnLabelRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel]).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity: { key, visible, label } } = this.props
    const { intl: { locale, formatMessage }, moduleTheme: { user: { columnsDialog } } } = this.context
    let labelText
    switch (key) {
      case TableColumnBuilder.selectionColumnKey:
        labelText = formatMessage({ id: 'results.selection.column.label' })
        break
      case TableColumnBuilder.optionsColumnKey:
        labelText = formatMessage({ id: 'results.options.column.label' })
        break
      default:
        // an attribute presentation model: show configured label for locale
        labelText = label[locale]
    }
    return (
      <div
        style={visible ? columnsDialog.visibleColumnCell : columnsDialog.hiddenColumnCell}
        title={labelText}
      >
        {
          labelText
        }
      </div>
    )
  }
}
export default ColumnLabelRender
