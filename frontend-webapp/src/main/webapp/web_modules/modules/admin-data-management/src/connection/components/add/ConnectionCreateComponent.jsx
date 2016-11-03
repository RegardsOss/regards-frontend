
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'
import { map, find } from 'lodash'
import IntegerInputComponent from '../../../dataset/components/input/IntegerInputComponent'
import TextInputComponent from '../../../dataset/components/input/TextInputComponent'

const attributes = {
  USERNAME: 'username',
  PASSWORD: 'password',
  ADDRESS: 'address',
  PORT: 'port',
}
/**
 */
class ConnectionCreateComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      label: '',
      pluginName: '',
      requiredAttributes: [], // define the list of required attributes of the corresponding plugin
      requiredAttributesValues: [], // define the list of required attributes of the corresponding plugin

      // Todo: retrieve plugins from API
      plugins: [{
        name: 'Plugin Oracle',
        requireAttributes: [attributes.USERNAME, attributes.PASSWORD, attributes.ADDRESS, attributes.PORT],
      }, {
        name: 'Plugin Postgresql',
        requireAttributes: [attributes.USERNAME, attributes.PASSWORD, attributes.ADDRESS, attributes.PORT],
      }, {
        name: 'Plugin SQLite',
        requireAttributes: [attributes.USERNAME, attributes.PASSWORD, attributes.ADDRESS],
      }],
    }
  }


  handleSaveButton = (event) => {
    const { requiredAttributesValues, pluginName, label } = this.state
    return this.props.handleNextStep(label, pluginName, requiredAttributesValues)
  }

  handleCancelUrl = () => {
    return this.props.getCancelUrl()
  }

  handlePluginTypeChange = (event, index, value) => {
    const plugins = this.state.plugins
    const plugin = find(plugins, { name: value })
    this.setState({
      pluginName: value,
      requiredAttributes: plugin.requireAttributes,
      requiredAttributesValues: [], // reset existing values
    })
  }

  handleChangeConnectionLabel = (event) => {
    const newLabel = event.target.value
    this.setState({
      label: newLabel,
    })
  }

  handleChangeAttributeValue = (attribute, value) => {
    const requiredAttributesValues = this.state.requiredAttributesValues
    requiredAttributesValues[attribute] = value
    this.setState({
      requiredAttributesValues,
    })
  }
  getValue = (attribute) => {
    return this.state.requireAttributes && this.state.requireAttributes[attribute]
  }

  render() {
    const { requiredAttributes, pluginName, label, plugins } = this.state
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={<FormattedMessage id="datamanagement.connection.add.header" />}
        />
        <CardText>

          <TextField
            type="text"
            floatingLabelText={<FormattedMessage id="datamanagement.connection.add.input.label" />}
            value={label}
            onChange={this.handleChangeConnectionLabel}
            fullWidth
          />

          <SelectField
            floatingLabelText={<FormattedMessage id="datamanagement.connection.add.input.selectType" />}
            value={pluginName}
            fullWidth
            onChange={this.handlePluginTypeChange}
          >
            {map(plugins, (plugin, id) => (
              <MenuItem value={plugin.name} primaryText={plugin.name} key={id} />
            ))}
          </SelectField>
          {map(requiredAttributes, (attributeName, id) => {
            switch (attributeName) {
              case attributes.USERNAME:
                return (
                  <TextInputComponent
                    label={<FormattedMessage id="datamanagement.connection.add.input.username" />}
                    value={this.getValue(attributeName)}
                    fullWidth
                    onValueChange={(newValue) => { this.handleChangeAttributeValue(attributeName, newValue) }}
                    key={id}
                  />
                )
              case attributes.PASSWORD:
                return (
                  <TextInputComponent
                    label={<FormattedMessage id="datamanagement.connection.add.input.password" />}
                    value={this.getValue(attributeName)}
                    fullWidth
                    onValueChange={(newValue) => { this.handleChangeAttributeValue(attributeName, newValue) }}
                    key={id}
                    type="password"
                  />
                )
              case attributes.PORT:
                return (
                  <IntegerInputComponent
                    fullWidth
                    value={this.getValue(attributeName)}
                    label={<FormattedMessage id="datamanagement.connection.add.input.port" />}
                    onValueChange={(newValue) => { this.handleChangeAttributeValue(attributeName, newValue) }}
                    key={id}
                  />
                )
              case attributes.ADDRESS:
                return (
                  <TextInputComponent
                    label={<FormattedMessage id="datamanagement.connection.add.input.address" />}
                    value={this.getValue(attributeName)}
                    fullWidth
                    onValueChange={(newValue) => { this.handleChangeAttributeValue(attributeName, newValue) }}
                    key={id}
                  />
                )
              default:
                throw `Undefined connection attribute ${name}`
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

ConnectionCreateComponent.propTypes = {
  getCancelUrl: React.PropTypes.func.isRequired,
  handleNextStep: React.PropTypes.func.isRequired,
}

export default ConnectionCreateComponent
