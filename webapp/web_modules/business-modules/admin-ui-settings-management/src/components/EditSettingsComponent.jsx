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
 * REGARDS is distributed in t he hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import {
  FieldArray, Field, reduxForm, RenderTextField, ValidationHelpers, FieldsGroup, FormRow, FormPresentation, RenderCheckbox, FieldHelp,
} from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { uiSettingsActions } from '../clients/UISettingsClient'
import DocumentModelsFieldArrayComponent from './DocumentModelsFieldArrayComponent'

/**
 * Edit settings form component
 * @author Raphaël Mechali
 */
export class EditSettingsComponent extends React.Component {
  static propTypes = {
    settings: UIShapes.UISettings, // not provided when creating
    dataModelNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Required dependencies to submit settings */
  static SUBMIT_DEPENDENCIES = [
    uiSettingsActions.getDependency(RequestVerbEnum.POST), // create first
    uiSettingsActions.getDependency(RequestVerbEnum.PUT), // update
  ]

  static QUOTA_WARNING_FIELDS_VALIDATORS = [
    ValidationHelpers.required,
    ValidationHelpers.getIntegerInRangeValidator(0, Number.MAX_SAFE_INTEGER),
  ]

  /**
   * Lifecycle method: component will mount. Used here to initialize redux form values
   */
  UNSAFE_componentWillMount() {
    const { initialize, settings, dataModelNames } = this.props
    const editionSettings = settings || UIDomain.UISettingsConstants.DEFAULT_SETTINGS
    // remove previously selected data model that do not exist any longer
    const editedSettings = {
      ...editionSettings,
      documentModels: editionSettings.documentModels.filter((model) => dataModelNames.includes(model)),
      quotaWarningCount: editionSettings.quotaWarningCount.toString(),
      rateWarningCount: editionSettings.rateWarningCount.toString(),
    }
    initialize(editedSettings)
  }

  /** Form submission callback: used here to convert */
  onSubmit = (values) => {
    const { onSubmit } = this.props
    onSubmit({
      ...values,
      quotaWarningCount: parseInt(values.quotaWarningCount, 10),
      rateWarningCount: parseInt(values.rateWarningCount, 10),
    })
  }

  render() {
    const {
      dataModelNames,
      submitting, pristine, invalid,
      handleSubmit, onBack,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'ui.admin.settings.title' })}
            subtitle={formatMessage({ id: 'ui.admin.settings.subtitle' })}
          />
          <CardText>
            <FormPresentation>
              <FormRow>
                <FieldsGroup
                  title={formatMessage({ id: 'ui.admin.settings.data.presentation.title' })}
                >
                  <Field
                    name="primaryQuicklookGroup"
                    fullWidth
                    component={RenderTextField}
                    label={formatMessage({ id: 'ui.admin.settings.main.quicklook.group.key.label' })}
                    help={FieldHelp.buildDialogMessageHelp('ui.admin.settings.main.quicklook.group.key.help.message')}
                    validate={ValidationHelpers.required}
                  />
                  <Field
                    name="showVersion"
                    component={RenderCheckbox}
                    label={formatMessage({ id: 'ui.admin.settings.show.product.version.label' })}
                  />
                </FieldsGroup>
                <FieldsGroup
                  title={formatMessage({ id: 'ui.admin.settings.quota.warning.title' })}
                >
                  <Field
                    name="quotaWarningCount"
                    fullWidth
                    component={RenderTextField}
                    label={formatMessage({ id: 'ui.admin.settings.low.quota.warning.label' })}
                    help={FieldHelp.buildDialogMessageHelp('ui.admin.settings.low.quota.warning.help.message')}
                    validate={EditSettingsComponent.QUOTA_WARNING_FIELDS_VALIDATORS}
                  />
                  <Field
                    name="rateWarningCount"
                    fullWidth
                    component={RenderTextField}
                    label={formatMessage({ id: 'ui.admin.settings.low.rate.warning.label' })}
                    help={FieldHelp.buildDialogMessageHelp('ui.admin.settings.low.rate.warning.help.message')}
                    validate={EditSettingsComponent.QUOTA_WARNING_FIELDS_VALIDATORS}
                  />
                </FieldsGroup>
              </FormRow>
              <FormRow>
                <FieldsGroup
                  title={formatMessage({ id: 'ui.admin.settings.models.title' })}
                  spanFullWidth
                >
                  <FieldArray
                    name="documentModels"
                    dataModelNames={dataModelNames}
                    component={DocumentModelsFieldArrayComponent}
                  />
                </FieldsGroup>
              </FormRow>
            </FormPresentation>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'ui.admin.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={EditSettingsComponent.SUBMIT_DEPENDENCIES}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'ui.admin.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>)
  }
}
export default reduxForm({
  form: 'ui-setttings-form',
})(EditSettingsComponent)
