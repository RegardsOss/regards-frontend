/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import { map } from 'lodash'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import { Connection } from '@regardsoss/model'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatasourceStepperComponent from './DatasourceStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasourceCreateOrPickConnectionComponent extends React.Component {

  static propTypes = {
    connectionList: React.PropTypes.objectOf(Connection),
    createConnectionUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    handleDone: React.PropTypes.func.isRequired,
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

  render() {
    const style = Object.assign({}, this.context.muiTheme.layout.cardEspaced, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })
    const { currentConnection } = this.state
    const styleButton = {
      margin: '30px 0',
    }
    const { connectionList, createConnectionUrl, handleDone, backUrl } = this.props
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
              {map(connectionList, (connection, id) => {

                return connection.content.active ? (
                  <MenuItem
                    value={connection.content.id}
                    key={id}
                    primaryText={connection.content.label}
                  />
                ) : null
                }
              )}
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonTouchTap={() => { handleDone(currentConnection) }}
              mainButtonLabel={
                <FormattedMessage
                  id="dataset.form.create.action.next"
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
              href={createConnectionUrl}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default DatasourceCreateOrPickConnectionComponent

