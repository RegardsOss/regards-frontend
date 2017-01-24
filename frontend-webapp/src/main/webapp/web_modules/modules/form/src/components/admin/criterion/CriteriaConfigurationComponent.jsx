/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { AttributeModel, Plugin } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to render a Criteria plugin configuration page.
 */
class CriteriaConfigurationComponent extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    criteriaConf: React.PropTypes.object,
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    updatePluginConf: React.PropTypes.func.isRequired,
    // Set by plugin provider
    plugin: Plugin,
  }

  static contextTypes= {
    ...themeContextType,
  }

  state = {
    selectedAttributes: this.props.criteriaConf ? this.props.criteriaConf.attributes : {},
  }

  /**
   * Retrieve the locale selected value for the given configurable attribute of the criteria plugin
   * @param criteriaAttribute
   * @returns {*}
   */
  getAttributeSelectedValue = criteriaAttribute => this.state.selectedAttributes[criteriaAttribute.name]

  /**
   * Callback when an attribute is selected
   * @param name
   * @param value
   */
  selectAttribute = (criteriaAttribute, modelAttributeId) => {
    const selectedAttributes = Object.assign({}, this.state.selectedAttributes)
    selectedAttributes[criteriaAttribute.name] = modelAttributeId
    this.setState({ selectedAttributes })
    this.props.updatePluginConf({
      attributes: selectedAttributes,
    })
  }

  /**
   * Display a configurable attribute
   * @param attribute
   * @returns {XML}
   */
  renderAttribute = criteriaAttribute => (
    <div key={criteriaAttribute.name}>
      <span style={this.context.moduleTheme.criteria.label}>
        {criteriaAttribute.description}
      </span>
      <SelectField
        hintText={<FormattedMessage id="form.criterion.criteria.select.attribute.label" />}
        value={this.getAttributeSelectedValue(criteriaAttribute)}
        onChange={(event, idx, modelAttributeId) => this.selectAttribute(criteriaAttribute, modelAttributeId)}
      >
        {map(this.props.selectableAttributes, selectableAttribute => (
          <MenuItem
            key={selectableAttribute.content.id}
            value={selectableAttribute.content.id}
            primaryText={selectableAttribute.content.name}
          />
            ))}
      </SelectField>
    </div>
    )

  /**
   *
   * @returns {XML}
   */
  render() {
    return (<Card>
      <CardTitle
        title={this.props.plugin.info.description}
      />
      <CardText>
        {map(this.props.plugin.info.conf.attributes, attribute => this.renderAttribute(attribute))}
      </CardText>
    </Card>)
  }
}

export default CriteriaConfigurationComponent
