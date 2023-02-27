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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { CommonDomain } from '@regardsoss/domain'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CommonShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { reduxForm } from '@regardsoss/form-utils'
import {
  CardActionsComponent, SettingsMapField, SettingsTextField, SettingsMainComponent,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { SETTINGS } from '../domain/settings'
import SettingDataTypesComponent from './SettingDataTypesComponent'
import dependencies from '../dependencies'

const { getValue, getUpdatedSettingValue } = CommonDomain.SettingsUtils

/**
 * @author Théo Lasserre
 */
export class SettingsComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    modelList: DataManagementShapes.ModelList,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func,
    editedStorage: PropTypes.string,
    editedSuccessExpirationInHours: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    editedDatatypes: PropTypes.object,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { settings, initialize } = this.props
    initialize({
      [SETTINGS.STORAGE]: getValue(settings, SETTINGS.STORAGE) || '',
      [SETTINGS.SUCCESS_EXPIRATION_IN_HOURS]: getValue(settings, SETTINGS.SUCCESS_EXPIRATION_IN_HOURS) || 0,
      [SETTINGS.DATATYPES]: getValue(settings, SETTINGS.DATATYPES) || {},
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.STORAGE]: getUpdatedSettingValue(settings, SETTINGS.STORAGE, values[SETTINGS.STORAGE]),
      [SETTINGS.SUCCESS_EXPIRATION_IN_HOURS]: getUpdatedSettingValue(settings, SETTINGS.SUCCESS_EXPIRATION_IN_HOURS, values[SETTINGS.SUCCESS_EXPIRATION_IN_HOURS]),
      [SETTINGS.DATATYPES]: getUpdatedSettingValue(settings, SETTINGS.DATATYPES, values[SETTINGS.DATATYPES]),
    })
  }

  render() {
    const {
      submitting, pristine, invalid, settings,
      handleSubmit, onBack, editedStorage, editedSuccessExpirationInHours,
      editedDatatypes, change, modelList,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'lta.settings.card.title' })}
            subtitle={formatMessage({ id: 'lta.settings.card.subtitle' })}
          />
          <CardText>
            <SettingsMainComponent
              settings={settings}
              change={change}
            >
              <SettingsTextField
                label={formatMessage({ id: 'lta.settings.field.storage' })}
                settingKey={SETTINGS.STORAGE}
                editedSetting={editedStorage}
                addAlternateStyle
              />
              <SettingsTextField
                label={formatMessage({ id: 'lta.settings.field.successExpirationInHours' })}
                settingKey={SETTINGS.SUCCESS_EXPIRATION_IN_HOURS}
                editedSetting={editedSuccessExpirationInHours}
                addAlternateStyle
              />
              <SettingsMapField
                label={formatMessage({ id: 'lta.settings.field.datatypes' })}
                settingKey={SETTINGS.DATATYPES}
                editedSetting={editedDatatypes}
                fieldProps={{ modelList }}
                fieldComponent={SettingDataTypesComponent}
              />
            </SettingsMainComponent>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'lta.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={dependencies.settingsDependencies}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'lta.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const formID = 'lta-settings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedStorage: formValuesSelector(state, SETTINGS.STORAGE),
    editedSuccessExpirationInHours: parseInt(formValuesSelector(state, SETTINGS.SUCCESS_EXPIRATION_IN_HOURS), 10),
    editedDatatypes: formValuesSelector(state, SETTINGS.DATATYPES),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(SettingsComponent))
