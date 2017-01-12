/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/**
 * Component to render a Criteria plugin configuration page.
 */
class CriteriaConfigurationComponent extends React.Component {

  state = {
    attributes: {},
  };

  /**
   * Callback when an attribute is selected
   * @param name
   * @param value
   */
  selectAttribute = (name, value) => {
    const attributes = Object.assign({}, this.state.attributes)
    attributes[name] = value
    this.setState({ attributes })
  }

  /**
   * Display a configurable attribute
   * @param attribute
   * @returns {XML}
   */
  renderAttribute = (attribute) => {
    const value = this.state.attributes[attribute.name] ? this.state.attributes[attribute.name] : null
    return (
      <div>
        <SelectField>
        key=
      </SelectField>
        <SelectField
          key={attribute.name}
          floatingLabelText={attribute.description}
          value={value}
          onChange={(event, index, value) => this.selectAttribute(attribute.name, value)}
        >
          <MenuItem value={1} primaryText="Attribute1" />
          <MenuItem value={2} primaryText="Attribute2" />
          <MenuItem value={3} primaryText="Attribute3" />
          <MenuItem value={4} primaryText="Atrtibute4" />
          <MenuItem value={5} primaryText="Attribute5" />
        </SelectField>
      </div>
    )
  }

  render() {
    return (<Card>
      <CardTitle
        title={this.props.plugin.info.name}
        subtitle={this.props.plugin.info.description}
      />
      <CardText>
        {map(this.props.plugin.info.conf.attributes, attribute => this.renderAttribute(attribute))}
      </CardText>
    </Card>)
  }
}

export default CriteriaConfigurationComponent
