/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import { Connection } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatasourceStepperComponent from './DatasourceStepperComponent'

/**
 * React component to prevent user to create datasource if he doesn't have a connection yet
 */
export class DatasourceCreateOrPickConnectionComponent extends React.Component {

  static propTypes = {
    connectionList: PropTypes.objectOf(Connection),
    createConnectionUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    handleDone: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentConnection: undefined,
    }
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
            title={<FormattedMessage id="datasource.form.create.title" />}
            subtitle={<FormattedMessage id="datasource.form.create.subtitle" />}
          />
          <DatasourceStepperComponent stepIndex={0} />
          <CardText>
            <SelectField
              floatingLabelText={<FormattedMessage id="datasource.form.create.datasource" />}
              onChange={this.handleChange}
              value={currentConnection}
              fullWidth
            >
              {map(connectionList, (connection, id) => connection.content.active ? (
                <MenuItem
                  value={connection.content.id}
                  key={id}
                  primaryText={connection.content.label}
                />
                ) : null,
              )}
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonTouchTap={() => { handleDone(currentConnection) }}
              mainButtonLabel={
                <FormattedMessage
                  id="datasource.form.create.action.next"
                />
              }
              isMainButtonDisabled={currentConnection === undefined}
              secondaryButtonLabel={<FormattedMessage id="datasource.form.create.action.cancel" />}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
        <Card>
          <div style={style}>
            <RaisedButton
              label={<FormattedMessage id="datasource.form.create.action.connection" />}
              secondary
              style={styleButton}
              onTouchTap={this.goToConnection}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default DatasourceCreateOrPickConnectionComponent

