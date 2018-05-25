/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderSelectField, Field, ValidationHelpers, StringComparison } from '@regardsoss/form-utils'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to render a Criteria plugin configuration page.
 * @author Sébastien binda
 */
class CriteriaConfigurationComponent extends React.Component {
  static propTypes = {
    selectableAttributes: DataManagementShapes.AttributeModelList,
    // Set by plugin provider
    plugin: AccessShapes.UIPluginInstanceContent,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Display a configurable attribute
   * @param attribute
   * @returns {XML}
   */
  renderCriteriaAttributeConf = (criteriaAttribute) => {
    // filter attributes mathing expected criterion shape (transform lists into {id, key (value), label, type} to
    // be used no matter the parameter type)
    const { selectableAttributes } = this.props
    const allowedAttributesTypes = criteriaAttribute.attributeType || []

    const allAttributes = [
      // 1 - Convert all attributes to have objects like: { id (react key), key (item value), label, type, ...*}
      ...DamDomain.AttributeModelController.searchableStandardAttributes,
      ...map(selectableAttributes, selectableAttribute => ({
        id: selectableAttribute.content.id,
        key: selectableAttribute.content.id,
        type: selectableAttribute.content.type,
        label: DamDomain.AttributeModelController.getAttributeModelFullLabel(selectableAttribute),
      }))].filter(
      // 2 - filter attributes on expected type
      ({ type }) => allowedAttributesTypes.includes(type),
    ).sort(
      // 3 - sort attributes alphabetically
      ({ label: l1 }, { label: l2 }) => StringComparison.compare(l1, l2))

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
          { // map each parameter available, built previously
              allAttributes.map(({ id, key, label }) => (
                <MenuItem
                  key={id}
                  value={key}
                  primaryText={label}
                />))
          }
        </Field>
      </div>
    )
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <Card>
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
