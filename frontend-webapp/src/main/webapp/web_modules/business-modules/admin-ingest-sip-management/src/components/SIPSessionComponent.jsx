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
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Error from 'material-ui/svg-icons/alert/error'
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import {
  ShowableAtRender,
  PageableInfiniteTableContainer,
  TableLayout,
  TableColumnBuilder,
  DateValueRender,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'
import { sessionActions, sessionSelectors } from '../clients/SessionClient'

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

  getProgressLabel = step => (entity) => {
    const progress = entity.content[`${step}SipsCount`]
    const total = entity.content.sipsCount

    return `${progress} / ${total}`
  }

  getProgressPercent = step => (entity) => {
    const progress = entity.content[`${step}SipsCount`]
    const total = entity.content.sipsCount

    return progress / total * 100
  }

  renderTable = () => {
    const { intl, muiTheme, moduleTheme: { sip } } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    const columns = [
      // id column
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.id',
        intl.formatMessage({ id: 'sips.session.table.headers.id' }),
        'content.id',
      ),
      ...['generated', 'stored', 'indexed'].map(step =>
        TableColumnBuilder.buildSimpleColumnWithCell(
          `column.${step}`,
          intl.formatMessage({ id: `sips.session.table.headers.${step}` }),
          TableColumnBuilder.buildProgressRenderCell(this.getProgressPercent(step), this.getProgressLabel(step)),
        ),
      ),
      TableColumnBuilder.buildSimpleColumnWithCell(
        'column.errors',
        intl.formatMessage({ id: 'sips.session.table.headers.errors' }),
        {
          Constructor: props => (
            <div style={sip.session.error.rowColumnStyle}>
              <div style={sip.session.error.textStyle}>
                {props.entity.content.errorSipsCount} / {props.entity.content.sipsCount}
              </div>
              <ShowableAtRender
                style={sip.session.error.iconContainerStyle}
                show={props.entity.content.errorSipsCount > 0}
              >
                <IconButton
                  iconStyle={sip.session.error.iconStyle}
                  title={intl.formatMessage({
                    id: 'sips.session.table.actions.errors',
                  })}
                  onTouchTap={() => this.props.handleOpen(props.entity.content.id, true)}
                >
                  <Error />
                </IconButton>
              </ShowableAtRender>
            </div>
          ),
        },
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.date',
        intl.formatMessage({ id: 'sips.session.table.headers.date' }),
        'content.lastActivationDate',
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
                  id: 'sips.session.table.actions.delete',
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
                title={intl.formatMessage({
                  id: 'sips.session.table.actions.list',
                })}
                onTouchTap={() => this.props.handleOpen(props.entity.content.id)}
              >
                <Arrow />
              </IconButton>
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
          pageActions={sessionActions}
          pageSelectors={sessionSelectors}
          pageSize={10}
          columns={columns}
        />
      </TableLayout>
    )
  }

  render() {
    const { intl, moduleTheme: { sip } } = this.context

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'sips.title' })}
          subtitle={intl.formatMessage({ id: 'sips.session.subtitle' })}
        />
        <Stepper style={sip.stepperStyle}>
          <Step active>
            <StepButton>
              <FormattedMessage id="sips.stepper.session" />
            </StepButton>
          </Step>
          <Step disabled>
            <StepButton>
              <FormattedMessage id="sips.stepper.list" />
            </StepButton>
          </Step>
        </Stepper>
        <CardText>
          <div style={sip.filter.toolbarStyle}>
            <TextField
              style={sip.filter.textFieldStyle}
              floatingLabelText={intl.formatMessage({
                id: 'sips.session.filter.name.label',
              })}
            />
            <SelectField
              style={sip.filter.textFieldStyle}
              floatingLabelText={intl.formatMessage({
                id: 'sips.session.filter.date.label',
              })}
              value={0}
            >
              <MenuItem
                value={0}
                primaryText={intl.formatMessage(
                  {
                    id: 'sips.session.filter.date.value',
                  },
                  { numDays: 1 },
                )}
              />
              <MenuItem
                value={1}
                primaryText={intl.formatMessage(
                  {
                    id: 'sips.session.filter.date.value',
                  },
                  { numDays: 2 },
                )}
              />
              <MenuItem
                value={2}
                primaryText={intl.formatMessage(
                  {
                    id: 'sips.session.filter.date.value',
                  },
                  { numDays: 3 },
                )}
              />
              <MenuItem
                value={3}
                primaryText={intl.formatMessage(
                  {
                    id: 'sips.session.filter.date.value',
                  },
                  { numDays: 4 },
                )}
              />
              <MenuItem
                value={4}
                primaryText={intl.formatMessage(
                  {
                    id: 'sips.session.filter.date.value',
                  },
                  { numDays: 5 },
                )}
              />
            </SelectField>
            <RaisedButton label={intl.formatMessage({ id: 'sips.button.filter' })} primary />
          </div>
        </CardText>
        <CardMedia>{this.renderTable()}</CardMedia>
      </Card>
    )
  }
}
export default SIPSessionComponent
