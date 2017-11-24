/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { Card, CardTitle, CardMedia, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import Checkbox from 'material-ui/Checkbox'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'
import Delete from 'material-ui/svg-icons/action/delete'
import Code from 'material-ui/svg-icons/action/code'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import List from 'material-ui/svg-icons/action/list'
import {
  ShowableAtRender,
  TableColumnBuilder,
  DateValueRender,
  TableLayout,
  PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { AceEditorAdapter } from '@regardsoss/adapters'
import AIPDialog from './AIPDialog'
import { sipActions, sipSelectors } from '../clients/SIPClient'

/**
 * SIP list
 * @author Maxime Bouveron
 */
class SIPListComponent extends React.Component {
  static propTypes = {
    handleGoBack: PropTypes.func,
    getParams: PropTypes.func,
    handleFilters: PropTypes.func,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      filters: {},
      AIPdialog: false,
      SIPDetails: false,
    }
  }

  handleFilter = (filter, value) => {
    const filters = this.state.filters
    filters[filter] = value
    this.setState({
      filters,
    })
  }

  handleAIPDialog = () => {
    this.setState({
      AIPdialog: !this.state.AIPdialog,
    })
  }

  handleSIPDetails = () => {
    this.setState({
      SIPdetails: !this.state.SIPdetails,
    })
  }

  renderTable = () => {
    const { intl, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    const columns = [
      // id column
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.sipId',
        intl.formatMessage({ id: 'sips.list.table.headers.sip-id' }),
        'content.sipId',
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.type',
        intl.formatMessage({ id: 'sips.list.table.headers.type' }),
        'content.sip.type',
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.state',
        intl.formatMessage({ id: 'sips.list.table.headers.state' }),
        'content.state',
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.date',
        intl.formatMessage({ id: 'sips.list.table.headers.date' }),
        'content.ingestDate',
        undefined,
        undefined,
        DateValueRender,
      ),
      TableColumnBuilder.buildOptionsColumn(
        '',
        [
          {
            OptionConstructor: () => (
              <IconButton
                title={intl.formatMessage({
                  id: 'sips.list.table.actions.delete',
                })}
              >
                <Delete />
              </IconButton>
            ),
            optionProps: {},
          },
          {
            OptionConstructor: props => (
              <IconButton
                onClick={this.handleSIPDetails}
                title={intl.formatMessage({
                  id: 'sips.list.table.actions.original-sip',
                })}
              >
                <Code />
              </IconButton>
            ),
            optionProps: {},
          },
          {
            OptionConstructor: props => (
              <IconButton
                onClick={this.handleAIPDialog}
                title={intl.formatMessage({
                  id: 'sips.list.table.actions.original-aip',
                })}
              >
                <List />
              </IconButton>
            ),
            optionProps: {},
          },
          {
            OptionConstructor: props => (
              <ShowableAtRender show={props.entity.content.state.includes('Error')}>
                <IconButton
                  title={intl.formatMessage({
                    id: 'sips.list.table.actions.retry',
                  })}
                >
                  <Refresh />
                </IconButton>
              </ShowableAtRender>
            ),
            optionProps: {},
          },
        ],
        true,
        fixedColumnWidth,
      ),
    ]

    return (
      <TableLayout>
        <PageableInfiniteTableContainer
          name="sip-management-session-table"
          pageActions={sipActions}
          pageSelectors={sipSelectors}
          pageSize={10}
          columns={columns}
          requestParams={this.props.getParams()}
        />
      </TableLayout>
    )
  }

  render() {
    const { intl, moduleTheme: { sip } } = this.context

    return (
      <div>
        <Card>
          <CardTitle
            title={intl.formatMessage({ id: 'sips.title' })}
            subtitle={intl.formatMessage({ id: 'sips.list.subtitle' })}
          />
          <Stepper style={sip.stepperStyle}>
            <Step>
              <StepButton onClick={this.props.handleGoBack}>
                <FormattedMessage id="sips.stepper.session" />
              </StepButton>
            </Step>
            <Step active>
              <StepButton>
                <FormattedMessage id="sips.stepper.list" />
              </StepButton>
            </Step>
          </Stepper>
          <CardText>
            <div style={sip.filter.toolbarStyle}>
              <SelectField
                style={sip.filter.textFieldStyle}
                floatingLabelText={intl.formatMessage({
                  id: 'sips.list.filters.chain.label',
                })}
                value={0}
              >
                <MenuItem
                  value={0}
                  primaryText={intl.formatMessage({
                    id: 'sips.list.filters.chain.label',
                  })}
                />
                <MenuItem value={1} primaryText="Chaine 1" />
                <MenuItem value={2} primaryText="Chaine 2" />
                <MenuItem value={3} primaryText="Chaine 3" />
                <MenuItem value={4} primaryText="Chaine 4" />
              </SelectField>
              <SelectField
                style={sip.filter.textFieldStyle}
                floatingLabelText={intl.formatMessage({
                  id: 'sips.list.filters.status.label',
                })}
                value={0}
              >
                <MenuItem
                  value={0}
                  primaryText={intl.formatMessage({
                    id: 'sips.list.filters.status.errors',
                  })}
                />
                <MenuItem
                  value={1}
                  primaryText={intl.formatMessage({
                    id: 'sips.list.filters.status.errors.rsingest',
                  })}
                />
                <MenuItem
                  value={2}
                  primaryText={intl.formatMessage({
                    id: 'sips.list.filters.status.errors.rsstorage',
                  })}
                />
                <MenuItem
                  value={3}
                  primaryText={intl.formatMessage({
                    id: 'sips.list.filters.status.done',
                  })}
                />
              </SelectField>
              <DatePicker
                textFieldStyle={sip.filter.textFieldStyle}
                floatingLabelText={intl.formatMessage({
                  id: 'sips.list.filters.date.label',
                })}
                onChange={(nothing, date) => {
                  this.handleFilter('from', date.toISOString())
                }}
                container="inline"
                autoOk
              />
              <Checkbox
                style={sip.filter.checkboxStyle}
                label={intl.formatMessage({
                  id: 'sips.list.filters.my-sips.label',
                })}
                labelPosition="right"
              />
              <RaisedButton
                label={intl.formatMessage({ id: 'sips.button.filter' })}
                onClick={() => this.props.handleFilters(this.state.filters)}
                primary
              />
            </div>
          </CardText>
          <CardMedia>{this.renderTable()}</CardMedia>
        </Card>
        <AIPDialog open={this.state.AIPdialog} onRequestClose={this.handleAIPDialog} />
        <Dialog
          title={intl.formatMessage({ id: 'sips.list.sip-details.title' })}
          modal={false}
          open={this.state.SIPdetails}
          onRequestClose={this.handleSIPDetails}
        >
          <AceEditorAdapter
            mode="json"
            theme="monokai"
            value={'{ lol: "truc" }'}
            showPrintMargin={false}
            style={sip.list.sipDetailsStyle}
            showGutter
            showLineNumbers
            readOnly
            highlightActiveLine
          />
        </Dialog>
      </div>
    )
  }
}
export default SIPListComponent
