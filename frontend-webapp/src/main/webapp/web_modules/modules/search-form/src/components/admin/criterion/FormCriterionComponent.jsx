/**
 * LICENSE_PLACEHOLDER
 **/
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { CardActionsComponent, Title } from '@regardsoss/components'
import { PluginConf, PluginDefinition, AttributeModel, Container as ContainerShape } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'
import FormCriteriaComponent from './FormCriteriaComponent'

/**
 * Component to display all criterion associated to the current form
 * @author Sébastien binda
 */
class FormCriterionComponent extends React.Component {

  static propTypes = {
    // Fu,ction to update current redux-form
    changeField: PropTypes.func,
    // Default form criterion list
    defaultCriterion: PropTypes.arrayOf(PluginConf),
    // Current form criterion list
    criterion: PropTypes.arrayOf(PluginConf),
    // Current layout form
    layout: ContainerShape,
    // List of availables attributes to edit criterion configuration
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    // List of available criterion plugins
    availableCriterion: PropTypes.objectOf(PluginDefinition),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    criteriaToEdit: null,
    criteriaViewOpened: false,
  }

  /**
   * Handle action to open a new criteria edition form
   */
  handleNewCriteria = () => {
    this.setState({
      criteriaToEdit: null,
      criteriaViewOpened: true,
    })
  }

  /**
   * Handle action to close the dialog containing the criteria edition form
   */
  closeCriteriaView = () => {
    this.setState({
      criteriaViewOpened: false,
    })
  }

  getCriteriaAttributes = (criteria) => {
    const attributes = get(criteria, 'conf.attributes')
    if (!attributes) {
      return ''
    }
    return reduce(attributes, (result, attribute) => {
      const attrLabel = get(this.props.selectableAttributes[attribute], 'content.label') || attribute
      if (result !== '') {
        return `${result} - ${attrLabel}`
      }
      return attrLabel
    }, '')
  }

  /**
   * Update redux-form conf property for criterion.
   *
   * @param criteria
   */
  updateCriterion = (criteria) => {
    let criterion = []
    if (this.state.criteriaToEdit) {
      criterion = concat([], this.props.criterion)
      criterion[this.state.criteriaToEdit.idx] = criteria
    } else {
      criterion = this.props.criterion ? concat(this.props.criterion, criteria) : [criteria]
    }
    this.props.changeField('conf.criterion', criterion)
    this.closeCriteriaView()
  }

  /**
   * Handle action to edit a criteria
   * @param criteria
   * @param idx
   */
  handleEdit = (criteria, idx) => {
    this.setState({
      criteriaToEdit: {
        criteria,
        idx,
      },
      criteriaViewOpened: true,
    })
  }

  /**
   * Action to remove a criteria from the configuration
   * @param criteria
   */
  handleDelete = (criteria, idx) => {
    const criterion = filter(this.props.criterion, (crit, index) => idx !== index)
    this.props.changeField('conf.criterion', criterion)
  }

  /**
   * Reset the criterion configuration
   */
  resetCriterion = () => {
    this.props.changeField('conf.criterion', this.props.defaultCriterion)
  }

  /**
   * Rendering a row for each configured criteria
   * @returns {Array}
   */
  renderCriterionRows = () => {
    const rows = []
    if (this.props.criterion && this.props.criterion.length > 0) {
      forEach(this.props.criterion, (criteria, idx) => {
        const criteriaType = this.props.availableCriterion[criteria.pluginId]
        let label = criteria.pluginId
        if (criteriaType) {
          label = criteriaType.content.name
        }
        rows.push(
          <TableRow key={idx}>
            <TableRowColumn>{label}</TableRowColumn>
            <TableRowColumn>{this.getCriteriaAttributes(criteria)}</TableRowColumn>
            <TableRowColumn>{criteria.container}</TableRowColumn>
            <TableRowColumn>
              <IconButton onTouchTap={() => this.handleEdit(criteria, idx)}>
                <Edit />
              </IconButton>
              <IconButton onTouchTap={() => this.handleDelete(criteria, idx)}>
                <Delete />
              </IconButton>
            </TableRowColumn>
          </TableRow>,
          )
      })
    }
    return rows
  }

  render() {
    const dialogTitle = this.context.intl.formatMessage({ id: 'form.criterion.criteria.new.title' })
    return (
      <div>
        <Title
          level={3}
          label={this.context.intl.formatMessage({ id: 'form.criterion.tab.title' })}
        />
        <Table selectable={false}>
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.name' })}</TableHeaderColumn>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.attributes' })}</TableHeaderColumn>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.container' })}</TableHeaderColumn>
              <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'form.criterion.list.actions' })}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderCriterionRows()}
          </TableBody>
        </Table>
        <CardActionsComponent
          mainButtonLabel={this.context.intl.formatMessage({ id: 'form.criterion.new.button.label' })}
          mainButtonTouchTap={this.handleNewCriteria}
          secondaryButtonLabel={this.context.intl.formatMessage({ id: 'form.criterion.reset.button.label' })}
          secondaryButtonTouchTap={this.resetCriterion}
        />
        <Dialog
          title={dialogTitle}
          autoScrollBodyContent
          open={this.state.criteriaViewOpened}
        >
          <FormCriteriaComponent
            cancel={this.closeCriteriaView}
            saveCriteria={this.updateCriterion}
            criteria={this.state.criteriaToEdit ? this.state.criteriaToEdit.criteria : null}
            layout={this.props.layout}
            selectableAttributes={this.props.selectableAttributes}
            availableCriterion={this.props.availableCriterion}
          />
        </Dialog>
      </div>
    )
  }
}

export default FormCriterionComponent
