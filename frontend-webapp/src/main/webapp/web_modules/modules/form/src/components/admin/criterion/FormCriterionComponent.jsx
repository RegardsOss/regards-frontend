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
import Criteria from '../../../models/criterion/Criteria'
import FormCriteriaComponent from './FormCriteriaComponent'

/**
 * Component to display all criterion associated to the current form
 */
class FormCriterionComponent extends React.Component {

  static propTypes = {
    changeField: React.PropTypes.func,
    criterion: React.PropTypes.arrayOf(Criteria),
  }

  state = {
    criteriaViewOpened: false,
  }

  renderCriterionRows = () => {
    const rows = []
    if (this.props.module && this.props.criterion && this.props.criterion.length > 0) {
      forEach(this.props.module.conf.criterion, (criteria, idx) => {
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
          />
        </Dialog>
      </div>
    )
  }
}

export default FormCriterionComponent
