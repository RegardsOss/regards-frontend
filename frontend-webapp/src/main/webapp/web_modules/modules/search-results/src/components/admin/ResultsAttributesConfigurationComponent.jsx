/**
 * LICENSE_PLACEHOLDER
 **/
import { map, isEqual, concat, remove, find } from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import Dialog from 'material-ui/Dialog'
import { SubmissionError } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { AttributeModel, AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
import { ConfirmDialogComponent } from '@regardsoss/components'
import AttributeConfigurationComponent from './AttributeConfigurationComponent'
import AttributeRegroupementFormComponent from './AttributeRegroupementFormComponent'
import AttributeRegroupementComponent from './AttributeRegroupementComponent'

/**
 * Component to display attributes configuration list.
 * @author Sébastien binda
 */
class ResultsAttributesConfigurationComponent extends React.Component {

  static propTypes = {
    // Available Attributes for configuration
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    // Initial configuration of the current module
    defaultAttributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    defaultAttributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Current configuration
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Redux-form function to change current form values
    changeField: React.PropTypes.func.isRequired,
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
   * At mount, check that the configuration is valid with the available attributes.
   */
  componentDidMount() {
    if (this.props.attributesConf) {
      const updatedConf = this.removeUnavailableAttributesConfiguration(this.props.attributesConf)
      if (!isEqual(updatedConf, this.props.attributesConf)) {
        this.props.changeField('conf.attributes', updatedConf)
      }
    }
  }

  /**
   * If available attributes changes, update the configuration by using the initial configuration
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (isEqual(!nextProps.selectableAttributes, this.props.selectableAttributes)) {
      // The available attributes changed. So the current configuration is no longer valid.
      if (this.props.attributesConf) {
        this.props.changeField('conf.attributes', this.removeUnavailableAttributesConfiguration(this.props.defaultAttributesConf))
      }
      if (this.props.attributesRegroupementsConf) {
        this.props.changeField('conf.attributesRegroupements', this.props.defaultAttributesRegroupementsConf)
      }
    }
  }

  /**
   * Change attribute configuration into the redux-form
   * @param attributeId
   * @param conf
   */
  onChange = (attributeId, conf) => {
    let newConf = true
    // If conf for the given attribute already exists, then update it
    let newAttributesConf = []
    if (this.props.attributesConf) {
      newAttributesConf = map(this.props.attributesConf, (attributeConf) => {
        if (attributeConf.id === attributeId) {
          newConf = false
          return conf
        }
        return attributeConf
      })
    }

    // Else add the new attribute conf
    if (newConf) {
      newAttributesConf.push(conf)
    }
    this.props.changeField('conf.attributes', newAttributesConf)
  }

  /**
   * Callback when a property of an attribute is changed
   * @param label
   * @param conf
   */
  onChangeRegroupement = (label, conf) => {
    let newConf = true
    // If conf for the given attribute already exists, then update it
    let newAttributesConf = []
    if (this.props.attributesRegroupementsConf) {
      newAttributesConf = map(this.props.attributesRegroupementsConf, (attributeConf) => {
        if (attributeConf.label === label) {
          newConf = false
          return conf
        }
        return attributeConf
      })
    }

    // Else add the new attribute conf
    if (newConf) {
      newAttributesConf.push(conf)
    }
    this.props.changeField('conf.attributesRegroupements', newAttributesConf)
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

  /**
   * Callback called by the redux-form AttributeRegroupementFormComponent to create a new attributes regroupement
   * @param values
   */
  addNewRegrp = (values) => {
    // Check if regroupement label already exists
    if (find(this.props.attributesRegroupementsConf, conf => conf.label === values.label)) {
      throw new SubmissionError({ label: this.context.intl.formatMessage({ id: 'form.attributes.regroupement.form.error.label.aleady.exists' }) })
    }
    const newAttributesConf = concat([], this.props.attributesRegroupementsConf ? this.props.attributesRegroupementsConf : [], [values])
    this.props.changeField('conf.attributesRegroupements', newAttributesConf)
    this.handleCloseDialog()
  }

  /**
   * Update given attributes configuration with avaialble attributes.
   * If configuration contains attributes that are not available, so remove theme
   */
  removeUnavailableAttributesConfiguration(attributesConf) {
    // Remove attribute configuration for unavailable attributes
    const updatedAttributesConf = concat([], attributesConf)
    remove(updatedAttributesConf, attributeConf => !find(this.props.selectableAttributes, attribute => attribute.content.id === attributeConf.id))
    return updatedAttributesConf
  }


  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      regroupementToDelete: null,
    })
  }

  handleOpenDialog = () => {
    this.setState({ newAttributeRegrpDialogOpened: true })
  }

  handleCloseDialog = () => {
    this.setState({
      editingRegroupement: null,
      newAttributeRegrpDialogOpened: false,
    })
  }

  /**
   * Callback called to remove an existing regroupement
   */
  deleteRegroupement = (regroupementConf) => {
    const newAttributesConf = concat([], this.props.attributesRegroupementsConf)
    remove(newAttributesConf, conf => conf.label === regroupementConf.label)
    this.props.changeField('conf.attributesRegroupements', newAttributesConf)
  }

  openDeleteDialog = (regroupementToDelete) => {
    this.setState({
      deleteDialogOpened: true,
      regroupementToDelete,
    })
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
          onDelete={() => {
            this.deleteRegroupement(this.state.regroupementToDelete)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      )
    }
    return null
  }

  render() {
    // TODO Manage standard attributes
    return (
      <div>
        {this.renderConfirmDeleteDialog()}
        {this.renderNewAttributeRegrpDialog()}
        <RaisedButton
          label={<FormattedMessage id="form.attributes.regroupement.form.add.regroupement.button" />}
          secondary
          onTouchTap={this.handleOpenDialog}
        />
        <div>
          <Subheader><FormattedMessage id="form.attributes.regroupement.section.title" /></Subheader>
          <div
            style={{
              display: 'flex',
            }}
          >
            {map(this.props.attributesRegroupementsConf, regroupement => (
              <AttributeRegroupementComponent
                key={regroupement.label}
                conf={regroupement}
                onChange={this.onChangeRegroupement}
                onEdit={this.onEditRegroupement}
                onDelete={this.openDeleteDialog}
              />))}
          </div>
          <Subheader><FormattedMessage id="form.attributes.section.title" /></Subheader>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',

            }}
          >
            {map(this.props.selectableAttributes, (selectableAttribute) => {
              // Search existing associated attribute configuration if there is one
              let conf = find(this.props.attributesConf, configuration => configuration.id === selectableAttribute.content.id)
              if (!conf) {
                conf = {
                  id: selectableAttribute.content.id,
                  visibility: false,
                  facetable: false,
                }
              }
              return (
                <AttributeConfigurationComponent
                  key={selectableAttribute.content.id}
                  attribute={selectableAttribute.content}
                  conf={conf}
                  onChange={this.onChange}
                />)
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default ResultsAttributesConfigurationComponent
