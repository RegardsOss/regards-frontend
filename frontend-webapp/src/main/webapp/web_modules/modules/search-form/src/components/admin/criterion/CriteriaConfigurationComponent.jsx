/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import concat from 'lodash/concat'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderSelectField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { AttributeModel, AttributeModelController, Plugin } from '@regardsoss/model'
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
    ...i18nContextType,
  }

  renderDynamicModelAttributes = () => map(this.props.selectableAttributes, selectableAttribute => (
    <MenuItem
      key={selectableAttribute.content.id}
      value={selectableAttribute.content.id}
      primaryText={AttributeModelController.getAttributeModelFullLabel(selectableAttribute)}
    />
    ))

  renderStandardAttributes = () => map(AttributeModelController.SearchableStandardAttributes, standardAttribute => (
    <MenuItem
      key={standardAttribute}
      value={standardAttribute}
      primaryText={standardAttribute}
    />),
    )

  /**
   * Display a configurable attribute
   * @param attribute
   * @returns {XML}
   */
  renderCriteriaAttributeConf = (criteriaAttribute) => {
    let selectableAttributes = this.renderStandardAttributes() || []
    selectableAttributes = concat(selectableAttributes, (this.renderDynamicModelAttributes() || []))

    return (
      <div key={criteriaAttribute.name}>
        <span style={this.context.moduleTheme.criteria.label}>
          {criteriaAttribute.description}
        </span>
        <Field
          name={`conf.attributes.${criteriaAttribute.name}`}
          fullWidth
          component={RenderSelectField}
          validate={ValidationHelpers.required}
          label={this.context.intl.formatMessage({ id: 'form.criterion.criteria.select.attribute.label' })}
        >
          {selectableAttributes}
        </Field>
      </div>
    )
  }

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
        {map(this.props.plugin.info.conf.attributes, attribute => this.renderCriteriaAttributeConf(attribute))}
      </CardText>
    </Card>)
  }
}

export default CriteriaConfigurationComponent
