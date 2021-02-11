/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DBDatasourceStepperComponent from './DBDatasourceStepperComponent'

/**
 * React component to prevent user to create datasource if he doesn't have a connection yet
 */
export class DBDatasourceCreateOrPickConnectionComponent extends React.Component {
  static propTypes = {
    connectionList: DataManagementShapes.ConnectionList,
    createConnectionUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    handleDone: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentConnection: undefined,
  }

  handleChange = (event, index, value) => {
    this.setState({
      currentConnection: value,
    })
  }

  goToConnection = () => {
    browserHistory.push(this.props.createConnectionUrl)
  }

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px',
    }
    const { currentConnection } = this.state
    const styleButton = {
      margin: '30px 0',
    }
    const { connectionList, handleDone, backUrl } = this.props
    return (
      <div>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'datasource.form.create.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.create.subtitle' })}
          />
          <DBDatasourceStepperComponent stepIndex={0} />
          <CardText>
            <SelectField
              className="selenium-pickConnection"
              floatingLabelText={this.context.intl.formatMessage({ id: 'datasource.form.create.datasource' })}
              onChange={this.handleChange}
              value={currentConnection}
              fullWidth
            >
              {map(connectionList, ({
                content: {
                  id, active, label, businessId,
                },
              }) => active ? (
                <MenuItem
                  className={`selenium-pickConnection-${label}`}
                  key={id}
                  value={businessId}
                  primaryText={label}
                />
              ) : null)}
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonClick={() => { handleDone(currentConnection) }}
              mainButtonLabel={
                <FormattedMessage
                  id="datasource.form.create.action.next"
                />
              }
              isMainButtonDisabled={currentConnection === undefined}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.create.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
        <Card>
          <div style={style}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'datasource.form.create.action.connection' })}
              secondary
              style={styleButton}
              onClick={this.goToConnection}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default DBDatasourceCreateOrPickConnectionComponent
