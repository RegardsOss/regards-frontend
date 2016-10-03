import * as React from "react"
import { Card, CardText, CardTitle } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import FlatButton from "material-ui/FlatButton"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import TextField from "material-ui/TextField"
import { Connection, DatasetModel, PluginDatasource } from "@regardsoss/models"
import { map } from "lodash"
import { CardActionsComponent } from "@regardsoss/components"

interface CreateDatasourceProps {
  cancelUrl: string
  save: (name: string) => void
  connections: any
  modelObjects: any
  pluginDatasources: any
}
/**
 */
class CreateDatasourceFormComponent extends React.Component<CreateDatasourceProps, any> {


  state: any = {
    connectionId: -1,
    modelObjectId: -1,
    pluginDatasourceId: -1,
    name: ""
  }

  handleConnectionChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      connectionId: value
    })
  }

  handleModelChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      modelObjectId: value
    })
  }

  handlePluginDatasourceChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      pluginDatasourceId: value
    })
  }

  handleSaveButton = () => {
    return this.props.save(this.state.name)
  }


  handleLabelChange = (event: React.FormEvent): any => {
    const newName = (event.target as any).value
    this.setState({
      "name": newName
    })
  }

  render (): JSX.Element {
    const {connectionId, modelObjectId, pluginDatasourceId, name} = this.state
    const {connections, modelObjects, pluginDatasources, cancelUrl} = this.props
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={<FormattedMessage id="datamanagement.datasource.add.header"/>}
        />
        <CardText>


          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.label"/>}
            fullWidth={true}
            onChange={this.handleLabelChange}
            value={name}
          />
          <div className={"row"}>

            <SelectField
              floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.connection"/>}
              value={connectionId}
              onChange={this.handleConnectionChange}
            >
              {map(connections, (connection: Connection, id: string) => (
                <MenuItem
                  value={connection.id}
                  key={id}
                  primaryText={connection.name}
                />
              ))}
            </SelectField>

            <FlatButton
              label={<FormattedMessage id="datamanagement.datasource.add.action.new_connection"/>}
              primary={true}
            />

          </div>

          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.model"/>}
            value={modelObjectId}
            onChange={this.handleModelChange}
          >
            {map(modelObjects, (model: DatasetModel, id: string) => (
              <MenuItem
                value={model.id}
                key={id}
                primaryText={model.name}
              />
            ))}
          </SelectField>

          <FlatButton
            label={<FormattedMessage id="datamanagement.datasource.add.action.new_model"/>}
            primary={true}
          />
          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.datasource.add.input.datasource_model"/>}
            value={pluginDatasourceId}
            onChange={this.handlePluginDatasourceChange}
          >
            {map(pluginDatasources, (pluginDatasource: PluginDatasource, id: string) => (
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


