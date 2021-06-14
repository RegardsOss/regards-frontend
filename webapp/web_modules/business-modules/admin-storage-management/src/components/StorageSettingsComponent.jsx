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
  FieldsGroup, FormPresentation, FormRow, RenderSelectField,
} from '@regardsoss/form-utils'

const {
  getValue, getUpdatedSettingValue, getSetting,
  isDisabled, isDefaultValue,
} = CommonDomain.SettingsUtils

const SETTINGS = {
  STORE_FILES: 'store_files',
  STORAGE_LOCATION: 'storage_location',
  STORAGE_SUB_DIRECTORY: 'storage_subdirectory',
}

/**
 * StorageSettingsComponent
 * @author Théo Lasserre
 */
export class StorageSettingsComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
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
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { initialize, settings } = this.props
    initialize({
      [SETTINGS.STORE_FILES]: getValue(settings, SETTINGS.STORE_FILES),
      [SETTINGS.STORAGE_LOCATION]: getValue(settings, SETTINGS.STORAGE_LOCATION),
      [SETTINGS.STORAGE_SUB_DIRECTORY]: getValue(settings, SETTINGS.STORAGE_SUB_DIRECTORY),
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.STORE_FILES]: getUpdatedSettingValue(settings, SETTINGS.STORE_FILES, values[SETTINGS.STORE_FILES]),
      [SETTINGS.STORAGE_LOCATION]: getUpdatedSettingValue(settings, SETTINGS.STORAGE_LOCATION, values[SETTINGS.STORAGE_LOCATION]),
      [SETTINGS.STORAGE_SUB_DIRECTORY]: getUpdatedSettingValue(settings, SETTINGS.STORAGE_SUB_DIRECTORY, values[SETTINGS.STORAGE_SUB_DIRECTORY]),
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
      handleSubmit, onBack, storages, settings, editedStoreFiles,
      editedStorageLocation, editedStorageSubDirectory,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { settings: { settingDiv } } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'storage.settings.title' })}
            subtitle={formatMessage({ id: 'storage.settings.subtitle' })}
          />
          <CardText>
            <FormPresentation>
              <FormRow>
                <FieldsGroup
                  clearSpaceToChildren
                >
                  <div style={settingDiv}>
                    <ClearSettingFieldButton
                      onClick={() => this.onClearInput(SETTINGS.STORE_FILES)}
                      isDefaultValue={isDefaultValue(settings, SETTINGS.STORE_FILES, editedStoreFiles)}
                      addAlternateStyle
                    />
                    <Field
                      name={SETTINGS.STORE_FILES}
                      label={formatMessage({ id: 'storage.settings.field.storeFiles' })}
                      component={RenderCheckbox}
                      disabled={isDisabled(settings, SETTINGS.STORE_FILES)}
                    />
                  </div>
                  <div style={settingDiv}>
                    <ClearSettingFieldButton
                      onClick={() => this.onClearInput(SETTINGS.STORAGE_LOCATION)}
                      isDefaultValue={isDefaultValue(settings, SETTINGS.STORAGE_LOCATION, editedStorageLocation)}
                      addAlternateStyle
                    />
                    <Field
                      name={SETTINGS.STORAGE_LOCATION}
                      label={formatMessage({ id: 'storage.settings.field.storageLocation' })}
                      component={RenderSelectField}
                      fullWidth
                      disabled={isDisabled(settings, SETTINGS.STORAGE_LOCATION)}
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
                      onClick={() => this.onClearInput(SETTINGS.STORAGE_SUB_DIRECTORY)}
                      isDefaultValue={isDefaultValue(settings, SETTINGS.STORAGE_SUB_DIRECTORY, editedStorageSubDirectory)}
                      addAlternateStyle
                    />
                    <Field
                      name={SETTINGS.STORAGE_SUB_DIRECTORY}
                      component={RenderTextField}
                      label={formatMessage({ id: 'storage.settings.field.storageSubdirectory' })}
                      disabled={isDisabled(settings, SETTINGS.STORAGE_SUB_DIRECTORY)}
                      validate={ValidationHelpers.isValidAbsolutePathOrEmpty}
                    />
                  </div>
                </FieldsGroup>
              </FormRow>
            </FormPresentation>
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
    editedStoreFiles: formValuesSelector(state, [SETTINGS.STORE_FILES]),
    editedStorageLocation: formValuesSelector(state, [SETTINGS.STORAGE_LOCATION]),
    editedStorageSubDirectory: formValuesSelector(state, [SETTINGS.STORAGE_SUB_DIRECTORY]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(StorageSettingsComponent))
