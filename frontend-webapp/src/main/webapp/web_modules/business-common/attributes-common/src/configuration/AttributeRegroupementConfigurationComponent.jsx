/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { SubmissionError } from 'redux-form'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import AttributeRegroupementFormComponent from './AttributeRegroupementFormComponent'
import AttributeRegroupementComponent from './AttributeRegroupementComponent'

/**
 * React component to display and configure an attribute regroupement for searc results
 * @author Sébastien binda
 */
class AttributeRegroupementConfigurationComponent extends React.Component {
  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent).isRequired,
    onChangeRegroupenentConfiguration: PropTypes.func.isRequired,
    onDeleteRegroupement: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    editingRegroupement: null,
    newAttributeRegrpDialogOpened: false,
    deleteDialogOpened: false,
    regroupementToDelete: null,
  }

  /**
   * Callback called to edit an existing regroupement
   * @param regroupementConf
   */
  onEditRegroupement = (regroupementConf) => {
    this.setState({
      newAttributeRegrpDialogOpened: true,
      editingRegroupement: regroupementConf,
    })
  }


  openDeleteDialog = (regroupementToDelete) => {
    this.setState({
      deleteDialogOpened: true,
      regroupementToDelete,
    })
  }

  /**
   * Callback called by the redux-form AttributeRegroupementFormComponent to create a new attributes regroupement
   * @param values
   */
  addNewRegrp = (values) => {
    // Check if regroupement label already exists
    if (find(this.props.attributesRegroupementsConf, { label: values.label })) {
      throw new SubmissionError({ label: this.context.intl.formatMessage({ id: 'form.attributes.regroupement.form.error.label.already.exists' }) })
    }
    this.props.onChangeRegroupenentConfiguration('conf.attributesRegroupements', values)
    this.handleCloseDialog()
  }

  handleCloseDialog = () => {
    this.setState({
      editingRegroupement: null,
      newAttributeRegrpDialogOpened: false,
    })
  }

  handleOpenDialog = () => {
    this.setState({ newAttributeRegrpDialogOpened: true })
  }


  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      regroupementToDelete: null,
    })
  }

  // Check if the given attribute regroupement label already exists in the current list of attribute regroupements
  validateLabel = (label) => {
    let error
    if (find(this.props.attributesRegroupementsConf, { label })) {
      error = 'form.attributes.regroupement.form.error.label.already.exists'
    }
    return error
  }

  /**
   * Render the new attribute regroupement form dialog
   * @returns {*}
   */
  renderNewAttributeRegrpDialog() {
    if (this.state.newAttributeRegrpDialogOpened) {
      return (
        <Dialog
          modal={false}
          open
          onRequestClose={this.handleCloseDialog}
        >
          <AttributeRegroupementFormComponent
            attributesRegrp={this.state.editingRegroupement}
            selectableAttributes={this.props.selectableAttributes}
            onClose={this.handleCloseDialog}
            onSubmit={this.addNewRegrp}
            validateLabel={this.validateLabel}
          />
        </Dialog>
      )
    }
    return null
  }

  /**
   * Render confirm delete regroupement dialog
   * @returns {*}
   */
  renderConfirmDeleteDialog = () => {
    if (this.state.deleteDialogOpened) {
      const title = this.context.intl.formatMessage({ id: 'form.attributes.delete.confirm.title' }, { name: this.state.regroupementToDelete.label })
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.onDeleteRegroupement(this.state.regroupementToDelete)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      )
    }
    return null
  }

  render = () => (
    <div>
      {this.renderNewAttributeRegrpDialog()}
      {this.renderConfirmDeleteDialog()}
      <Subheader><FormattedMessage id="form.attributes.regroupement.section.title" /></Subheader>
      <RaisedButton
        label={this.context.intl.formatMessage({ id: 'form.attributes.regroupement.form.add.regroupement.button' })}
        secondary
        onTouchTap={this.handleOpenDialog}
      />
      <div
        style={{
          display: 'flex',
        }}
      >
        {map(this.props.attributesRegroupementsConf, regroupement => (
          <AttributeRegroupementComponent
            key={regroupement.label}
            conf={regroupement}
            onChange={this.props.onChangeRegroupenentConfiguration}
            onEdit={this.onEditRegroupement}
            onDelete={this.openDeleteDialog}
          />))}
      </div>
    </div>
  )
}

export default AttributeRegroupementConfigurationComponent
