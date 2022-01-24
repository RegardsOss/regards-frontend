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
import FlatButton from 'material-ui/FlatButton'
import ColumnsSettingsIcon from 'mdi-material-ui/ViewColumn'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import ColumnsSettingsComponent from './ColumnsSettingsComponent'

/**
 * Header option to edit columns settings
 * @author Raphaël Mechali
 */
class EditColumnsSettingsComponent extends React.Component {
  static propTypes = {
    presentationModels: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel])).isRequired,
    onReset: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Initial type */
  state = {
    showDialog: false,
  }

  /**
   * User callback: user requested edition dialog to pop up
   */
  onShowEditDialog = () => this.setState({ showDialog: true })

  /**
   * On close callback
   */
  onClose = () => this.setState({ showDialog: false })

  /**
   * User callback: edition done (locally wrapped)
   * @param presentationModels presentation models as edited
   */
  onDone = (presentationModels) => {
    const { onApply } = this.props
    this.onClose()
    onApply(presentationModels)
  }

  /**
   * User callback: reset request (locally wrapped)
   */
  onResetColumns = () => {
    const { onReset } = this.props
    this.onClose()
    onReset()
  }

  render() {
    const { presentationModels } = this.props
    const { intl: { formatMessage } } = this.context
    const { showDialog } = this.state

    return (
      <>
        {/* 1. Option that will be displayed */}
        <FlatButton
          label={formatMessage({ id: 'search.results.configure.columns.option' })}
          onClick={this.onShowEditDialog}
          icon={<ColumnsSettingsIcon />}
          secondary={showDialog}
        />
        {/* 2. Dialog window */}
        <ColumnsSettingsComponent
          open={showDialog}
          presentationModels={presentationModels}
          onDone={this.onDone}
          onResetColumns={this.onResetColumns}
          onClose={this.onClose}
        />
      </>
    )
  }
}
export default EditColumnsSettingsComponent
