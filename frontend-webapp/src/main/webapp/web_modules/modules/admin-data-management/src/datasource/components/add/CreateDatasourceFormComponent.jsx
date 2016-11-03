
import { Card, CardText, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import { map } from 'lodash'
import { CardActionsComponent } from '@regardsoss/components'
/*
interface CreateDatasourceProps {
  cancelUrl: string
  save: (name: string) => void
  connections: any
  modelObjects: any
  pluginDatasources: any
}*/
/**
 */
class CreateDatasourceFormComponent extends React.Component {


  state= {
    connectionId: -1,
    modelObjectId: -1,
    pluginDatasourceId: -1,
    name: '',
  }

  handleConnectionChange = (event, index, value) => {
    this.setState({
      connectionId: value,
    })
  }

  handleModelChange = (event, index, value) => {
    this.setState({
      modelObjectId: value,
    })
  }

  handlePluginDatasourceChange = (event, index, value) => {
    this.setState({
      pluginDatasourceId: value,
    })
  }

  handleSaveButton = () => {
    return this.props.save(this.state.name)
  }


  handleLabelChange = (event) => {
    const newName = event.target.value
    this.setState({
      name: newName,
    })
  }

  render() {
    const { connectionId, modelObjectId, pluginDatasourceId, name } = this.state
    const { connections, modelObjects, pluginDatasources, cancelUrl } = this.props
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={<FormattedMessage id="datamanagement.datasource.add.header" />}
        />
        <CardText>


          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.label" />}
            fullWidth
            onChange={this.handleLabelChange}
            value={name}
          />
          <div className={'row'}>

            <SelectField
              floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.connection" />}
              value={connectionId}
              onChange={this.handleConnectionChange}
            >
              {map(connections, (connection, id) => (
                <MenuItem
                  value={connection.id}
                  key={id}
                  primaryText={connection.name}
                />
              ))}
            </SelectField>

            <FlatButton
              label={<FormattedMessage id="datamanagement.datasource.add.action.new_connection" />}
              primary
            />

          </div>

          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.model" />}
            value={modelObjectId}
            onChange={this.handleModelChange}
          >
            {map(modelObjects, (model, id) => (
              <MenuItem
                value={model.id}
                key={id}
                primaryText={model.name}
              />
            ))}
          </SelectField>

          <FlatButton
            label={<FormattedMessage id="datamanagement.datasource.add.action.new_model" />}
            primary
          />
          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.datasource_model" />}
            value={pluginDatasourceId}
            onChange={this.handlePluginDatasourceChange}
          >
            {map(pluginDatasources, (pluginDatasource, id) => (
              <MenuItem
                value={pluginDatasource.id}
                key={id}
                primaryText={pluginDatasource.name}
              />
            ))}
          </SelectField>


          <CardActionsComponent
            secondaryButtonUrl={cancelUrl}
            secondaryButtonLabel={
              <FormattedMessage
                id="datamanagement.datasource.add.action.cancel"
              />
            }

            mainButtonTouchTap={this.handleSaveButton}
            mainButtonLabel={
              <FormattedMessage
                id="datamanagement.datasource.add.action.add"
              />
            }
          />

        </CardText>
      </Card>
    )
  }
}

export default CreateDatasourceFormComponent

