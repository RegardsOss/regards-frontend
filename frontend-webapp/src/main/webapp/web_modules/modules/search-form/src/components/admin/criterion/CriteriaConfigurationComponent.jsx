/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { RenderSelectField, Field } from '@regardsoss/form-utils'
import { AttributeModel, Plugin } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to render a Criteria plugin configuration page.
 * @author Sébastien binda
 */
class CriteriaConfigurationComponent extends React.Component {

  static propTypes = {
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    // Set by plugin provider
    plugin: Plugin,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Callback when an attribute is selected
   * @param name
   * @param value
   */
  selectAttribute = (event, index, value, input) => {
    input.onChange(value)
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
      <Field
        name={`pluginConf.attributes.${criteriaAttribute.name}`}
        fullWidth
        component={RenderSelectField}
        type="text"
        onSelect={this.selectAttribute}
        label={<FormattedMessage id="form.criterion.criteria.select.attribute.label" />}
      >
        {map(this.props.selectableAttributes, selectableAttribute => (
          <MenuItem
            key={selectableAttribute.content.id}
            value={selectableAttribute.content.id}
            primaryText={selectableAttribute.content.name}
          />
        ))}
      </Field>
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
