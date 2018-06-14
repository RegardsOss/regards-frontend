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
import get from 'lodash/get'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/display-control'
import { RenderTextField, RenderSelectField, Field, FieldArray, reduxForm, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'
import SingleAttributeFieldRender from '../../single/SingleAttributeFieldRender'
import MultipleAttributesFieldRender from '../../multiple/MultipleAttributesFieldRender'

/**
 * Edit item form component. It switches form parts depending on the functionnalities enabled for
 * the items list and configures the attributes selection table
 * @author Raphaël Mechali
 */
export class EditItemForm extends React.Component {
  static propTypes = {
    allowLabel: PropTypes.bool.isRequired,
    allowAttributesRegroupements: PropTypes.bool.isRequired,
    // available attribute models
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    // edition data: this dialog is visible only when it is porvided
    editionData: PropTypes.shape({
      // model. When adding a new item, it must present in this model
      attributesList: AccessShapes.AttributeListConfigurationModel.isRequired,
      editedElementIndex: PropTypes.number.isRequired,
    }),
    locale: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired, // (item: {*}, order: number) => ()
    onCancel: PropTypes.func.isRequired,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Returns label to use for attribute qualified name as parameter.
   * @param {string} qualifiedName attribute qualified name
   * @param {[*]} attributeModels attribute model
   * @return {string} null when attribute was not found, label otherwise
   */
  static getAttributeLabel(qualifiedName, attributeModels) {
    const foundAttribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(qualifiedName,
      attributeModels)
    return foundAttribute ? DamDomain.AttributeModelController.getAttributeModelFullLabel(foundAttribute) : null
  }

  componentWillMount() {
    // 1 - setup item to edit in form (when mounting, it is necessary available)
    const { initialize, editionData: { attributesList, editedElementIndex } } = this.props
    const item = attributesList[editedElementIndex]
    const initialValues = {
      order: editedElementIndex,
      ...item,
      // add the single element field for single attribute field for single attribute elements (it will be ignored if useless
      // in on submit)
      singleAttribute: get(item, 'attributes[0]', { name: '' }),
    }
    initialize(initialValues)
  }

  /**
   * On submit: modify edited form values to provide attributes list as expected for
   */
  onSubmit = ({
    singleAttribute, attributes, order, ...values
  }) => {
    const { allowAttributesRegroupements, onConfirm } = this.props
    const newItem = {
      // when editing single attribute, push the singleAttribute field in attributes array
      attributes: allowAttributesRegroupements ? attributes : [singleAttribute],
      ...values,
    }
    onConfirm(newItem, order)
  }

  /**
   * Validates multiple attributes field value
   * @param {[string]} value attributes full qualified names
   */
  validateMultipleAttributesField = (value) => {
    const { intl: { formatMessage } } = this.context
    return !value || !value.length ?
      formatMessage({ id: 'attribute.configuration.selected.attributes.error' }) :
      undefined
  }

  /**
   * Validates single attribute field value
   * @param {string} value attribute full qualified name
   * @return {string} error if any
   */
  validateSingleAttributeNameField = (value) => {
    const { attributeModels } = this.props
    const { intl: { formatMessage } } = this.context
    // 1 - check that attribute was specified
    if (!value) {
      return formatMessage({ id: ErrorTypes.REQUIRED })
    }
    // 2 - check that it is a valid attribute
    const found = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(value, attributeModels)
    return found ? undefined : formatMessage({ id: 'attribute.configuration.single.attribute.error' })
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
      allowLabel, allowAttributesRegroupements, attributeModels,
      editionData: { attributesList, editedElementIndex }, locale,
      pristine, invalid, submitting, onCancel, handleSubmit,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { editDialog } } } = this.context

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} style={editDialog.formStyle}>
        {/* 1.a labels */}
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
        {/* 1.b position in columns list */}
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
            ...attributesList.map((attribute, index) =>
              index === editedElementIndex ?
                null : ( // do not propose self position =)
                  <MenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index} // index is ok as list cannot change before unmount
                    value={// value is final position in table (remove this element index if it was before current attribute)
                      editedElementIndex < index ? index : index + 1
                    }
                    primaryText={formatMessage({ id: 'attribute.configuration.index.after.element' },
                      {
                        label: allowLabel ?
                          attribute.label[locale] :
                          // when label is not edited, use first attribute as label (the groups should normally be forbidden)
                          EditItemForm.getAttributeLabel(attribute.attributes[0], attributeModels),
                        // after element position, in a table range from 1 to N
                        index: editedElementIndex < index ? index + 1 : index + 2,
                      })}
                  />)),
          ]}
        </Field>
        { /** Field: when groups are allowed use attributes in a field array form property,
              use singleAttribute formValue otherwise  */
          allowAttributesRegroupements ? (
            <FieldArray
              name="attributes"
              component={MultipleAttributesFieldRender}
              allowMultiselection={allowAttributesRegroupements}
              attributeModels={attributeModels}
              validate={this.validateMultipleAttributesField}
              label={formatMessage({ id: 'attribute.configuration.multiple.attribute.field' })}
            />) : (
              <React.Fragment>
                {/* 1. name field */}
                <Field // single element field
                  key="field"
                  name="singleAttribute.name"
                  component={SingleAttributeFieldRender}
                  attributeModels={attributeModels}
                  format={this.formatSingleAttributeValue}
                  validate={this.validateSingleAttributeNameField}
                  label={formatMessage({ id: 'attribute.configuration.single.attribute.field' })}
                  fullWidth
                />
                {/* 2. space consumer to bottom */}
                <div key="space.consumer" style={editDialog.spaceConsumerStyle} />
              </React.Fragment>)
        }
        {/* 2. form actions */}
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
export default reduxForm({ form: 'edit-attribute-list-item-form' })(EditItemForm)
