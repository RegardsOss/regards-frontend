/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import last from 'lodash/last'
import values from 'lodash/values'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { getFormValues } from 'redux-form'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { Field, reduxForm, ErrorTypes } from '@regardsoss/form-utils'
import { SingleAttributeFieldRender } from '@regardsoss/attributes-common'
import isEmpty from 'lodash/isEmpty'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'

/**
 * Dialog component allowing criterion configuration edition
 * @author Raphaël Mechali
 */
export class CriterionConfigurationDialogComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    criterionRow: CriteriaEditableRow, // Always provided when open. Only a criterion row with plugin metadata  and configuration (must be granted by parent!)
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    // parent callbacks
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    // from redux
    invalid: PropTypes.bool,
    editedConfiguration: PropTypes.shape({
      attributes: PropTypes.objectOf(PropTypes.string),
    }),
    // redux callbacks
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    /** Stores edition attributes for current edition session */
    editionAttributes: [],
  }

  /** Life cycle method component will receive props. Used here to initialize edition state on change */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      open, criterionRow, availableAttributes, initialize,
    } = nextProps
    if (!this.props.open && open) {
      const { pluginMetadata, configuration } = criterionRow
      // Prepare initial values for next edition session
      // gather possible attributes data at same time
      const allAttributes = [
        ...values(availableAttributes),
        ...DamDomain.AttributeModelController.standardAttributesAsModel,
      ]
      const { iV: initialAttributesValues, eA: editionAttributes } = pluginMetadata.configuration.attributes
        .reduce(({ iV, eA }, { name, description, attributeType }) => ({
          iV: { ...iV, [name]: configuration.attributes[name] || '' },
          eA: [
            ...eA, {
              name,
              description,
              attributes: allAttributes // keep available attribute for possible types only
                .filter(({ content: { type } }) => attributeType.includes(type)),
            },
          ],
        }), { iV: {}, eA: [] })
      initialize({
        attributes: initialAttributesValues,
      })
      this.setState({ editionAttributes })
    }
  }

  /** User callback: confirms configuration edition and closes dialog */
  onConfirm = () => {
    const { editedConfiguration, onConfirm } = this.props
    onConfirm(editedConfiguration)
  }

  /**
   * Validates selected value for attribute  field
   * @param {string} value selected value for field
   * @param {*} formValues
   * @param {*} props
   * @param {string} field name
   * @return {string} error message IS when there is an error <em>undefined</em> otherwise (due to
   * redux behavior with other constants)
   */
  validateAttribute = (value, formValues, props, fieldName) => {
    const { open, availableAttributes, criterionRow } = props
    if (open) {
      // A - Value must be set
      if (isEmpty(value)) {
        return ErrorTypes.REQUIRED
      }
      // B - Attribute must exist in pool
      const attrModel = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(value,
        availableAttributes)
      if (!attrModel) {
        return 'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.unknown'
      }
      // C - Finally, attribute type must match configuration expected type
      const { pluginMetadata: { configuration: { attributes } } } = criterionRow
      const fieldAttrName = last(fieldName.split('.'))
      const { attributeType } = attributes.find((attr) => attr.name === fieldAttrName)
      if (!attributeType.includes(attrModel.content.type)) {
        return 'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.invalid.type'
      }
    }
    return undefined
  }

  render() {
    const {
      invalid, open, onCancel,
    } = this.props
    const { editionAttributes } = this.state
    const { intl: { formatMessage } } = this.context
    // Dialog
    return (
      <Dialog
        title={formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.dialog.title' })}
        actions={<>
          <FlatButton
            label={formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.dialog.cancel.label' })}
            onClick={onCancel}
            key="cancel.action"
            type="submit"
          />
          <FlatButton
            key="confirm.action"
            label={formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.dialog.confirm.label' })}
            disabled={invalid}
            onClick={this.onConfirm}
            primary
          />
        </>}
        onRequestClose={onCancel}
        open={open}
        modal
      >
        <form>
          { editionAttributes.map(({ name, description, attributes }) => (
            <Field
              key={name}
              name={`attributes.${name}`}
              label={formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.field' }, {
                name,
                description: description || formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.no.description' }),
              })}
              component={SingleAttributeFieldRender}
              attributeModels={attributes}
              validate={this.validateAttribute}
              fullWidth
            />
          ))}
          <div />
        </form>
      </Dialog>
    )
  }
}

const form = 'criterion-configuration-form'
const ComponentAsForm = reduxForm({ form })(CriterionConfigurationDialogComponent)

// select edited value (to provide it to confirm callback)
const selector = getFormValues(form)
export default connect((state) => ({
  editedConfiguration: selector(state),
}))(ComponentAsForm)
