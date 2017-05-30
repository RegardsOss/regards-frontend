/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { SubmissionError } from 'redux-form'
import { ConfirmDialogComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { AttributesRegroupementConfiguration, AttributeModel } from '@regardsoss/model'
import AttributeRegroupementFormComponent from './AttributeRegroupementFormComponent'
import AttributeRegroupementComponent from './AttributeRegroupementComponent'

/**
 * React component to display and configure an attribute regroupement for searc results
 * @author Sébastien binda
 */
class AttributeRegroupementConfigurationComponent extends React.Component {

  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: PropTypes.objectOf(AttributeModel).isRequired,
    attributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration).isRequired,
    onChangeRegroupenentConfiguration: PropTypes.func.isRequired,
    onDeleteRegroupement: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  constructor(props) {
    super(props)
    this.state = {
      editingRegroupement: null,
      newAttributeRegrpDialogOpened: false,
      deleteDialogOpened: false,
      regroupementToDelete: null,
    }
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
          dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
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
