/**
 * @module admin-user-management
 */
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import { map } from 'lodash'

export class ProjectAccountEditContainer extends React.Component {
  render() {
    const nbElement = 20
    const rulesList = []
    for (let i = 0; i < nbElement; i += 1) {
      rulesList.push({
        verb: i % 3 === 0 ? 'get' : 'post',
        uri: '/api/foe',
        i,
      })
    }
    return (
      <Card
        initiallyExpanded
      >
        <CardHeader
          title="User rights"
          subtitle="You can overide group rights by settings user rights for each projects."
          actAsExpander
          showExpandableButton
        />
        <CardText>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>HTTP Verb</TableHeaderColumn>
                <TableHeaderColumn>Route Name</TableHeaderColumn>
                <TableHeaderColumn>Access right</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map(rulesList, (el, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{el.verb}</TableRowColumn>
                  <TableRowColumn>{el.uri}</TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="azertyui"
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions >
          <FlatButton label="Back" />
          <FlatButton label="Save" />
        </CardActions>
      </Card>
    )
  }
}
// export default ProjectUserEditContainer;
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectAccountEditContainer)
