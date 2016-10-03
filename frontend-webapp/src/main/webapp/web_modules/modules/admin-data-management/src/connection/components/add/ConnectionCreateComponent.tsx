import * as React from "react"
import { Card, CardTitle, CardText } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import { CardActionsComponent } from "@regardsoss/components"
import { DBPlugin } from "@regardsoss/models"
import { map, find } from "lodash"
import IntegerInputComponent from "../../../dataset/components/input/IntegerInputComponent"
import TextInputComponent from "../../../dataset/components/input/TextInputComponent"

interface ConnectionCreateProps {
  getCancelUrl: () => string
  handleNextStep: (name: string, pluginName: string, requiredAttributes: {[index: string]: string}) => void
}
const attributes = {
  USERNAME: "username",
  PASSWORD: "password",
  ADDRESS: "address",
  PORT: "port"
}
/**
 */
class ConnectionCreateComponent extends React.Component<ConnectionCreateProps, any> {

  constructor (props: ConnectionCreateProps) {
    super(props)
    this.state = {
      label: "",
      pluginName: "",
      requiredAttributes: [], // define the list of required attributes of the corresponding plugin
      requiredAttributesValues: [], // define the list of required attributes of the corresponding plugin

      // Todo: retrieve plugins from API
      plugins: [{
        name: "Plugin Oracle",
        requireAttributes: [attributes.USERNAME, attributes.PASSWORD, attributes.ADDRESS, attributes.PORT]
      }, {
        name: "Plugin Postgresql",
        requireAttributes: [attributes.USERNAME, attributes.PASSWORD, attributes.ADDRESS, attributes.PORT]
      }, {
        name: "Plugin SQLite",
        requireAttributes: [attributes.USERNAME, attributes.PASSWORD, attributes.ADDRESS]
      }]
    }
  }

  handleSaveButton = (event: React.FormEvent) => {
    const {requiredAttributesValues, pluginName, label} = this.state
    return this.props.handleNextStep(label, pluginName, requiredAttributesValues)
  }

  handleCancelUrl = (): string => {
    return this.props.getCancelUrl()
  }

  handlePluginTypeChange = (event: React.FormEvent, index: number, value: any) => {
    const plugins: Array<DBPlugin> = this.state.plugins
    const plugin: DBPlugin = find(plugins, {name: value})
    this.setState({
      pluginName: value,
      requiredAttributes: plugin.requireAttributes,
      requiredAttributesValues: [] // reset existing values
    })
  }

  handleChangeConnectionLabel = (event: React.FormEvent) => {
    const newLabel = (event.target as any).value
    this.setState({
      label: newLabel
    })
  }

  handleChangeAttributeValue = (attribute: string, value: any) => {
    let requiredAttributesValues = this.state.requiredAttributesValues
    requiredAttributesValues[attribute] = value
    this.setState({
      requiredAttributesValues: requiredAttributesValues
    })
  }
  getValue = (attribute: string) => {
    return this.state.requireAttributes && this.state.requireAttributes[attribute]
  }

  render (): JSX.Element {
    const {requiredAttributes, pluginName, label, plugins} = this.state
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={<FormattedMessage id="datamanagement.connection.add.header"/>}
        />
        <CardText>

          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.connection.add.input.label"/>}
            value={label}
            onChange={this.handleChangeConnectionLabel}
            fullWidth={true}
          />

          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.connection.add.input.selectType"/>}
            value={pluginName}
            fullWidth={true}
            onChange={this.handlePluginTypeChange}
          >
            {map(plugins, (plugin: DBPlugin, id: string) => (
              <MenuItem value={plugin.name} primaryText={plugin.name} key={id}/>
            ))}
          </SelectField>
          {map(requiredAttributes, (attributeName: string, id: string) => {
            switch (attributeName) {
              case attributes.USERNAME:
                return (
                  <TextInputComponent
                    label={<FormattedMessage id="datamanagement.connection.add.input.username"/>}
                    value={this.getValue(attributeName)}
                    fullWidth={true}
                    onValueChange={(newValue) => {this.handleChangeAttributeValue(attributeName, newValue)}}
                    key={id}
                  />
                )
              case attributes.PASSWORD:
                return (
                  <TextInputComponent
                    label={<FormattedMessage id="datamanagement.connection.add.input.password"/>}
                    value={this.getValue(attributeName)}
                    fullWidth={true}
                    onValueChange={(newValue) => {this.handleChangeAttributeValue(attributeName, newValue)}}
                    key={id}
                    type="password"
                  />
                )
              case attributes.PORT:
                return (
                  <IntegerInputComponent
                    fullWidth={true}
                    value={this.getValue(attributeName)}
                    label={<FormattedMessage id="datamanagement.connection.add.input.port"/>}
                    onValueChange={(newValue) => {this.handleChangeAttributeValue(attributeName, newValue)}}
                    key={id}
                  />
                )
              case attributes.ADDRESS:
                return (
                  <TextInputComponent
                    label={<FormattedMessage id="datamanagement.connection.add.input.address"/>}
                    value={this.getValue(attributeName)}
                    fullWidth={true}
                    onValueChange={(newValue) => {this.handleChangeAttributeValue(attributeName, newValue)}}
                    key={id}
                  />
                )
              default:
                throw "Undefined connection attribute " + name
            }
          })}

          <CardActionsComponent
            secondaryButtonUrl={this.handleCancelUrl()}
            secondaryButtonLabel={
              <FormattedMessage
                id="datamanagement.connection.add.action.cancel"
              />
            }

            mainButtonTouchTap={this.handleSaveButton}
            mainButtonLabel={
              <FormattedMessage
                id="datamanagement.connection.add.action.test"
              />
            }
          />
        </CardText>
      </Card>
    )
  }
}
export default ConnectionCreateComponent
