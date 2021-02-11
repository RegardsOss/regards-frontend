/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { formValueSelector } from 'redux-form'
import CircularProgress from 'material-ui/CircularProgress'
import { CardActions, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { Field, RenderSelectField, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent, FormErrorMessage } from '@regardsoss/components'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import AccessRightsEnum from './AccessRightsEnum'

/**
 * Display edit and create accessright form
 */
export class AccessRightFormComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    datasetAccessRightsToEdit: PropTypes.arrayOf(DataManagementShapes.DatasetWithAccessRight).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    selectedAccessLevel: PropTypes.oneOf(values(AccessRightsEnum.METADATA_ACCESS_ENUM)), // Binded from current redux form values (used to update visible fields)
  }

  static DEFAULT_RIGHTS = {
    accessLevel: AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS,
    dataAccessLevel: AccessRightsEnum.DATA_ACCESS_ENUM.REFUSED,
  }

  /**
   * Converts access rights as parameter into edited form values
   * @param {*} accessRight access rights (matching DataManagementShapes.AccessRightContent)
   * @return {*} corresponding form values
   */
  static toFormValues(accessRight = AccessRightFormComponent.DEFAULT_RIGHTS) {
    return {
      access: accessRight.accessLevel,
      dataAccess: accessRight.dataAccessLevel,
      dataAccessPlugin: accessRight.dataAccessPlugin,
    }
  }

  /**
   * React lifecycle method: component did mount. Used here to initialize form values
   */
  componentDidMount() {
    const { datasetAccessRightsToEdit, initialize } = this.props
    // Set to edit dataset values when only one dataset, or default values otherwise (plugins cannot be handled for all at once)
    initialize(AccessRightFormComponent.toFormValues(
      datasetAccessRightsToEdit.length === 1
        ? datasetAccessRightsToEdit[0].content.accessRight
        : AccessRightFormComponent.DEFAULT_RIGHTS))
  }

  /**
   * On submit callback
   * @param {*} formValues from redux form
   */
  onSubmit = (formValues) => {
    const { datasetAccessRightsToEdit, onSubmit } = this.props
    onSubmit(datasetAccessRightsToEdit, formValues)
  }

  isSubmitable = () => {
    const {
      submitting, isSubmitting, invalid, pristine, datasetAccessRightsToEdit,
    } = this.props
    return !isSubmitting && !submitting && !invalid && (datasetAccessRightsToEdit.length > 1 || !pristine)
  }

  render() {
    const {
      selectedAccessLevel, errorMessage, handleSubmit, onCancel, submitting, isSubmitting,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const submitDisabled = !this.isSubmitable()
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <CardText>
            {/* 1. error */}
            <FormErrorMessage>
              {errorMessage}
            </FormErrorMessage>
            {/* 2. Metadata (dataset) access level selection */}
            <Field
              className="selenium-pick-metaDataAccessLevel"
              name="access"
              fullWidth
              component={RenderSelectField}
              label={formatMessage({ id: 'accessright.form.meta.accessLevel' })}
            >
              {map(AccessRightsEnum.METADATA_ACCESS_ENUM, (value, key) => {
                const label = `accessright.form.meta.accessLevel.${value}`
                return (
                  <MenuItem
                    className={`selenium-pick-metaDataAccessLevel-${value}`}
                    value={value}
                    key={key}
                    primaryText={<FormattedMessage id={label} />}
                  />
                )
              })}
            </Field>
            {/* 3. Access plugin configuration (when meta data access level is custom) */
              selectedAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.CUSTOM_ACCESS ? (
                <Field
                  name="dataAccessPlugin"
                  component={RenderPluginField}
                  title={formatMessage({ id: 'accessright.form.dataAccessPlugin.title' })}
                  selectLabel={formatMessage({ id: 'accessright.form.dataAccessPlugin.select.label' })}
                  pluginType={DamDomain.PluginTypeEnum.DATA_OBJECT_ACCESS_FILTER}
                  defaultPluginConfLabel={`dataAccessPlugin-${Date.now()}`}
                  microserviceName={STATIC_CONF.MSERVICES.DAM}
                  hideDynamicParameterConf
                  hideGlobalParameterConf
                />) : null
            }
            {/* 4. Data access level, when metadata level is DATASET_AND_OBJECT_ACCESS or CUSTOM_ACCESS,
                  as other metadata access types prevent data access */
                  selectedAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS
                  || selectedAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.CUSTOM_ACCESS ? (
                    <Field
                      className="selenium-pick-dataAccess"
                      name="dataAccess"
                      fullWidth
                      component={RenderSelectField}
                      label={formatMessage({ id: 'accessright.form.data.accessLevel' })}
                    >
                      {map(AccessRightsEnum.DATA_ACCESS_ENUM, (value, key) => {
                        const label = `accessright.form.data.accessLevel.${value}`
                        return (
                          <MenuItem
                            className={`selenium-pick-dataAccess-${value}`}
                            value={value}
                            key={key}
                            primaryText={<FormattedMessage id={label} />}
                          />
                        )
                      })}
                    </Field>) : null
            }
          </CardText>
          {/* 5. Form actions */}
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={submitting || isSubmitting ? <CircularProgress size={30} /> : formatMessage({ id: 'accessright.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitDisabled}
              secondaryButtonLabel={formatMessage({ id: 'accessright.form.action.cancel' })}
              secondaryButtonClick={onCancel}
            />
          </CardActions>
        </div>
      </form>
    )
  }
}

/**
 * Computes error for current form values
 * @param {*} formValues as provided by redux form (keys are fields name)
 * @return {*} errors map, where key if field name and value is internationalized message key
 */
function validate(formValues) {
  const errors = {}
  if (formValues.dataAccess && formValues.dataAccess === 'CUSTOM_ACCESS' && !formValues.pluginConfiguration) {
    errors.dataAccess = 'invalid.require_plugin_configuration'
  }
  return errors
}

// prepare redux form
const formId = 'access-right-form'
const connectedReduxForm = reduxForm({
  form: formId,
  validate,
})(AccessRightFormComponent)

// export connected with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect((state) => ({
  selectedAccessLevel: selector(state, 'access'),
}))(connectedReduxForm)
