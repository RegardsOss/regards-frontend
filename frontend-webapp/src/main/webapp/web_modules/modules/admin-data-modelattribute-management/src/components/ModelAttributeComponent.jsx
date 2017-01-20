/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { map } from 'lodash'
import Paper from 'material-ui/Paper'
import { ModelAttribute } from '@regardsoss/model'
import ItemTypes from './ItemTypes'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class ModelAttributeComponent extends React.Component {

  static propTypes = {
    modelAttribute: ModelAttribute,
    handleComputationUpdate: React.PropTypes.func,
  }

  handleComputationChange = (event, index, value) => {
    this.props.handleComputationUpdate(value)
  };


  render() {
    const { modelAttribute } = this.props
    return (
      <Table
        selectable
      >
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
          showRowHover
        >
          <TableRow>
            <TableRowColumn>{modelAttribute.content.attribute.name}</TableRowColumn>
            <TableRowColumn>{modelAttribute.content.attribute.type}</TableRowColumn>
            <TableRowColumn>
              <SelectField
                floatingLabelText="Computation"
                value={modelAttribute.content.mode}
                onChange={this.handleComputationChange}
              >
                <MenuItem value="GIVEN" primaryText="GIVEN" />
                <MenuItem value="FROM_DESCENDANTS" primaryText="FROM_DESCENDANTS" />
                <MenuItem value="CUSTOM" primaryText="CUSTOM" />
              </SelectField>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default ModelAttributeComponent
