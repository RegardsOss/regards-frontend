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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { UIShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { FieldArray, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { uiSettingsActions } from '../clients/UISettingsClient'
import DocumentModelsFieldArrayComponent from './DocumentModelsFieldArrayComponent'

/**
 * Edit settings form component
 * @author Raphaël Mechali
 */
export class EditSettingsComponent extends React.Component {
  static propTypes = {
    settings: UIShapes.UISettings.isRequired,
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

  /**
   * Lifecycle method: component will mount. Used here to initialize redux form values
   */
  componentWillMount() {
    const { initialize, settings, dataModelNames } = this.props
    // remove previously selected data model that do not exist any longer
    const editedSettings = {
      ...settings,
      documentModels: settings.documentModels.filter(model => dataModelNames.includes(model)),
    }
    initialize(editedSettings)
  }


  render() {
    const {
      dataModelNames,
      submitting, pristine, invalid,
      handleSubmit, onBack, onSubmit,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'ui.admin.settings.title' })}
            subtitle={formatMessage({ id: 'ui.admin.settings.subtitle' })}
          />
          <CardText>
            <FieldArray
              name="documentModels"
              dataModelNames={dataModelNames}
              component={DocumentModelsFieldArrayComponent}
            />
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
