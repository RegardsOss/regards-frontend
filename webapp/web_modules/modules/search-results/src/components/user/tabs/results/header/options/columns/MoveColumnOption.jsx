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
import noop from 'lodash/noop'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import MoveIcon from 'mdi-material-ui/Redo'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton, TableColumnBuilder } from '@regardsoss/components'

/** wraps an icon button with its icon, to be used as drop down menu */
const IconButtonNoChild = (props) => (
  <IconButton {...props}>
    <MoveIcon />
  </IconButton>)

/**
 * Option to move a column within columns list
 * @author Raphaël Mechali
 */
class MoveColumnOption extends React.Component {
  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    entity: PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel]).isRequired,
    models: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel]).isRequired).isRequired,
    onMove: PropTypes.func.isRequired, // on move callback (oldIndex: number, newIndex: number) => ()
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On position selected callback: propagate event to parent controller
   * @param {number} index new position index
   */
  onMove = (index) => {
    const { rowIndex, onMove } = this.props
    onMove(rowIndex, index)
  }

  /**
   * @return {[React.Element]} list of rendered available options
   */
  getAvailableMoveOptions = () => {
    const { entity, models, rowIndex } = this.props
    const { intl: { locale, formatMessage } } = this.context
    // disable for options column
    if (entity.key === TableColumnBuilder.optionsColumnKey) {
      return []
    }

    return models.reduce((acc, model, index) => {
      // forbidden options: After table column options (which is inserted at end by default)
      if (model.key !== TableColumnBuilder.optionsColumnKey) {
        // 1 - compute label
        let label
        if (index === 0) {
          label = formatMessage({ id: 'search.results.configure.columns.move.column.at.first.position' })
        } else {
          const previousColum = models[index <= rowIndex ? index - 1 : index]
          let columnLabel
          switch (previousColum.key) {
            case TableColumnBuilder.selectionColumnKey:
              columnLabel = formatMessage({ id: 'results.selection.column.label' })
              break
            case TableColumnBuilder.optionsColumnKey:
              columnLabel = formatMessage({ id: 'results.options.column.label' })
              break
            default: // an attribute presentation model
              columnLabel = previousColum.label[locale]
          }
          label = formatMessage({ id: 'search.results.configure.columns.move.column.after' }, { columnLabel })
        }

        // 2 - add menu item in options list
        return [
          ...acc,
          <MenuItem
            key={model.key}
            primaryText={label}
            value={index} // final index in list
            disabled={rowIndex === index}

          />,
        ]
      }
      return acc
    }, [])
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const options = this.getAvailableMoveOptions()
    return (
      <DropDownButton
        ButtonConstructor={IconButtonNoChild}
        getLabel={noop}
        title={formatMessage({ id: 'search.results.configure.columns.move.tooltip' })}
        disabled={options.length <= 1}
        onChange={this.onMove}
        value={null}
      >
        {
          options
        }

      </DropDownButton>
    )
  }
}
export default MoveColumnOption
