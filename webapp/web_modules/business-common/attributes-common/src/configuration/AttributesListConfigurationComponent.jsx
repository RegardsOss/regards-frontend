/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { withModuleStyle } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { StringComparison } from '@regardsoss/form-utils'
import AttributeListTableComponent from './table/AttributeListTableComponent'
import styles from '../styles'
import messages from '../i18n'
import EditItemDialog from './dialog/edit/EditItemDialog'
import AddManyDialog from './dialog/add/AddManyDialog'

/**
 * Component to display and edit attributes configuration list.
 * Note: each allow* property corresponds to some capacity of the elements to add in AttributeListConfigurationModel.
 * @author Raphaël Mechali
 */
export class AttributesListConfigurationComponent extends React.Component {
  static propTypes = {
    // Available Attributes for configuration
    // eslint-disable-next-line react/no-unused-prop-types
    selectableAttributes: DataManagementShapes.AttributeModelList.isRequired, // used only in onPropertiesUpdated
    // Current list configuration (Marked here as a simple element list, but may contain all addition data for columns and such)
    attributesList: AccessShapes.AttributeListConfigurationModel,
    // should allow attributes regroupement configuration?
    allowAttributesGroups: PropTypes.bool,
    // should this edition component add columns properties into elements?
    allowLabel: PropTypes.bool,
    // should this edition component a render properties
    allowRendererSelection: PropTypes.bool,
    // List hint text, that should be shown while no element has been added
    hintMessageKey: PropTypes.string.isRequired,
    // Attributes filter: returns true when an attribute is allowed for current selection, false otherwise
    // eslint-disable-next-line react/no-unused-prop-types
    attributesFilter: PropTypes.func, // used only in onPropertiesUpdated
    // Redux-form list field name
    attributesListFieldName: PropTypes.string.isRequired,
    // Redux-form function to change current form values
    changeField: PropTypes.func.isRequired,
    // From mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    i18n: PropTypes.string, // used only in onPropertiesUpdated, automatically add by REGARDS connect method
  }

  static defaultProps = {
    allowLabel: false,
    allowRendererSelection: false,
    allowAttributesGroups: false,
    attributesFilter: AttributesListConfigurationComponent.filterNone,
    attributesList: [],
    i18n: UIDomain.LOCALES_ENUM.en,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Filters no attribute
   */
  static filterNone() {
    return true
  }

  /**
   * Filters attributes, in groups, that are no longer available in attributes list. Filters groups where no attribute is
   * available anylonger
   * @param attributesList attributes list
   * @param attributeModels available attribute models (within content)
   * @return attributes groups configurations containing only group configurations with one or more available attributes
   */
  static filterElementsList(attributesList = [], attributeModels) {
    return attributesList.reduce((acc, attributeConfiguration) => {
      // A - compute filtered grouped attributes
      const filteredAttributes = attributeConfiguration.attributes.filter(({ name }) => !!DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels))
      // B - return updated attribute element if not empty
      return filteredAttributes.length ? [...acc, {
        ...attributeConfiguration,
        attributes: filteredAttributes,
      }] : acc
    }, [])
  }

  state = {
    attributeModels: [], // list of models containing standard attributes
    editionData: null, // current edition data (for corresponding dialog)
    multipleSelectionData: null, // current multiple edition data
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      selectableAttributes,
      attributesList,
      changeField,
      attributesListFieldName,
      attributesFilter,
    } = newProps

    // 1 - Update current configurations when selectable attributes change
    const oldState = this.state || {}
    const newState = { ...oldState }
    if ((!isEqual(oldProps.selectableAttributes, selectableAttributes)
      || !isEqual(oldProps.attributesFilter, attributesFilter)
      || !isEqual(oldProps.i18n, newProps.i18n)) && selectableAttributes) {
      // 1.a - prepare the list of attributes that user can select, allowing standard attributes and sorted on label
      newState.attributeModels = [
        ...DamDomain.AttributeModelController.standardAttributesAsModel, // all standard attributes
        ...values(selectableAttributes), // all server attributes
      ].filter(attributesFilter) // filter on allowed elements only
        .sort(({ content: { jsonPath: j1 } }, { content: { jsonPath: j2 } }) => StringComparison.compare(j1, j2))

      // 1.b - Update current configurations when attribute models could be retrieved from server
      const updated = AttributesListConfigurationComponent.filterElementsList(attributesList, newState.attributeModels)
      if (!isEqual(updated, attributesList)) {
        changeField(attributesListFieldName, updated)
      }
    }
    // update when there is a state change
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * User callback: add option clicked. Show add dialog
   */
  onShowAddOneItemDialog = () => {
    const { attributesList } = this.props
    this.setState({
      editionData: {
        attributesList: [...attributesList, this.buildNewItem()],
        editedElementIndex: attributesList.length,
        isNewItem: true,
      },
    })
  }

