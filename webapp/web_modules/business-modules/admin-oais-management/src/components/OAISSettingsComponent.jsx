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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import { CardActionsComponent, ClearSettingFieldButton } from '@regardsoss/components'
import {
  RenderDateTimeField, Field, reduxForm, RenderTextField, ValidationHelpers, RenderCheckbox,
  FieldsGroup, FormPresentation, FormRow,
} from '@regardsoss/form-utils'
import { CommonDomain } from '@regardsoss/domain'

const {
  getValue, getUpdatedSettingValue, getSetting,
  isDisabled, isDefaultValue,
} = CommonDomain.SettingsUtils

const SETTINGS = {
  ACTIVE_NOTIFICATION: 'active_notifications',
  LAST_DUMP_REQ_DATE: 'last_dump_req_date',
  DUMP_PARAMETERS: 'dump_parameters',
}

/**
 * OAISSettingsComponent
 * @author Théo Lasserre
 */
export class OAISSettingsComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    change: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    editedActiveNotification: PropTypes.bool,
    editedLastDumpReqDate: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    editedDumpParameters: PropTypes.object,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { initialize, settings } = this.props
    const dumpParameters = getValue(settings, SETTINGS.DUMP_PARAMETERS)
    initialize({
      [SETTINGS.ACTIVE_NOTIFICATION]: getValue(settings, SETTINGS.ACTIVE_NOTIFICATION),
      [SETTINGS.DUMP_PARAMETERS]: {
        isActiveModule: dumpParameters.isActiveModule,
        cronTrigger: dumpParameters.cronTrigger,
        dumpLocation: dumpParameters.dumpLocation,
      },
      [SETTINGS.LAST_DUMP_REQ_DATE]: getValue(settings, SETTINGS.LAST_DUMP_REQ_DATE),
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.ACTIVE_NOTIFICATION]: getUpdatedSettingValue(settings, SETTINGS.ACTIVE_NOTIFICATION, values[SETTINGS.ACTIVE_NOTIFICATION]),
      [SETTINGS.DUMP_PARAMETERS]: getUpdatedSettingValue(settings, SETTINGS.DUMP_PARAMETERS, {
        isActiveModule: values[SETTINGS.DUMP_PARAMETERS].isActiveModule,
        cronTrigger: values[SETTINGS.DUMP_PARAMETERS].cronTrigger,
        dumpLocation: values[SETTINGS.DUMP_PARAMETERS].dumpLocation,
      }),
      [SETTINGS.LAST_DUMP_REQ_DATE]: getUpdatedSettingValue(settings, SETTINGS.LAST_DUMP_REQ_DATE, values[SETTINGS.LAST_DUMP_REQ_DATE]),
    })
  }

  onClearInput = (settingName) => {
    const { settings, change } = this.props
    const settingFound = getSetting(settings, settingName)
    if (settingFound) {
      change(settingName, settingFound.content.defaultValue)
    }
  }

  render() {
    const {
      submitting, pristine, invalid,
      handleSubmit, onBack, settings, editedActiveNotification,
      editedLastDumpReqDate, editedDumpParameters,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { settings: { settingDiv } } } = this.context
    const isDumpParametersDisabled = isDisabled(settings, SETTINGS.DUMP_PARAMETERS)
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'oais.settings.title' })}
            subtitle={formatMessage({ id: 'oais.settings.subtitle' })}
          />
          <CardText>
            <FormPresentation>
              <FormRow>
                <FieldsGroup
                  clearSpaceToChildren
                >
                  <div style={settingDiv}>
                    <ClearSettingFieldButton
                      onClick={() => this.onClearInput(SETTINGS.ACTIVE_NOTIFICATION)}
                      isDefaultValue={isDefaultValue(settings, SETTINGS.ACTIVE_NOTIFICATION, editedActiveNotification)}
                      addAlternateStyle
                    />
                    <Field
                      name={SETTINGS.ACTIVE_NOTIFICATION}
                      label={formatMessage({ id: 'oais.settings.field.activeNotifications' })}
                      component={RenderCheckbox}
                      fullWidth
                      disabled={isDisabled(settings, SETTINGS.ACTIVE_NOTIFICATION)}
                    />
                  </div>
                  <div style={settingDiv}>
                    <ClearSettingFieldButton
                      onClick={() => this.onClearInput(SETTINGS.LAST_DUMP_REQ_DATE)}
                      isDefaultValue={isDefaultValue(settings, SETTINGS.LAST_DUMP_REQ_DATE, editedLastDumpReqDate)}
                    />
                    <Field
                      name={SETTINGS.LAST_DUMP_REQ_DATE}
                      label={formatMessage({ id: 'oais.settings.field.lastDumpReqDate' })}
                      component={RenderDateTimeField}
                      fullWidth
                      disabled={isDisabled(settings, SETTINGS.LAST_DUMP_REQ_DATE)}
                    />
                  </div>
                </FieldsGroup>
              </FormRow>
              <FormRow>
                <div style={settingDiv}>
                  <ClearSettingFieldButton
                    onClick={() => this.onClearInput(SETTINGS.DUMP_PARAMETERS)}
                    isDefaultValue={isDefaultValue(settings, SETTINGS.DUMP_PARAMETERS, editedDumpParameters)}
                  />
                  <FieldsGroup
                    title={formatMessage({ id: 'oais.settings.fieldgroup.dumpParameters' })}
                    clearSpaceToChildren
                  >
                    <Field
                      name={`${SETTINGS.DUMP_PARAMETERS}.isActiveModule`}
                      component={RenderCheckbox}
                      label={formatMessage({ id: 'oais.settings.fieldgroup.dumpParameters.isActiveModule' })}
                      fullWidth
                      disabled={isDumpParametersDisabled}
                    />
                    <Field
                      name={`${SETTINGS.DUMP_PARAMETERS}.cronTrigger`}
                      component={RenderTextField}
                      label={formatMessage({ id: 'oais.settings.fieldgroup.dumpParameters.cronTrigger' })}
                      validate={ValidationHelpers.isValidCronExp}
                      fullWidth
                      disabled={isDumpParametersDisabled}
                    />
                    <Field
                      name={`${SETTINGS.DUMP_PARAMETERS}.dumpLocation`}
                      component={RenderTextField}
                      label={formatMessage({ id: 'oais.settings.fieldgroup.dumpParameters.dumpLocation' })}
                      validate={ValidationHelpers.isValidAbsolutePath}
                      fullWidth
                      disabled={isDumpParametersDisabled}
                    />
                  </FieldsGroup>
                </div>
              </FormRow>
            </FormPresentation>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'oais.settings.action.confirm' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'oais.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const formID = 'oais-setttings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedActiveNotification: formValuesSelector(state, [SETTINGS.ACTIVE_NOTIFICATION]),
    editedLastDumpReqDate: formValuesSelector(state, [SETTINGS.LAST_DUMP_REQ_DATE]),
    editedDumpParameters: formValuesSelector(state, [SETTINGS.DUMP_PARAMETERS]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(OAISSettingsComponent))
