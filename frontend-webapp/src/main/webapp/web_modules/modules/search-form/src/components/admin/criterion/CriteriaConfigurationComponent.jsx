/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import concat from 'lodash/concat'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderSelectField, Field, ValidationHelpers } from '@regardsoss/form-utils'
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

  renderDynamicModelAttributes = () => map(this.props.selectableAttributes, selectableAttribute => (
    <MenuItem
      key={selectableAttribute.content.id}
      value={selectableAttribute.content.id}
      primaryText={DamDomain.AttributeModelController.getAttributeModelFullLabel(selectableAttribute)}
    />
  ))

  renderStandardAttributes = () => map(DamDomain.AttributeModelController.searchableStandardAttributes, standardAttribute => (
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