  /**
   * User callback: edit option clicked. Show edit dialog
   * @param {number} itemIndex item index
   */
  onShowEditDialog = (itemIndex) => {
    const { attributesList } = this.props
    this.setState({
      editionData: {
        attributesList,
        editedElementIndex: itemIndex,
        isNewItem: true,
      },
    })
  }

  /**
   * User callback: edition / add cancelled
   */
  onCancelEdit = () => this.setState({ editionData: null })

  /**
   * User callback: edition / add confirmed
   * @param newList updated list with edited element
   */
  onConfirmEdit = (newList) => {
    this.setState({ editionData: null })
    this.onCommit(newList)
  }

  /**
   * User callback: delete option clicked. Show delete dialog
   * @param {number} deleteIndex indexof the item to delete
   */
  onDelete = (deleteIndex) => {
    const { attributesList } = this.props
    this.onCommit(attributesList.filter((item, index) => index !== deleteIndex))
  }

  /**
   * Use callback: add many items clicked. Show attributes selection dialog
   */
  onAddManyItemsDialog = () => {
    const { attributeModels } = this.state
    const { attributesList } = this.props
    this.setState({
      // Enable dialog by providing the edition list as [{attributeModel, selected}].
      multipleSelectionData: values(attributeModels).map((attributeModel) => ({
        attributeModel,
        // Attribute is initially selected when there is no group using it
        selected: !attributesList.some(
          (attributesGroup) => attributesGroup.attributes.some(
            (attrConf) => attrConf.name === attributeModel.content.jsonPath)),
      })),
    })
  }

  /**
   * User callback: add many cancelled
   */
  onCancelAddMany = () => this.setState({ multipleSelectionData: null })

  /**
   * User callback: add many confirmed, commit changes in attributes list
   * @param {[{attributeModel: *, selected: boolean}]} selectionModel edited selection model
   */
  onConfirmAddMany = (selectionModel) => {
    const { allowLabel, attributesList } = this.props
    this.setState({ multipleSelectionData: null })
    this.onCommit([
      ...attributesList,
      // add all selected attributes
      ...selectionModel.reduce((acc, { attributeModel: { content: { label, jsonPath } }, selected }) => {
        if (selected) {
          const newGroup = { attributes: [{ name: jsonPath }] }
          if (allowLabel) {
            newGroup.label = {
              [UIDomain.LOCALES_ENUM.en]: label,
              [UIDomain.LOCALES_ENUM.fr]: label,
            }
          }
          return [...acc, newGroup]
        }
        return acc
      }, []),
    ])
  }

  /**
   * Inner event: this component commits a new field value
   * @param newList new attributes list
   */
  onCommit = (newList) => {
    const { changeField, attributesListFieldName, attributesList } = this.props
    if (!isEqual(newList, attributesList)) { // commit only on real change
      changeField(attributesListFieldName, newList)
    }
  }

  /**
   * Builds a new item for current allowed options
   */
  buildNewItem = () => {
    const { allowLabel } = this.props
    const newItem = { attributes: [] }
    if (allowLabel) {
      newItem.label = {
        en: '',
        fr: '',
      }
    }
    return newItem
  }

  render() {
    const {
      hintMessageKey, attributesList, allowAttributesGroups,
      allowLabel, allowRendererSelection, selectableAttributes,
    } = this.props
    const { attributeModels, editionData, multipleSelectionData } = this.state
    return (
      <>
        {/* 1. show edit dialog when there is edition data */}
        <EditItemDialog
          allowLabel={allowLabel}
          allowRendererSelection={allowRendererSelection}
          allowAttributesGroups={allowAttributesGroups}
          attributeModels={attributeModels}
          editionData={editionData}
          onCancel={this.onCancelEdit}
          onConfirm={this.onConfirmEdit}
        />
        {/* 2. Show add many dialog when requested */}
        <AddManyDialog
          initialSelectionModel={multipleSelectionData}
          onCancel={this.onCancelAddMany}
          onConfirm={this.onConfirmAddMany}
        />
        {/* 3. show currently defined attributes elements */}
        <AttributeListTableComponent
          hintMessageKey={hintMessageKey}
          attributesList={attributesList}
          attributeModels={values(selectableAttributes)}
          allowAttributesGroups={allowAttributesGroups}
          allowLabel={allowLabel}
          // callbacks to show dialogs
          onAddOneItem={this.onShowAddOneItemDialog}
          onAddManyItems={this.onAddManyItemsDialog}
          onEdit={this.onShowEditDialog}
          onDelete={this.onDelete}
        />
      </>
    )
  }
}
// note: we stack calling context messages to get the hint key correctly resolved in parent context
export default compose(connect(), withI18n(messages, true), withModuleStyle(styles))(AttributesListConfigurationComponent)
