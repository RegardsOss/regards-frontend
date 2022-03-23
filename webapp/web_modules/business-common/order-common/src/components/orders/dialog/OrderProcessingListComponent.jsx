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
import map from 'lodash/map'
import {
  Table, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { ScrollArea } from '@regardsoss/adapters'
import { SelectableList, PositionedDialog, Title } from '@regardsoss/components'
import { OrderProcessings } from '../../../model/OrderProcessingsShape'

/**
  * @author Théo Lasserre
  */
class OrderProcessingListComponent extends React.Component {
  static propTypes = {
    orderProcessings: OrderProcessings.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    activeOrderProcessing: this.props.orderProcessings.orderProcessingList[0],
  }

  getTabValue = (orderProcessing) => orderProcessing.datasetId

  setActiveTab = (orderProcessing) => {
    this.setState({
      activeOrderProcessing: orderProcessing,
    })
  }

  renderLeftPane = () => {
    const { orderProcessings } = this.props
    const { orderProcessingList } = orderProcessings
    const { activeOrderProcessing } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: {
        orderProcessingListStyle: {
          scrollAreaStyle, globalTextStyle, leftPaneStyle, selectedDatasetStyle,
          leftPaneTitleStyle,
        },
      },
    } = this.context
    return (
      <div style={leftPaneStyle}>
        <Title
          label={formatMessage({ id: 'order.list.option.cell.show.processing.dialog.dataset.title' })}
          level={3}
          style={leftPaneTitleStyle}
        />
        <ScrollArea
          vertical
          style={scrollAreaStyle}
        >
          <SelectableList
            defaultValue={this.getTabValue(activeOrderProcessing)}
            onSelect={this.setActiveTab}
          >
            {map(orderProcessingList, (orderProcessing) => (
              <ListItem
                key={this.getTabValue(orderProcessing)}
                value={orderProcessing}
                title={`${orderProcessing.datasetLabel}`}
                primaryText={<div style={globalTextStyle}>{orderProcessing.datasetLabel}</div>}
                style={this.getTabValue(orderProcessing) === this.getTabValue(activeOrderProcessing) ? selectedDatasetStyle : null}
              />
            ))}
          </SelectableList>
        </ScrollArea>
      </div>
    )
  }

  renderRightPane = () => {
    const { activeOrderProcessing } = this.state
    const {
      moduleTheme: {
        orderProcessingListStyle: {
          rightPaneStyle, rightPaneTitleStyle, scrollAreaStyle, globalTextStyle,
        },
      },
    } = this.context
    return (
      <div style={rightPaneStyle}>
        <Title
          title={`${activeOrderProcessing.processingLabel}`}
          label={activeOrderProcessing.processingLabel}
          style={rightPaneTitleStyle}
          level={3}
        />
        <ScrollArea
          vertical
          style={scrollAreaStyle}
        >
          <Table>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
            >
              {
                  map(activeOrderProcessing.processingParameterList, (parameter) => (
                    <TableRow key={parameter.name}>
                      <TableRowColumn><div title={`${parameter.name}`} style={globalTextStyle}>{`${parameter.name}`}</div></TableRowColumn>
                      <TableRowColumn><div title={`${parameter.value}`} style={globalTextStyle}>{`${parameter.value}`}</div></TableRowColumn>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    )
  }

  renderDialogContent = () => {
    const { moduleTheme: { orderProcessingListStyle: { dialogContentStyle, middleBarStyle } } } = this.context
    return (
      <div style={dialogContentStyle}>
        {this.renderLeftPane()}
        <div style={middleBarStyle} />
        {this.renderRightPane()}
      </div>
    )
  }

  render() {
    const { orderProcessings, onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <PositionedDialog
        dialogWidthPercent={70}
        maxHeight={666}
        dialogHeightPercent={70}
        title={formatMessage({ id: 'order.list.option.cell.show.processing.dialog.title' }, { orderName: orderProcessings.orderLabel })}
        actions={<>
          <FlatButton
            key="close"
            label={formatMessage({ id: 'order.list.option.cell.show.processing.dialog.button.close' })}
            primary
            onClick={onClose}
          />
        </>}
        modal
        open={!!orderProcessings}
      >
        {this.renderDialogContent()}
      </PositionedDialog>
    )
  }
}
export default OrderProcessingListComponent
