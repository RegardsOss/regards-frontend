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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender, PositionedDialog, withConfirmDialog } from '@regardsoss/components'
import { reduxForm } from '@regardsoss/form-utils'
import RemoveIcon from 'mdi-material-ui/Delete'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'mdi-material-ui/Plus'
import Pencil from 'mdi-material-ui/Pencil'
import ParametersConfigurationComponent from '../../ParametersConfigurationComponent'

export const ButtonWithConfirmDialog = withConfirmDialog(FlatButton)

/**
* Component to display dataset processing in basket
* @author Théo Lasserre
*/
export class ManageDatasetProcessingComponent extends React.Component {
    static propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      processingConfParametersObjects: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      processingConfParametersSelected: PropTypes.string,
      isProcessingConfSelectedConfigurable: PropTypes.bool.isRequired,
      onSelectedProcessingConfChanged: PropTypes.func.isRequired,
      onConfigurationDone: PropTypes.func.isRequired,
      onRemoveProcessing: PropTypes.func.isRequired,
      processBusinessId: PropTypes.string,
      disabled: PropTypes.bool.isRequired,

      // from reduxForm
      invalid: PropTypes.bool,
      handleSubmit: PropTypes.func.isRequired,
      initialize: PropTypes.func.isRequired,
    }

    static contextTypes = {
      ...themeContextType,
      ...i18nContextType,
    }

    state = {
      isManageProcessingDialogOpened: false,
    }

    openOrCloseManageProcessingDialog = () => {
      const { isManageProcessingDialogOpened } = this.state
      this.setState({
        isManageProcessingDialogOpened: !isManageProcessingDialogOpened,
      })
    }

    onSubmit = (values) => {
      const { onConfigurationDone } = this.props
      this.openOrCloseManageProcessingDialog()
      onConfigurationDone(values)
    }

    onRemove = () => {
      const { onRemoveProcessing } = this.props
      this.openOrCloseManageProcessingDialog()
      onRemoveProcessing()
    }

    renderManageDatasetProcessingDialog = () => {
      const {
        processingConfParametersObjects, processingConfParametersSelected, processBusinessId,
        onSelectedProcessingConfChanged, isProcessingConfSelectedConfigurable, initialize, handleSubmit, invalid,
      } = this.props
      const { intl: { formatMessage }, moduleTheme: { pluginServiceDialog } } = this.context

      // get selected processing conf object from processingConfParametersObjects collection
      const processingConfParametersSelectedObject = get(processingConfParametersObjects, `${processingConfParametersSelected}`, {})
      const processingLabel = get(processingConfParametersSelectedObject,'label','unknown')

      return (
        <ShowableAtRender show={this.state.isManageProcessingDialogOpened}>
          <PositionedDialog
            dialogHeightPercent={pluginServiceDialog.heightPercent}
            dialogWidthPercent={pluginServiceDialog.widthPercent}
            bodyStyle={pluginServiceDialog.commonBodyStyles}
            autoScrollBodyContent
            title={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.title' })}
            open
            modal
            actions={<>
              <ButtonWithConfirmDialog
                key="delete"
                id="delete"
                dialogTitle={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove.confirmation.title' })}
                dialogMessage={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove.confirmation.message' }, { processingLabel: processingLabel })}
                title={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove.tooltip' })}
                label={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove' })}
                icon={<RemoveIcon />}
                onClick={this.onRemove}
                disabled={isEmpty(processBusinessId)}
                style={pluginServiceDialog.removeProcessingButton}
              />
              <FlatButton
                key="cancel"
                id="cancel"
                label={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.cancel' })}
                onClick={this.openOrCloseManageProcessingDialog}
              />
              <FlatButton
                key="confirm"
                id="confirm"
                label={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.confirm' })}
                disabled={invalid}
                onClick={handleSubmit(this.onSubmit)}
                primary
                keyboardFocused
              />
            </>}
          >
            <SelectField
              floatingLabelText={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.select.label' })}
              value={processingConfParametersSelected}
              fullWidth
              onChange={onSelectedProcessingConfChanged}
            >
              {
                    map(processingConfParametersObjects, (processingConfParametersObject) => (
                      <MenuItem
                        key={processingConfParametersObject.businessId}
                        value={processingConfParametersObject.businessId}
                        primaryText={processingConfParametersObject.label}
                      />
                    ))
                }
            </SelectField>
            {
              isProcessingConfSelectedConfigurable && !isEmpty(processingConfParametersSelectedObject) ? <ParametersConfigurationComponent
                parameters={processingConfParametersSelectedObject.resolvedParameters}
                parametersValues={processingConfParametersSelectedObject.parameters}
                initialize={initialize}
              /> : null
            }
          </PositionedDialog>
        </ShowableAtRender>
      )
    }

    render() {
      const {
        disabled, processingConfParametersObjects, processBusinessId,
      } = this.props
      const { intl: { formatMessage } } = this.context

      const pLabel = !isEmpty(processBusinessId) ? get(processingConfParametersObjects,`${processBusinessId}.label`, '') : ''
      const title = !isEmpty(processBusinessId) ? 'entities.common.backend.pluginback.processing.button.edit.title' : 'entities.common.backend.pluginback.processing.button.add.title'
      const label = !isEmpty(processBusinessId) ? 'entities.common.backend.pluginback.processing.button.edit.label' : 'entities.common.backend.pluginback.processing.button.add.label'
      const icon = !isEmpty(processBusinessId) ? <Pencil /> : <AddIcon />

      return (
        <div>
          <FlatButton
            key="openDialog"
            id="openDialog"
            label={formatMessage({ id: label }, {label : pLabel})}
            title={formatMessage({ id: title })}
            icon={icon}
            disabled={disabled || isEmpty(processingConfParametersObjects)}
            onClick={this.openOrCloseManageProcessingDialog}
          />
          {!isEmpty(processingConfParametersObjects) ? this.renderManageDatasetProcessingDialog() : null}
        </div>

      )
    }
}

export default reduxForm({ form: 'backend.pluginBack.parameters.form' })(ManageDatasetProcessingComponent)
