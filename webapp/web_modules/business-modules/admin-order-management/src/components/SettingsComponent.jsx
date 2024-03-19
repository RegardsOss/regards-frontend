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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CommonDomain } from '@regardsoss/domain'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import { CardActionsComponent, ClearSettingFieldButton } from '@regardsoss/components'
import {
  Field, reduxForm, RenderTextField,
  FieldsGroup,
} from '@regardsoss/form-utils'

const {
  getValue, getUpdatedSettingValue, getSetting,
  isDisabled, isDefaultValue,
} = CommonDomain.SettingsUtils

const SETTINGS = {
  APP_SUB_ORDER_DURATION: 'app_sub_order_duration',
  USER_ORDER_PARAMETERS: 'user_order_parameters',
  EXPIRATION_MAX_DURATION: 'expiration_max_duration_in_hours',
}

/**
 * SettingsComponent
 * @author Théo Lasserre
 */
export class SettingsComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    editedAppSubOrderDuration: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    editedUserOrderParameters: PropTypes.object,
    editedExpirationMaxDuration: PropTypes.number,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { initialize, settings } = this.props
    const userOrderParameters = getValue(settings, SETTINGS.USER_ORDER_PARAMETERS)
    initialize({
      [SETTINGS.APP_SUB_ORDER_DURATION]: getValue(settings, SETTINGS.APP_SUB_ORDER_DURATION),
      [SETTINGS.USER_ORDER_PARAMETERS]: {
        subOrderDuration: userOrderParameters.subOrderDuration,
        delayBeforeEmailNotification: userOrderParameters.delayBeforeEmailNotification,
      },
      [SETTINGS.EXPIRATION_MAX_DURATION]: getValue(settings, SETTINGS.EXPIRATION_MAX_DURATION),
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.APP_SUB_ORDER_DURATION]: getUpdatedSettingValue(settings, SETTINGS.APP_SUB_ORDER_DURATION, values[SETTINGS.APP_SUB_ORDER_DURATION]),
      [SETTINGS.USER_ORDER_PARAMETERS]: getUpdatedSettingValue(settings, SETTINGS.USER_ORDER_PARAMETERS, {
        subOrderDuration: parseInt(values[SETTINGS.USER_ORDER_PARAMETERS].subOrderDuration, 10),
        delayBeforeEmailNotification: parseInt(values[SETTINGS.USER_ORDER_PARAMETERS].delayBeforeEmailNotification, 10),
      }),
      [SETTINGS.EXPIRATION_MAX_DURATION]: getUpdatedSettingValue(settings, SETTINGS.EXPIRATION_MAX_DURATION, values[SETTINGS.EXPIRATION_MAX_DURATION]),
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
      submitting, pristine, invalid, editedAppSubOrderDuration,
      handleSubmit, onBack, settings, editedUserOrderParameters,
      editedExpirationMaxDuration,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { settings: { settingDiv, settingDivAlt } } } = this.context
    const isUserOrderParametersDisabled = isDisabled(settings, SETTINGS.USER_ORDER_PARAMETERS)
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'order.settings.title' })}
            subtitle={formatMessage({ id: 'order.settings.subtitle' })}
          />
          <CardText>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.APP_SUB_ORDER_DURATION)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.APP_SUB_ORDER_DURATION, editedAppSubOrderDuration)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.APP_SUB_ORDER_DURATION}
                label={formatMessage({ id: 'order.settings.field.appSubOrderDuration' })}
                component={RenderTextField}
                fullWidth
                disabled={isDisabled(settings, SETTINGS.APP_SUB_ORDER_DURATION)}
              />
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.EXPIRATION_MAX_DURATION)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.EXPIRATION_MAX_DURATION, editedExpirationMaxDuration)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.EXPIRATION_MAX_DURATION}
                label={formatMessage({ id: 'order.settings.field.orderExpirationDuration' })}
                component={RenderTextField}
                fullWidth
                disabled={isDisabled(settings, SETTINGS.EXPIRATION_MAX_DURATION)}
              />
            </div>
            <div style={settingDivAlt}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.USER_ORDER_PARAMETERS)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.USER_ORDER_PARAMETERS, editedUserOrderParameters)}
              />
              <FieldsGroup
                title={formatMessage({ id: 'order.settings.fieldgroup.userOrderParameters' })}
                clearSpaceToChildren
                spanFullWidth
              >
                <Field
                  name={`${SETTINGS.USER_ORDER_PARAMETERS}.subOrderDuration`}
                  component={RenderTextField}
                  label={formatMessage({ id: 'order.settings.fieldgroup.userOrderParameters.subOrderDuration' })}
                  fullWidth
                  disabled={isUserOrderParametersDisabled}
                />
                <Field
                  name={`${SETTINGS.USER_ORDER_PARAMETERS}.delayBeforeEmailNotification`}
                  component={RenderTextField}
                  label={formatMessage({ id: 'order.settings.fieldgroup.userOrderParameters.delayBeforeEmailNotification' })}
                  fullWidth
                  disabled={isUserOrderParametersDisabled}
                />
              </FieldsGroup>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'order.settings.action.confirm' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'order.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const formID = 'order-setttings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedAppSubOrderDuration: parseInt(formValuesSelector(state, [SETTINGS.APP_SUB_ORDER_DURATION]), 10),
    editedUserOrderParameters: formValuesSelector(state, [SETTINGS.USER_ORDER_PARAMETERS]),
    editedExpirationMaxDuration: parseInt(formValuesSelector(state, [SETTINGS.EXPIRATION_MAX_DURATION]), 10),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(SettingsComponent))
