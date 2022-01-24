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
import FlatButton from 'material-ui/FlatButton'
import { OrderShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PositionedDialog } from '@regardsoss/components'
import SelectionDetailResultsTableContainer from '../../../containers/user/detail/SelectionDetailResultsTableContainer'

/**
* Shows selected item detail
* @author Raphaël Mechali
*/
class SelectionItemDetailComponent extends React.Component {
  static propTypes = {
    showDatasets: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    datasetLabel: PropTypes.string,
    date: PropTypes.string,
    selectionRequest: OrderShapes.BasketSelelectionRequest,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Formatting options for selection date */
  static SELECTION_DATE_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  /** Expand all styles (used to measure available table height) */
  static EXPAND_ALL_STYLES = { flexGrow: 1, flexShrink: 1, overflowY: 'hidden' }

  render() {
    const {
      showDatasets, visible, date, datasetLabel, selectionRequest, onClose,
    } = this.props
    const { intl: { formatDate, formatMessage } } = this.context
    const { moduleTheme: { user: { content: { detail } } } } = this.context

    // prepare title acording with configuration
    const dateLabel = date ? formatDate(new Date(Date.parse(date)), SelectionItemDetailComponent.SELECTION_DATE_OPTIONS) : null
    const title = formatMessage({
      id: showDatasets
        ? 'order-cart.module.basket.items.group.selection.detail.title.with.dataset'
        : 'order-cart.module.basket.items.group.selection.detail.title.without.dataset',
    }, { dataset: datasetLabel, date: dateLabel })

    return (
      <PositionedDialog
        title={title}
        dialogWidthPercent={detail.widthPercent}
        dialogHeightPercent={detail.heightPercent}
        bodyStyle={detail.dialogBodyStyle}
        onRequestClose={onClose}
        actions={<FlatButton
          key="close.button"
          label={this.context.intl.formatMessage({ id: 'order-cart.module.basket.items.group.selection.detail.close' })}
          onClick={onClose}
        />}
        open={visible}
      >
        <SelectionDetailResultsTableContainer selectionRequest={selectionRequest} />
      </PositionedDialog>
    )
  }
}
export default SelectionItemDetailComponent
