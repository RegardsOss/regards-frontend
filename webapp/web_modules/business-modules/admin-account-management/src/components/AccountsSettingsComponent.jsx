/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Clear from 'mdi-material-ui/Backspace'
import { AdminInstanceDomain, CommonDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent, ClearSettingFieldButton } from '@regardsoss/components'
import {
  RenderSelectField, Field, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'
import dependencies from '../dependencies'

const {
  getValue, getUpdatedSettingValue, getSetting, isDefaultValue,
} = CommonDomain.SettingsUtils

export const SETTINGS = {
  MODE: 'account_validation_mode',
}

/**
 * Account settings form component
 * @author Raphaël Mechali
 */
export class AccountsSettingsComponent extends React.Component {
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
    editedMode: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { settings, initialize } = this.props
    initialize({
      [SETTINGS.MODE]: getValue(settings, SETTINGS.MODE),
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.MODE]: getUpdatedSettingValue(settings, SETTINGS.MODE, values[SETTINGS.MODE]),
    })
  }

  onClearInput = (settingName) => {
    const { settings, change } = this.props
    const settingFound = getSetting(settings, settingName)
    if (settingFound) {
      change(settingName, settingFound.content.defaultValue)
    }
  }

  renderClearIcon = (settingName) => {
    const { intl: { formatMessage } } = this.context
    return (<IconButton
      tooltip={formatMessage({ id: 'oais.settings.clear' })}
    >
      <Clear onClick={() => this.onClearInput(settingName)} />
    </IconButton>)
  }

  render() {
    const {
      submitting, pristine, invalid,
      handleSubmit, onBack, settings, editedMode,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { settings: { settingDiv } } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'account.settings.title' })}
            subtitle={formatMessage({ id: 'account.settings.subtitle' })}
          />
          <CardText>
            {/* Account validation mode  */}
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.MODE)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.MODE, editedMode)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS.MODE}
                fullWidth
                component={RenderSelectField}
                validate={ValidationHelpers.required}
                label={formatMessage({ id: 'account.settings.mode.field' })}
              >
                { /* provide choice for every modes */
                map(AdminInstanceDomain.ACCOUNT_SETTINGS_MODE_ENUM, (value, key) => (
                  <MenuItem
                    key={key}
                    primaryText={formatMessage({ id: `account.settings.mode.${key}` })}
                    value={value}
                  />))
              }
              </Field>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'account.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={dependencies.settingsDependencies}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'account.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>)
  }
}

const formID = 'account-setttings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedMode: formValuesSelector(state, [SETTINGS.MODE]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(AccountsSettingsComponent))
