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
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, ClearSettingFieldButton } from '@regardsoss/components'
import { reduxForm, RenderFieldArray, FieldArray } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import dependencies from '../dependencies'

const {
  getValue, getUpdatedSettingValue, getSetting, isDefaultValue,
} = CommonDomain.SettingsUtils

export const SETTINGS = {
  SKIP_CONTENT_TYPES: 'skipContentTypes',
}

/**
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
    change: PropTypes.func,
    editedContentTypes: PropTypes.arrayOf(PropTypes.string),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { settings, initialize } = this.props
    initialize({
      [SETTINGS.SKIP_CONTENT_TYPES]: getValue(settings, SETTINGS.SKIP_CONTENT_TYPES) || [],
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.SKIP_CONTENT_TYPES]: getUpdatedSettingValue(settings, SETTINGS.SKIP_CONTENT_TYPES, values[SETTINGS.SKIP_CONTENT_TYPES]),
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
      handleSubmit, onBack, settings,
      editedContentTypes,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { settings: { settingDiv } } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'datapreparation.settings.card.title' })}
            subtitle={formatMessage({ id: 'datapreparation.settings.card.subtitle' })}
          />
          <CardText>
            <div style={settingDiv}>
              <ClearSettingFieldButton
                onClick={() => this.onClearInput(SETTINGS.SKIP_CONTENT_TYPES)}
                isDefaultValue={isDefaultValue(settings, SETTINGS.SKIP_CONTENT_TYPES, editedContentTypes)}
                addAlternateStyle
              />
              <FieldArray
                name={SETTINGS.SKIP_CONTENT_TYPES}
                fullWidth
                component={RenderFieldArray}
                canBeEmpty
                title={formatMessage({ id: 'datapreparation.settings.contentTypes.title' })}
                warningText={formatMessage({ id: 'datapreparation.settings.contentTypes.warn' })}
                alreadyExistText={formatMessage({ id: 'datapreparation.settings.contentTypes.exist' })}
                floatingLabelText={formatMessage({ id: 'datapreparation.settings.contentTypes.text' })}
              />
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'datapreparation.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={dependencies.settingsDependencies}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'datapreparation.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const formID = 'datapreparation-settings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedContentTypes: formValuesSelector(state, [SETTINGS.SKIP_CONTENT_TYPES]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(SettingsComponent))
