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
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'
import Delete from 'material-ui/svg-icons/action/delete'
import Code from 'material-ui/svg-icons/action/code'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import List from 'material-ui/svg-icons/action/list'
import Error from 'material-ui/svg-icons/alert/error'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { AceEditorAdapter } from '@regardsoss/adapters'
import AIPDialog from './AIPDialog'

/**
* SIP list
* @author Maxime Bouveron
*/
class SIPListComponent extends React.Component {
  static propTypes = {
    handleGoBack: PropTypes.func,
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
      AIPdialog: false,
      SIPDetails: false,
    }
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

  render() {
    const types = ['DOCUMENT', 'DATAOBJECT', 'COLLECTION', 'DATASET']
    const status = ['Queuing', 'Done', 'Error (rs-ingest)', 'Error (rs-storage)']
    const { intl, moduleTheme: { sip } } = this.context

    return (
      <div>
        <Card>
          <CardTitle
            title={intl.formatMessage({ id: 'microservice-management.sips.title' })}
            subtitle={intl.formatMessage({ id: 'microservice-management.sips.list.subtitle' })}
          />
          <Stepper style={sip.stepperStyle}>
            <Step>
              <StepButton onClick={this.props.handleGoBack}>
                <FormattedMessage id="microservice-management.sips.stepper.session" />
              </StepButton>
            </Step>
            <Step active>
              <StepButton>
                <FormattedMessage id="microservice-management.sips.stepper.list" />
              </StepButton>
            </Step>
          </Stepper>
          <CardText>
            <div style={sip.filter.toolbarStyle}>
              <SelectField
                style={sip.filter.textFieldStyle}
                floatingLabelText={intl.formatMessage({
                  id: 'microservice-management.sips.list.filters.chain.label',
                })}
                value={0}
              >
                <MenuItem
                  value={0}
                  primaryText={intl.formatMessage({
                    id: 'microservice-management.sips.list.filters.chain.label',
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
                  id: 'microservice-management.sips.list.filters.status.label',
                })}
                value={0}
              >
                <MenuItem
                  value={0}
                  primaryText={intl.formatMessage({
                    id: 'microservice-management.sips.list.filters.status.errors',
                  })}
                />
                <MenuItem
                  value={1}
                  primaryText={intl.formatMessage({
                    id: 'microservice-management.sips.list.filters.status.errors.rsingest',
                  })}
                />
                <MenuItem
                  value={2}
                  primaryText={intl.formatMessage({
                    id: 'microservice-management.sips.list.filters.status.errors.rsstorage',
                  })}
                />
                <MenuItem
                  value={3}
                  primaryText={intl.formatMessage({
                    id: 'microservice-management.sips.list.filters.status.done',
                  })}
                />
              </SelectField>
              <DatePicker
                textFieldStyle={sip.filter.textFieldStyle}
                floatingLabelText={intl.formatMessage({
                  id: 'microservice-management.sips.list.filters.date.label',
                })}
                container="inline"
                autoOk
              />
              <Checkbox
                style={sip.filter.checkboxStyle}
                label={intl.formatMessage({
                  id: 'microservice-management.sips.list.filters.my-sips.label',
                })}
                labelPosition="right"
              />
              <RaisedButton
                label={intl.formatMessage({ id: 'microservice-management.sips.button.filter' })}
                primary
              />
            </div>
          </CardText>
          <CardMedia>
            <Table selectable={false}>
              <TableHeader
                enableSelectAll={false}
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>
                    <FormattedMessage id="microservice-management.sips.list.table.headers.sip-id" />
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <FormattedMessage id="microservice-management.sips.list.table.headers.type" />
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <FormattedMessage id="microservice-management.sips.list.table.headers.state" />
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <FormattedMessage id="microservice-management.sips.list.table.headers.date" />
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <FormattedMessage id="microservice-management.sips.list.table.headers.actions" />
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {[...Array(10).keys()].map(item => (
                  <TableRow key={item}>
                    <TableRowColumn>{item}</TableRowColumn>
                    <TableRowColumn>{types[item % types.length]}</TableRowColumn>
                    <TableRowColumn style={sip.session.error.rowColumnStyle}>
                      {status[item % status.length]}
                      <ShowableAtRender show={status[item % status.length].includes('Error')}>
                        <IconButton iconStyle={sip.session.error.iconStyle}>
                          <Error />
                        </IconButton>
                      </ShowableAtRender>
                    </TableRowColumn>
                    <TableRowColumn>{(item * 3) + 1}/10/2017</TableRowColumn>
                    <TableRowColumn>
                      <IconButton
                        title={intl.formatMessage({
                          id: 'microservice-management.sips.list.table.actions.delete',
                        })}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={this.handleSIPDetails}
                        title={intl.formatMessage({
                          id: 'microservice-management.sips.list.table.actions.original-sip',
                        })}
                      >
                        <Code />
                      </IconButton>
                      <IconButton
                        onClick={this.handleAIPDialog}
                        title={intl.formatMessage({
                          id: 'microservice-management.sips.list.table.actions.original-aip',
                        })}
                      >
                        <List />
                      </IconButton>
                      <ShowableAtRender show={status[item % status.length].includes('Error')}>
                        <IconButton
                          title={intl.formatMessage({
                            id: 'microservice-management.sips.list.table.actions.retry',
                          })}
                        >
                          <Refresh />
                        </IconButton>
                      </ShowableAtRender>
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardMedia>
        </Card>
        <AIPDialog open={this.state.AIPdialog} onRequestClose={this.handleAIPDialog} />
        <Dialog
          title={intl.formatMessage({ id: 'microservice-management.sips.list.sip-details.title' })}
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
