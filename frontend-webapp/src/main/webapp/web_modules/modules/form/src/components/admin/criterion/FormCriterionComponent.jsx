/**
 * LICENSE_PLACEHOLDER
 **/
import {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { forEach, concat } from 'lodash'
import Dialog from 'material-ui/Dialog'
import { MainActionButtonComponent } from '@regardsoss/components'
import { PluginConf } from '@regardsoss/model'
import FormCriteriaComponent from './FormCriteriaComponent'
import { Model } from '@regardsoss/model'

/**
 * Component to display all criterion associated to the current form
 */
class FormCriterionComponent extends React.Component {

  static propTypes = {
    changeField: React.PropTypes.func,
    defaultCriterion: React.PropTypes.arrayOf(PluginConf),
    layout: React.PropTypes.string,
    selectableModels: React.PropTypes.arrayOf(Model),
  }

  state = {
    criteriaViewOpened: false,
  }

  addCriteria = (criteria) => {
    this.props.changeField('conf.criterion',
      this.props.criterion ? concat(this.props.criterion, criteria) : [criteria])
    this.closeCriteriaView()
  }

  openCriteriaView = () => {
    this.setState({
      criteriaViewOpened: true,
    })
  }

  closeCriteriaView = () => {
    this.setState({
      criteriaViewOpened: false,
    })
  }

  renderCriterionRows = () => {
    const rows = []
    if (this.props.criterion && this.props.criterion.length > 0) {
      forEach(this.props.criterion, (criteria, idx) => {
        rows.push(
          <TableRow key={idx}>
            <TableRowColumn>{criteria.type}</TableRowColumn>
            <TableRowColumn>{criteria.container}</TableRowColumn>
          </TableRow>,
        )
      })
    }
    return rows
  }

  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Container</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderCriterionRows()}
          </TableBody>
          <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableRowColumn colSpan="2" style={{ textAlign: 'right' }}>
                <MainActionButtonComponent
                  label={'Add new criteria'}
                  onTouchTap={this.openCriteriaView}
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          open={this.state.criteriaViewOpened}
        >
          <FormCriteriaComponent
            onClose={this.closeCriteriaView}
            addCriteria={this.addCriteria}
            layout={this.props.layout}
            selectableModels={this.props.selectableModels}
          />
        </Dialog>
      </div>
    )
  }
}

export default FormCriterionComponent
