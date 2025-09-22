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
import isDate from 'lodash/isDate'
import get from 'lodash/get'
import Schedule from 'mdi-material-ui/ClockOutline'
import Clear from 'mdi-material-ui/Backspace'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import { PositionedDialog, DatePickerField } from '@regardsoss/components'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DamDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'

/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class DataSourceMonitoringScheduleAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataManagementShapes.CrawlerDatasourceContent.isRequired,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    onSchedule: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isScheduleDateDialogOpen: false,
    scheduleDateValue: null,
  }

  onChangeScheduleDateValue = (newScheduleDateValue) => {
    this.setState({
      scheduleDateValue: newScheduleDateValue,
    })
  }

  onClearInput = () => {
    this.setState({
      scheduleDateValue: null,
    })
  }

  isSchedulable = () => {
    const { content } = this.props.entity
    return content.status !== DamDomain.DataSourcesStatusEnum.STARTED || content.status !== DamDomain.DataSourcesStatusEnum.NEW
  }

  onClick = () => {
    const { onSchedule, entity } = this.props
    const crawlerDatasource = entity.content
    const lastEntityDate = get(crawlerDatasource, 'cursor.lastEntityDate')
    if (!lastEntityDate) {
      onSchedule(crawlerDatasource.id)
    } else {
      this.toggleScheduleDateDialog()
    }
  }

  renderScheduleDateDialog = () => {
    const { onSchedule, entity } = this.props
    const { intl: { formatMessage, locale }, moduleTheme: { dataSourceScheduleAction: { dialogMessage, datePicker } } } = this.context
    const { isScheduleDateDialogOpen, scheduleDateValue } = this.state
    const crawlerDatasource = entity.content
    const lastEntityDate = get(crawlerDatasource, 'cursor.lastEntityDate')
    const newScheduleDate = isDate(scheduleDateValue) ? scheduleDateValue.toISOString() : lastEntityDate
    return (
      <PositionedDialog
        dialogWidthPercent={50}
        dialogHeightPercent={5}
        maxHeight={250}
        title={formatMessage({ id: 'crawler.list.scheduled.dialog.title' })}
        open={isScheduleDateDialogOpen}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'crawler.list.scheduled.dialog.button.close' })}
            onClick={this.toggleScheduleDateDialog}
          />
          <RaisedButton
            key="continue"
            label={formatMessage({ id: 'crawler.list.scheduled.dialog.button.continue' })}
            primary
            onClick={() => onSchedule(crawlerDatasource.id, newScheduleDate).then(() => {
              this.toggleScheduleDateDialog()
            })}
          />
        </>}
      >
        <div>
          <div style={dialogMessage}>
            {formatMessage({ id: 'crawler.list.scheduled.dialog.message' })}
          </div>
          <div style={datePicker}>
            <DatePickerField
              id="scheduleDate"
              dateHintText={formatMessage({ id: 'crawler.list.scheduled.dialog.date' })}
              onChange={(value) => this.onChangeScheduleDateValue(value)}
              value={scheduleDateValue}
              locale={locale}
              fullWidth
              displayTime
              timeHintText={formatMessage({ id: 'crawler.list.scheduled.dialog.time' })}
            />
            <IconButton
              tooltip={formatMessage({ id: 'form.datetimepicker.clear' })}
            >
              <Clear onClick={this.onClearInput} />
            </IconButton>
          </div>
        </div>
      </PositionedDialog>
    )
  }

  toggleScheduleDateDialog = () => {
    const { isScheduleDateDialogOpen, scheduleDateValue } = this.state
    let newScheduleDateValue = scheduleDateValue
    // set up default date picker value with last entity aspiration date if available
    if (!isScheduleDateDialogOpen) {
      const { entity } = this.props
      const crawlerDatasource = entity.content
      const lastEntityDate = get(crawlerDatasource, 'cursor.lastEntityDate')
      if (lastEntityDate) {
        newScheduleDateValue = new Date(lastEntityDate)
      }
    }
    this.setState({
      isScheduleDateDialogOpen: !isScheduleDateDialogOpen,
      scheduleDateValue: newScheduleDateValue,
    })
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { iconStyle, buttonStyle } } = this.context
    return [
      <IconButton
        key="schedule-button"
        title={formatMessage({ id: 'crawler.list.schedule.action' })}
        iconStyle={iconStyle}
        style={buttonStyle}
        onClick={this.onClick}
        disabled={!this.isSchedulable()}
      >
        <Schedule />
      </IconButton>,
      this.renderScheduleDateDialog(),
    ]
  }
}
export default DataSourceMonitoringScheduleAction
