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
import isEqual from 'lodash/isEqual'
import concat from 'lodash/concat'
import remove from 'lodash/remove'
import values from 'lodash/values'
import Divider from 'material-ui/Divider'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import StandardAttributesConfigurationComponent from './StandardAttributesConfigurationComponent'
import DynamicAttributesConfigurationComponent from './DynamicAttributesConfigurationComponent'
import AttributeRegroupementConfigurationComponent from './AttributeRegroupementConfigurationComponent'

/**
 * Component to display attributes configuration list.
 * Please note that the component i18n should defined in using module
 * @author Sébastien binda
 */
class MainAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    // Initial configuration of the current module
    defaultAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    defaultAttributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    // Current configuration
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    // shold allow facettes configuration?
    allowFacettes: PropTypes.bool.isRequired,
    // should allow attributes regroupement configuration?
    allowAttributesRegroupements: PropTypes.bool.isRequired,
    // attributes field name in redux form
    attributesFieldName: PropTypes.string.isRequired,
    // attributes regroupement field name in redux form (not required, used only when regroupement are allowed)
    regroupementsFieldName: PropTypes.string,
    // Redux-form function to change current form values
    changeField: PropTypes.func.isRequired,
  }

  /**
   * At mount, check that the configuration is valid with the available attributes.
   */
  componentDidMount() {
    const { attributesConf, changeField, attributesFieldName } = this.props
    if (attributesConf) {
      const updatedConf = this.removeUnavailableAttributesConfiguration(attributesConf)
      if (!isEqual(updatedConf, attributesConf)) {
        changeField(attributesFieldName, updatedConf)
      }
    }
  }

  /**
   * If available attributes changes, update the configuration by using the initial configuration
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (isEqual(!nextProps.selectableAttributes, this.props.selectableAttributes)) {
      // The available attributes changed. So the current configuration is no longer valid.
      if (this.props.attributesConf) {
        this.props.changeField(this.props.attributesFieldName, this.removeUnavailableAttributesConfiguration(this.props.defaultAttributesConf))
      }
      if (this.props.attributesRegroupementsConf) {
        this.props.changeField(this.props.regroupementsFieldName, this.props.defaultAttributesRegroupementsConf)
      }
    }
  }

  /**
   * Change attribute configuration into the redux-form
   * @param attributeId
   * @param conf
   */
  onChange = (attributeFullQualifiedName, updatedAttrConfiguration) => {
    const { attributesConf = [], changeField, attributesFieldName } = this.props
    // update or add the attribute configuration, when missing
    const foundIndex = attributesConf.findIndex(attrConf => attrConf.attributeFullQualifiedName === attributeFullQualifiedName)
    let newAttributesConfigurations
    if (foundIndex < 0) {
      newAttributesConfigurations = [...attributesConf, updatedAttrConfiguration]
    } else {
      newAttributesConfigurations = [...attributesConf]
      newAttributesConfigurations[foundIndex] = updatedAttrConfiguration
    }

    // If this configuration is initial sort, others should no longer be
    if (updatedAttrConfiguration.initialSort) {
      newAttributesConfigurations = newAttributesConfigurations.map(attributeConfiguration =>
        attributeConfiguration.attributeFullQualifiedName === updatedAttrConfiguration.attributeFullQualifiedName ?
          // don't change new conf
          updatedAttrConfiguration : { // clear initial sort in other configuration
            ...attributeConfiguration,
            initialSort: false,
          })
    }
    changeField(attributesFieldName, newAttributesConfigurations)
  }

  /**
   * Callback when a property of an attribute is changed
   * @param label
   * @param conf
   */
  onChangeRegroupement = (label, conf) => {
    let newConf = true
    // If conf for the given attribute already exists, then update it
    let newAttributesConf = []
    if (this.props.attributesRegroupementsConf) {
      newAttributesConf = map(this.props.attributesRegroupementsConf, (attributeConf) => {
        if (attributeConf.label === label) {
          newConf = false
          return conf
        }
        return attributeConf
      })
    }

    // Else add the new attribute conf
    if (newConf) {
      newAttributesConf.push(conf)
    }
    this.props.changeField(this.props.regroupementsFieldName, newAttributesConf)
  }

  /**
   * Callback called to remove an existing regroupement
   */
  onDeleteRegroupement = (regroupementConf) => {
    const newAttributesConf = concat([], this.props.attributesRegroupementsConf)
    remove(newAttributesConf, conf => conf.label === regroupementConf.label)
    this.props.changeField(this.props.regroupementsFieldName, newAttributesConf)
  }

  /**
   * Update given attributes configuration with avaialble attributes.
   * If configuration contains attributes that are not available, so remove theme
   */
  removeUnavailableAttributesConfiguration(attributesConf) {
    // Remove attribute configuration for unavailable attributes
    const updatedAttributesConf = concat([], attributesConf)
    remove(updatedAttributesConf,
      attributeConf => !AccessDomain.AttributeConfigurationController.findAttributeConf(values(this.props.selectableAttributes), attributeConf),
    )
    return updatedAttributesConf
  }

  render() {
    const { attributesConf = [], attributesRegroupementsConf = [], allowAttributesRegroupements, allowFacettes } = this.props
    const styles = { marginTop: 20 }
    return (
      <div>
        <StandardAttributesConfigurationComponent
          attributesConf={attributesConf}
          allowFacettes={allowFacettes}
          onChangeAttributeConfiguration={this.onChange}
        />
        <Divider style={styles} />
        <DynamicAttributesConfigurationComponent
          selectableAttributes={this.props.selectableAttributes}
          attributesConf={attributesConf}
          allowFacettes={allowFacettes}
          onChangeAttributeConfiguration={this.onChange}
        />
        <ShowableAtRender show={allowAttributesRegroupements}>
          <AttributeRegroupementConfigurationComponent
            selectableAttributes={this.props.selectableAttributes}
            attributesRegroupementsConf={attributesRegroupementsConf}
            onChangeRegroupenentConfiguration={this.onChangeRegroupement}
            onDeleteRegroupement={this.onDeleteRegroupement}
          />
          <Divider style={styles} />
        </ShowableAtRender>
      </div>
    )
  }
}

export default MainAttributesConfigurationComponent
