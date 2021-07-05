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
import map from 'lodash/map'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CommonDomain } from '@regardsoss/domain'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent, ClearSettingFieldButton } from '@regardsoss/components'
import {
  Field, reduxForm, RenderTextField, ValidationHelpers, RenderCheckbox,
  RenderSelectField,
} from '@regardsoss/form-utils'
import { SETTINGS_ENUM } from '../domain/StorageSettings'

const {
  getValue, getUpdatedSettingValue, getSetting,
  isDisabled, isDefaultValue,
} = CommonDomain.SettingsUtils

/**
 * StorageSettingsComponent
 * @author Théo Lasserre
 */
export class StorageSettingsComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
    settingsStorage: CommonShapes.SettingsList,
    storages: CommonShapes.PluginConfigurationArray.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    change: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    editedStoreFiles: PropTypes.bool,
    editedStorageLocation: PropTypes.string,
    editedStorageSubDirectory: PropTypes.string,
    editedCacheMaxSize: PropTypes.number,
    editedTenantCachePath: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { initialize, settings, settingsStorage } = this.props
    initialize({
      [SETTINGS_ENUM.STORE_FILES]: getValue(settings, SETTINGS_ENUM.STORE_FILES),
      [SETTINGS_ENUM.STORAGE_LOCATION]: getValue(settings, SETTINGS_ENUM.STORAGE_LOCATION),
      [SETTINGS_ENUM.STORAGE_SUB_DIRECTORY]: getValue(settings, SETTINGS_ENUM.STORAGE_SUB_DIRECTORY),
      [SETTINGS_ENUM.CACHE_MAX_SIZE]: getValue(settingsStorage, SETTINGS_ENUM.CACHE_MAX_SIZE),
      [SETTINGS_ENUM.TENANT_CACHE_PATH]: getValue(settingsStorage, SETTINGS_ENUM.TENANT_CACHE_PATH),
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings, settingsStorage } = this.props
    onSubmit({
      [SETTINGS_ENUM.STORE_FILES]: getUpdatedSettingValue(settings, SETTINGS_ENUM.STORE_FILES, values[SETTINGS_ENUM.STORE_FILES]),
      [SETTINGS_ENUM.STORAGE_LOCATION]: getUpdatedSettingValue(settings, SETTINGS_ENUM.STORAGE_LOCATION, values[SETTINGS_ENUM.STORAGE_LOCATION]),
      [SETTINGS_ENUM.STORAGE_SUB_DIRECTORY]: getUpdatedSettingValue(settings, SETTINGS_ENUM.STORAGE_SUB_DIRECTORY, values[SETTINGS_ENUM.STORAGE_SUB_DIRECTORY]),
      [SETTINGS_ENUM.CACHE_MAX_SIZE]: getUpdatedSettingValue(settingsStorage, SETTINGS_ENUM.CACHE_MAX_SIZE, values[SETTINGS_ENUM.CACHE_MAX_SIZE]),
      [SETTINGS_ENUM.TENANT_CACHE_PATH]: getUpdatedSettingValue(settingsStorage, SETTINGS_ENUM.TENANT_CACHE_PATH, values[SETTINGS_ENUM.TENANT_CACHE_PATH]),
    })
  }

  onClearInput = (settings, settingName) => {
    const { change } = this.props
    const settingFound = getSetting(settings, settingName)
    if (settingFound) {
      change(settingName, settingFound.content.defaultValue)
    }
  }

  render() {
    const {
      submitting, pristine, invalid, settings, settingsStorage,
      handleSubmit, onBack, storages, editedStoreFiles, editedCacheMaxSize,
      editedStorageLocation, editedStorageSubDirectory, editedTenantCachePath,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { settings: { settingDiv, settingTitleStyle, settingTitleAltStyle } } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'storage.settings.title' })}
            subtitle={formatMessage({ id: 'storage.settings.subtitle' })}
          />
          <CardText>
            <div style={settingTitleStyle}>
              {
                formatMessage({ id: 'storage.settings.fieldgroup.file.title' })
              }
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(settings, SETTINGS_ENUM.STORE_FILES)}
                isDefaultValue={isDefaultValue(settings, SETTINGS_ENUM.STORE_FILES, editedStoreFiles)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS_ENUM.STORE_FILES}
                label={formatMessage({ id: 'storage.settings.field.storeFiles' })}
                component={RenderCheckbox}
                disabled={isDisabled(settings, SETTINGS_ENUM.STORE_FILES)}
                fullWidth
              />
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(settings, SETTINGS_ENUM.STORAGE_LOCATION)}
                isDefaultValue={isDefaultValue(settings, SETTINGS_ENUM.STORAGE_LOCATION, editedStorageLocation)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS_ENUM.STORAGE_LOCATION}
                label={formatMessage({ id: 'storage.settings.field.storageLocation' })}
                component={RenderSelectField}
                fullWidth
                disabled={isDisabled(settings, SETTINGS_ENUM.STORAGE_LOCATION)}
              >
                {map(storages, (storage) => (
                  <MenuItem
                    value={get(storage, 'content.businessId')}
                    key={get(storage, 'content.businessId')}
                    primaryText={get(storage, 'content.label')}
                  />
                ))}
              </Field>
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(settings, SETTINGS_ENUM.STORAGE_SUB_DIRECTORY)}
                isDefaultValue={isDefaultValue(settings, SETTINGS_ENUM.STORAGE_SUB_DIRECTORY, editedStorageSubDirectory)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS_ENUM.STORAGE_SUB_DIRECTORY}
                component={RenderTextField}
                label={formatMessage({ id: 'storage.settings.field.storageSubdirectory' })}
                disabled={isDisabled(settings, SETTINGS_ENUM.STORAGE_SUB_DIRECTORY)}
                fullWidth
              />
            </div>
            <div style={settingTitleAltStyle}>
              {
                formatMessage({ id: 'storage.settings.fieldgroup.cache.title' })
              }
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(settingsStorage, SETTINGS_ENUM.CACHE_MAX_SIZE)}
                isDefaultValue={isDefaultValue(settingsStorage, SETTINGS_ENUM.CACHE_MAX_SIZE, editedCacheMaxSize)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS_ENUM.CACHE_MAX_SIZE}
                label={formatMessage({ id: 'storage.settings.field.cacheMaxSize' })}
                component={RenderTextField}
                disabled={isDisabled(settingsStorage, SETTINGS_ENUM.CACHE_MAX_SIZE)}
                validate={ValidationHelpers.positiveIntNumber}
                fullWidth
              />
            </div>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(settingsStorage, SETTINGS_ENUM.TENANT_CACHE_PATH)}
                isDefaultValue={isDefaultValue(settingsStorage, SETTINGS_ENUM.TENANT_CACHE_PATH, editedTenantCachePath)}
                addAlternateStyle
              />
              <Field
                name={SETTINGS_ENUM.TENANT_CACHE_PATH}
                label={formatMessage({ id: 'storage.settings.field.tenantCachePath' })}
                component={RenderTextField}
                disabled={isDisabled(settingsStorage, SETTINGS_ENUM.TENANT_CACHE_PATH)}
                fullWidth
              />
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'storage.settings.action.confirm' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'storage.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const formID = 'storage-setttings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedStoreFiles: formValuesSelector(state, [SETTINGS_ENUM.STORE_FILES]),
    editedStorageLocation: formValuesSelector(state, [SETTINGS_ENUM.STORAGE_LOCATION]),
    editedStorageSubDirectory: formValuesSelector(state, [SETTINGS_ENUM.STORAGE_SUB_DIRECTORY]),
    editedCacheMaxSize: parseInt(formValuesSelector(state, [SETTINGS_ENUM.CACHE_MAX_SIZE]), 10),
    editedTenantCachePath: formValuesSelector(state, [SETTINGS_ENUM.TENANT_CACHE_PATH]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(StorageSettingsComponent))
