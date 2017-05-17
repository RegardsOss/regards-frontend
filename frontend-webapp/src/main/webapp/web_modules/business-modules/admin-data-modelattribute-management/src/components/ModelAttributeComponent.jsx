/**
 * LICENSE_PLACEHOLDER
 **/
import { ModelAttribute } from '@regardsoss/model'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'

class ModelAttributeComponent extends React.Component {

  static propTypes = {
    modelAttribute: ModelAttribute,
    handleComputationUpdate: PropTypes.func,
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
                floatingLabelText={<FormattedMessage id="modelattr.edit.computation.label" />}
                value={modelAttribute.content.mode}
                onChange={this.handleComputationChange}
              >
                <MenuItem value="GIVEN" primaryText={<FormattedMessage id="modelattr.edit.computation.GIVEN" />} />
                <MenuItem value="COMPUTED" primaryText={<FormattedMessage id="modelattr.edit.computation.COMPUTED" />} />
              </SelectField>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default ModelAttributeComponent
