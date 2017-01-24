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
import { forEach, concat, filter } from 'lodash'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent } from '@regardsoss/components'
import { PluginConf, AttributeModel } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'
import FormCriteriaComponent from './FormCriteriaComponent'

/**
 * Component to display all criterion associated to the current form
 */
class FormCriterionComponent extends React.Component {

  static propTypes = {
    changeField: React.PropTypes.func,
    defaultCriterion: React.PropTypes.arrayOf(PluginConf),
    criterion: React.PropTypes.arrayOf(PluginConf),
    layout: React.PropTypes.string,
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    editingCriteria: null,
    criteriaViewOpened: false,
  }


  /**
   * Update redux-form conf property for criterion.
   *
   * @param criteria
   */
  updateCriterion = (criteria) => {
    let criterion = []
    if (this.state.editingCriteria) {
      criterion = concat([], this.props.criterion)
      criterion[this.state.editingCriteria.idx] = criteria
    } else {
      criterion = this.props.criterion ? concat(this.props.criterion, criteria) : [criteria]
    }
    this.props.changeField('conf.criterion', criterion)
    this.closeCriteriaView()
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

  /**
   * Handle action to edit a criteria
   * @param criteria
   * @param idx
   */
  handleEdit = (criteria, idx) => {
    this.setState({
      editingCriteria: {
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
    const criterion = filter(this.props.criterion, (crit, index) => {
      console.log('IDX', idx, index)
      return idx !== index
    })
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
        rows.push(
          <TableRow key={idx}>
            <TableRowColumn>{criteria.pluginId}</TableRowColumn>
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
        <Table selectable={false}>
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{<FormattedMessage id="form.criterion.list.name" />}</TableHeaderColumn>
              <TableHeaderColumn>{<FormattedMessage id="form.criterion.list.container" />}</TableHeaderColumn>
              <TableHeaderColumn>{<FormattedMessage id="form.criterion.list.actions" />}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderCriterionRows()}
          </TableBody>
        </Table>
        <CardActionsComponent
          mainButtonLabel={<FormattedMessage id="form.criterion.new.button.label" />}
          mainButtonTouchTap={this.handleNewCriteria}
          secondaryButtonLabel={<FormattedMessage id="form.criterion.reset.button.label" />}
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
            criteria={this.state.editingCriteria ? this.state.editingCriteria.criteria : null}
            layout={this.props.layout}
            selectableAttributes={this.props.selectableAttributes}
          />
        </Dialog>
      </div>
    )
  }
}

export default FormCriterionComponent
