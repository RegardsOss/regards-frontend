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
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Error from 'material-ui/svg-icons/alert/error'
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'

/**
* SIP list test
* @author Maxime Bouveron
*/
class SIPSessionComponent extends React.Component {
  static propTypes = {
    handleOpen: PropTypes.func,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  renderBar = (step, progress, total) => {
    const { moduleTheme: { sip: { session: { bars } } } } = this.context
    return (
      <div style={bars[step].borderStyle}>
        <div
          style={{
            ...bars.barStyle,
            ...bars[step].backgroundStyle,
            ...{ width: `${(progress / total) * 100}%` },
          }}
        >
          <div style={bars.interiorStyle}>
            {progress} / {total}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { intl, moduleTheme: { sip } } = this.context

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'microservice-management.sips.title' })}
          subtitle={intl.formatMessage({ id: 'microservice-management.sips.session.subtitle' })}
        />
        <Stepper style={sip.stepperStyle}>
          <Step active>
            <StepButton>
              <FormattedMessage id="microservice-management.sips.stepper.session" />
            </StepButton>
          </Step>
          <Step disabled>
            <StepButton>
              <FormattedMessage id="microservice-management.sips.stepper.list" />
            </StepButton>
          </Step>
        </Stepper>
        <CardText>
          <div style={sip.filter.toolbarStyle}>
            <TextField
              style={sip.filter.textFieldStyle}
              floatingLabelText={intl.formatMessage({
                id: 'microservice-management.sips.session.filter.name.label',
              })}
            />
            <SelectField
              style={sip.filter.textFieldStyle}
              floatingLabelText={intl.formatMessage({
                id: 'microservice-management.sips.session.filter.date.label',
              })}
              value={0}
            >
              <MenuItem
                value={0}
                primaryText={intl.formatMessage(
                  {
                    id: 'microservice-management.sips.session.filter.date.value',
                  },
                  { numDays: 1 },
                )}
              />
              <MenuItem
                value={1}
                primaryText={intl.formatMessage(
                  {
                    id: 'microservice-management.sips.session.filter.date.value',
                  },
                  { numDays: 2 },
                )}
              />
              <MenuItem
                value={2}
                primaryText={intl.formatMessage(
                  {
                    id: 'microservice-management.sips.session.filter.date.value',
                  },
                  { numDays: 3 },
                )}
              />
              <MenuItem
                value={3}
                primaryText={intl.formatMessage(
                  {
                    id: 'microservice-management.sips.session.filter.date.value',
                  },
                  { numDays: 4 },
                )}
              />
              <MenuItem
                value={4}
                primaryText={intl.formatMessage(
                  {
                    id: 'microservice-management.sips.session.filter.date.value',
                  },
                  { numDays: 5 },
                )}
              />
            </SelectField>
          </div>
        </CardText>
        <CardMedia>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.id" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.generated" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.stored" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.indexed" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.errors" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.date" />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage id="microservice-management.sips.session.table.headers.actions" />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} preScanRows={false}>
              {[...Array(10).keys()].map(item => (
                <TableRow key={item}>
                  <TableRowColumn>{item}</TableRowColumn>
                  <TableRowColumn>{this.renderBar('generation', item * 5, 50)}</TableRowColumn>
                  <TableRowColumn>{this.renderBar('storage', item * 5, 50)}</TableRowColumn>
                  <TableRowColumn>{this.renderBar('indexation', item * 5, 50)}</TableRowColumn>
                  <TableRowColumn style={sip.session.error.rowColumnStyle}>
                    {item % 3} / 50
                    <ShowableAtRender show={item % 3 > 0}>
                      <Error style={sip.session.error.iconStyle} />
                    </ShowableAtRender>
                  </TableRowColumn>
                  <TableRowColumn>12/10/2017</TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={intl.formatMessage({
                        id: 'microservice-management.sips.session.table.actions.delete',
                      })}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      title={intl.formatMessage({
                        id: 'microservice-management.sips.session.table.actions.list',
                      })}
                      onTouchTap={this.props.handleOpen}
                    >
                      <Arrow />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardMedia>
      </Card>
    )
  }
}
export default SIPSessionComponent
