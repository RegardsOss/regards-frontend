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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender, PositionedDialog, withConfirmDialog } from '@regardsoss/components'
import { PluginDescriptionDialog } from '@regardsoss/microservice-plugin-configurator'
import { OrderShapes } from '@regardsoss/shape'
import { reduxForm } from '@regardsoss/form-utils'
import { UIDomain } from '@regardsoss/domain'
import WarningIcon from 'mdi-material-ui/AlertOutline'
import RemoveIcon from 'mdi-material-ui/Delete'
import IconButton from 'material-ui/IconButton'
import DetailIcon from 'mdi-material-ui/HelpCircle'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'mdi-material-ui/Plus'
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
    processingConfParametersSelected: PropTypes.object,
    isProcessingConfSelectedConfigurable: PropTypes.bool.isRequired,
    onSelectedProcessingConfChanged: PropTypes.func.isRequired,
    onConfigurationDone: PropTypes.func.isRequired,
    onRemoveProcessing: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fileSelectionDescription: OrderShapes.BasketDatasetFileSelectionDescription,
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
    isDescriptionDialogOpened: false,
    selectedPluginMetadata: null,
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

  toggleDescriptionDialog = (pluginMetadata) => {
    const { isDescriptionDialogOpened } = this.state
    this.setState({
      isDescriptionDialogOpened: !isDescriptionDialogOpened,
      selectedPluginMetadata: pluginMetadata,
    })
  }

  renderDescription = () => {
    const { isDescriptionDialogOpened, selectedPluginMetadata } = this.state
    return (
      selectedPluginMetadata ?
        <PluginDescriptionDialog
          opened={isDescriptionDialogOpened}
          onClose={() => this.toggleDescriptionDialog(selectedPluginMetadata)}
          pluginMetaData={selectedPluginMetadata.content}
          application={UIDomain.APPLICATIONS_ENUM.USER}
        /> : null)
  }

  renderManageDatasetProcessingDialog = () => {
    const {
      processingConfParametersObjects, processingConfParametersSelected, processBusinessId, fileSelectionDescription,
      onSelectedProcessingConfChanged, isProcessingConfSelectedConfigurable, initialize, handleSubmit, invalid,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { pluginServiceDialog } } = this.context
    const processingLabel = get(processingConfParametersSelected, 'label', 'unknown')
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
              dialogMessage={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove.confirmation.message' }, { processingLabel })}
              title={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove.tooltip' })}
              label={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.remove' })}
              icon={<RemoveIcon />}
              onClick={this.onRemove}
              disabled={!processBusinessId}
              style={processBusinessId ? pluginServiceDialog.removeProcessingButton : null}
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
          {
            fileSelectionDescription ? <div style={pluginServiceDialog.warningMessageStyle.mainMessageDivStyle}>
              <WarningIcon style={pluginServiceDialog.warningMessageStyle.warningIconStyle} />
              <p style={pluginServiceDialog.warningMessageStyle.messageTextStyle}>{formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.warning.message' })}</p>
            </div> : null
          }
          <div style={pluginServiceDialog.selectPluginField}>
            <SelectField
              floatingLabelText={formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.select.label' })}
              value={processingConfParametersSelected.businessId}
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
            <IconButton
              style={pluginServiceDialog.selectHelpPluginField}
              onClick={() => this.toggleDescriptionDialog(processingConfParametersSelected.pluginMetadata)}
            >
              <DetailIcon />
            </IconButton>
          </div>
          {
            processingConfParametersSelected.maxFilesInput
              ? <div style={pluginServiceDialog.maxFilesInputStyle}>
                {formatMessage({ id: 'entities.common.backend.pluginback.processing.dialog.select.maxFileInInput' }, { value: processingConfParametersSelected.maxFilesInput })}
              </div> : null
          }
          {
            isProcessingConfSelectedConfigurable && !isEmpty(processingConfParametersSelected) ? <ParametersConfigurationComponent
              parameters={processingConfParametersSelected.resolvedParameters}
              parametersValues={processingConfParametersSelected.parameters}
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
    const { intl: { formatMessage }, moduleTheme: { pluginServiceDialog } } = this.context

    const processingSelected = get(processingConfParametersObjects, `${processBusinessId}`, {})
    const pLabel = !isEmpty(processingSelected) ? get(processingSelected, 'label', '') : ''
    const title = !isEmpty(processingSelected) ? 'entities.common.backend.pluginback.processing.button.edit.title' : 'entities.common.backend.pluginback.processing.button.add.title'
    const label = !isEmpty(processingSelected) ? 'entities.common.backend.pluginback.processing.button.edit.label' : 'entities.common.backend.pluginback.processing.button.add.label'
    const icon = isEmpty(processingSelected) ? <AddIcon style={pluginServiceDialog.iconStyle} /> : null

    return (
      <div>
        <FlatButton
          key="openDialog"
          id="openDialog"
          label={formatMessage({ id: label }, { label: pLabel })}
          title={formatMessage({ id: title })}
          icon={icon}
          disabled={disabled || isEmpty(processingConfParametersObjects)}
          onClick={this.openOrCloseManageProcessingDialog}
          style={pluginServiceDialog.openButtonStyle}
          labelStyle={pluginServiceDialog.labelStyle}
        />
        {!isEmpty(processingConfParametersObjects) ? this.renderManageDatasetProcessingDialog() : null}
        {this.renderDescription()}
      </div>

    )
  }
}

export default reduxForm({ form: 'backend.pluginBack.parameters.form' })(ManageDatasetProcessingComponent)
