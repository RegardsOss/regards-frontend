/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import { formValueSelector } from 'redux-form'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/display-control'
import { ScrollArea } from '@regardsoss/adapters'
import {
  RenderTextField, RenderSelectField, Field, FieldArray, reduxForm, ValidationHelpers, ErrorTypes,
} from '@regardsoss/form-utils'
import SingleAttributeFieldRender from '../../single/SingleAttributeFieldRender'
import MultipleAttributesFieldRender from '../../multiple/MultipleAttributesFieldRender'
import { getTypeRendererKeys, DEFAULT_RENDERER_KEY } from '../../../render/AttributesTypeToRender'

/**
 * Edit item form component. It switches form parts depending on the functionnalities enabled for
 * the items list and configures the attributes selection table
 * @author Raphaël Mechali
 */
export class EditItemForm extends React.Component {
  static propTypes = {
    allowLabel: PropTypes.bool.isRequired,
    allowRendererSelection: PropTypes.bool.isRequired,
    allowAttributesGroups: PropTypes.bool.isRequired,
    // available attribute models
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    // edition data: this dialog is visible only when it is porvided
    editionData: PropTypes.shape({
      // model. When adding a new item, it must present in this model
      attributesList: AccessShapes.AttributeListConfigurationModel.isRequired,
      editedElementIndex: PropTypes.number.isRequired,
    }),
    onConfirm: PropTypes.func.isRequired, // (item: {*}, order: number) => ()
    onCancel: PropTypes.func.isRequired,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    // from mapStateToProps (selected in redux form values)
    editedAttributes: PropTypes.arrayOf(AccessShapes.AttributeConfigurationData),
    editedSingleAttribute: AccessShapes.AttributeConfigurationData,
    editedLabel: PropTypes.objectOf(PropTypes.string),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Returns label to use for attribute qualified name as parameter.
   * @param {string} qualifiedName attribute qualified name
   * @param {[*]} attributeModels available attributes models (to retrieve label)
   * @return {string} null when attribute was not found, label otherwise
   */
  static getAttributeLabel(qualifiedName, attributeModels) {
    const foundAttribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(qualifiedName,
      attributeModels)
    return foundAttribute ? foundAttribute.content.label : null
  }

  /**
   * Builds automatic label for a multiple attributes edition
   * @param {[*]} editedAtrributes edited attribtues as an array of AttributeConfigurationData
   * @param {[*]} attributeModels available attributes models (to retrieve label)
   */
  static buildAutoLabelForMultipleAttr(editedAtrributes = [], attributeModels) {
    return editedAtrributes
      ? editedAtrributes.map(({ name }) => EditItemForm.getAttributeLabel(name, attributeModels)).join(', ') : ''
  }

  /**
   * Builds automatic label for a multiple attributes edition
   * @param {*} singleEditedAttribute edited attribtues as an array of AttributeConfigurationData
   * @param {[*]} attributeModels available attributes models (to retrieve label)
   */
  static buildAutoLabelForSingleAttr(singleEditedAttribute, attributeModels) {
    const qualifiedName = get(singleEditedAttribute, 'name')
    return qualifiedName ? EditItemForm.getAttributeLabel(qualifiedName, attributeModels) : ''
  }

  /**
   * Lifecycle method: component will mount. Used here to initialize form values
   */
  componentWillMount() {
    // 1 - setup item to edit in form (when mounting, it is necessary available)
    const { initialize, editionData: { attributesList, editedElementIndex } } = this.props
    const item = attributesList[editedElementIndex]
    const initialValues = {
      order: editedElementIndex,
      ...item,
      // add the single element field for single attribute elements (it will be ignored on submit when useless)
      singleAttribute: {
        name: get(item, 'attributes[0].name', ''),
        renderer: get(item, 'attributes[0].renderer', DEFAULT_RENDERER_KEY),
      },
    }
    initialize(initialValues)
  }

  /**
   * Lifecycle method: component will receive props. Used here to update labels when they are undefined
   */
  componentWillReceiveProps = (nextProps) => {
    // check if labels should be updated: while user did not modify them, we auto update them here
    if (nextProps.allowLabel) {
      if (!isEqual(this.props.editedAttributes, nextProps.editedAttributes)
        || !isEqual(this.props.editedSingleAttribute, nextProps.editedSingleAttribute)
      ) {
        const oldAutoLabel = nextProps.allowAttributesGroups
          ? EditItemForm.buildAutoLabelForMultipleAttr(this.props.editedAttributes, nextProps.attributeModels)
          : EditItemForm.buildAutoLabelForSingleAttr(this.props.editedSingleAttribute, nextProps.attributeModels)
        const nextAutoLabel = nextProps.allowAttributesGroups
          ? EditItemForm.buildAutoLabelForMultipleAttr(nextProps.editedAttributes, nextProps.attributeModels)
          : EditItemForm.buildAutoLabelForSingleAttr(nextProps.editedSingleAttribute, nextProps.attributeModels)
        const allLangageKeys = keys(nextProps.editedLabel)

        // update each label that was not edited
        const updatedWithAutoLabel = allLangageKeys.reduce((acc, key) => {
          const editedLanguageLabel = nextProps.editedLabel[key]
          return {
            ...acc,
            [key]: editedLanguageLabel === oldAutoLabel ? nextAutoLabel : editedLanguageLabel,
          }
        }, {})

        if (!isEqual(nextProps.editedLabel, updatedWithAutoLabel)) {
          // there are some auto label to update
          nextProps.change('label', updatedWithAutoLabel)
        }
      }
    }
    // check if render should be updated after an attribute was selected. That occurs when:
    // - groups are forbidden (controlled externally otherwise)
    // - render selection is allowed (useless otherwise)
    // - state is not pristine (avoids changing model at mounting time)
    // - single attribute (binded from redux) has changed
    if (!nextProps.allowAttributesGroups && nextProps.allowRendererSelection && !nextProps.pristine
        && !isEqual(this.props.editedSingleAttribute, nextProps.editedSingleAttribute)) {
      const oldAttr = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(
        get(this.props, 'editedSingleAttribute.name'), nextProps.attributeModels)
      const nextAttr = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(
        get(nextProps, 'editedSingleAttribute.name'), nextProps.attributeModels)
      if (!isEqual(get(oldAttr, 'content.type'), get(nextAttr, 'content.type'))) {
        // Type change: reset formatter if if was set
        const oldFormatter = get(this.props, 'editedSingleAttribute.renderer')
        if (oldFormatter !== DEFAULT_RENDERER_KEY) {
          nextProps.change('singleAttribute.renderer', DEFAULT_RENDERER_KEY)
        }
      }
    }
  }


  /**
   * On submit: modify edited form values to provide attributes list as expected for
   */
  onSubmit = ({
    singleAttribute, attributes, order, ...values
  }) => {
    const { allowAttributesGroups, onConfirm } = this.props
    const newItem = {
      // when editing single attribute, push the singleAttribute field in attributes array
      attributes: allowAttributesGroups ? attributes : [singleAttribute],
      ...values,
    }
    onConfirm(newItem, order)
  }

  /**
   * Validates multiple attributes field value
   * @param {[string]} value attributes full qualified names
   */
  validateMultipleAttributesField = value => !value || !value.length
    ? 'attribute.configuration.selected.attributes.error'
    : undefined

  /**
   * Validates single attribute field value
   * @param {string} value attribute full qualified name
   * @return {string} error if any
   */
  validateSingleAttributeNameField = (value) => {
    const { attributeModels } = this.props
    // 1 - check that attribute was specified
    if (!value) {
      return ErrorTypes.REQUIRED
    }
    // 2 - check that it is a valid attribute
    const found = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(value, attributeModels)
    return found ? undefined : 'attribute.configuration.single.attribute.error'
  }

  /**
   * Formats single attribute field: jsonPath to label
   * @param {[string]} value single element value array
   * @return {string} single attribute label out of the attributes jsonPath array
   */
  formatSingleAttributeValue = (value) => {
    // format using label from attribute model when retrieved
    const { attributeModels } = this.props
    return EditItemForm.getAttributeLabel(value, attributeModels) || value
  }

  render() {
    const {
      allowLabel, allowRendererSelection, allowAttributesGroups,
      attributeModels, editionData: { attributesList, editedElementIndex },
      editedSingleAttribute, pristine, invalid, submitting, onCancel, handleSubmit,
    } = this.props
    const { intl: { formatMessage, locale }, moduleTheme: { configuration: { editDialog } } } = this.context

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} style={editDialog.formStyle}>
        {/* All fields, in scroll area */}
        <ScrollArea
          vertical
          style={editDialog.scrollableAreaStyle}
        >
          { /** 1 - Attribute selector: when groups are allowed use attributes in a field array form property.
           * That field will be used to both configure attributes and render when allowed. Otherwise,
           * configure singleAttribute through the name and renderer form values  */
            allowAttributesGroups ? (
              <FieldArray // multiple elements field
                name="attributes"
                component={MultipleAttributesFieldRender}
                attributeModels={attributeModels}
                allowRendererSelection={allowRendererSelection}
                validate={this.validateMultipleAttributesField}
                label={formatMessage({ id: 'attribute.configuration.multiple.attribute.field' })}
              />) : (
                <>
                  <Field // single element field
                    name="singleAttribute.name"
                    component={SingleAttributeFieldRender}
                    attributeModels={attributeModels}
                    validate={this.validateSingleAttributeNameField}
                    label={formatMessage({ id: 'attribute.configuration.single.attribute.field' })}
                    fullWidth
                  />
                  <Field
                    name="singleAttribute.renderer"
                    component={RenderSelectField}
                    label={formatMessage({ id: 'attribute.configuration.renderer.field' })}
                    fullWidth
                  >
                    { // render available options for current type
                      (() => {
                        if (editedSingleAttribute) {
                          const attr = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(editedSingleAttribute.name, attributeModels)
                          if (attr) {
                            const { content: { type } } = attr
                            const rendererKeys = getTypeRendererKeys(type)
                            return rendererKeys.map(key => (
                              <MenuItem
                                key={key}
                                value={key}
                                primaryText={formatMessage({ id: `attribute.configuration.renderer.${type}.${key}` })}
                              />
                            ))
                          }
                        }
                        return [ // provide a common default render option
                          <MenuItem
                            key={DEFAULT_RENDERER_KEY}
                            value={DEFAULT_RENDERER_KEY}
                            primaryText={formatMessage({ id: 'attribute.configuration.renderer.unset.default' })}
                          />,
                        ]
                      })()
                    }
                  </Field>
                </>)
          }
          {/* 2 position in columns list */}
          <Field
            name="order"
            component={RenderSelectField}
            label={formatMessage({ id: 'attribute.configuration.index.field' })}
            fullWidth
          >
            {[ // First position option
              <MenuItem
                key="first"
                value={0}
                primaryText={formatMessage({ id: 'attribute.configuration.index.first' })}
              />, // After other attribute elements option
              ...attributesList.map((attribute, index) => index === editedElementIndex
                ? null : ( // do not propose self position =)
                  <MenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index} // index is ok as list cannot change before unmount
                    value={// value is final position in table (remove this element index if it was before current attribute)
                      editedElementIndex < index ? index : index + 1
                    }
                    primaryText={formatMessage({ id: 'attribute.configuration.index.after.element' },
                      {
                        label: allowLabel
                          ? attribute.label[locale]
                          // when label is not edited, use first attribute as label (the groups should normally be forbidden)
                          : EditItemForm.getAttributeLabel(attribute.attributes[0].name, attributeModels),
                        // after element position, in a table range from 1 to N
                        index: editedElementIndex < index ? index + 1 : index + 2,
                      })}
                  />)),
            ]}
          </Field>
          {/* 3 labels */}
          <ShowableAtRender show={allowLabel}>
            <Field
              name="label.en"
              label={formatMessage({ id: 'attribute.configuration.label.en.field' })}
              fullWidth
              component={RenderTextField}
              type="text"
              validate={ValidationHelpers.required}
            />
          </ShowableAtRender>
          <ShowableAtRender show={allowLabel}>
            <Field
              name="label.fr"
              label={formatMessage({ id: 'attribute.configuration.label.fr.field' })}
              fullWidth
              component={RenderTextField}
              type="text"
              validate={ValidationHelpers.required}
            />
          </ShowableAtRender>
        </ScrollArea>
        {/* 4. form actions, outside scroll area */}
        <div style={editDialog.actionsStyle}>
          <FlatButton
            label={formatMessage({ id: 'attribute.configuration.cancel.edition' })}
            onClick={onCancel}
          />
          <FlatButton
            label={formatMessage({ id: 'attribute.configuration.confirm.edition' })}
            onClick={handleSubmit(this.onSubmit)}
            disabled={pristine || invalid || submitting}
          />
        </div>
      </form>
    )
  }
}

const formID = 'edit-attribute-list-item-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedEditedAttributes(state) {
  return {
    editedAttributes: formValuesSelector(state, 'attributes'),
    editedSingleAttribute: formValuesSelector(state, 'singleAttribute'),
    editedLabel: formValuesSelector(state, 'label'),
  }
}

export default connect(selectedEditedAttributes)(reduxForm({ form: formID })(EditItemForm))
