import * as React from "react"
import { Card, CardTitle, CardText } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import { CardActionsComponent } from "@regardsoss/components"
import { TableRowColumn, Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from "material-ui/Table"
import Delete from "material-ui/svg-icons/action/delete"
import { map } from "lodash"
import FlatButton from "material-ui/FlatButton"
import Edit from "material-ui/svg-icons/editor/mode-edit"
import { Datasource } from "@regardsoss/models"


interface DatasourceListProps {
  getBackUrl: () => string
  getCreateUrl: () => string
  datasources: Array<Datasource>
}
/**
 */
class DatasourceListComponent extends React.Component<DatasourceListProps, any> {


  getCreateUrl = (): string => {
    return this.props.getCreateUrl()
  }
  getBackUrl = (): string => {
    return this.props.getBackUrl()
  }


  render (): JSX.Element {
    const {datasources} = this.props
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={<FormattedMessage id="datamanagement.datasource.list.header"/>}
        />
        <CardText>
          <Table
            selectable={false}
            multiSelectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>
                  <FormattedMessage
                    id="datamanagement.datasource.table.name"
                  />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage
                    id="datamanagement.datasource.table.actions"
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} preScanRows={false}>
              {map(datasources, (datasource: Datasource, id: number) => (

                <TableRow
                  key={id}>
                  <TableRowColumn>
                    {datasource.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    <FlatButton icon={<Delete />} disabled={true}/>
                    <FlatButton icon={<Edit />} disabled={true}/>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <CardActionsComponent
            secondaryButtonLabel={<FormattedMessage id="datamanagement.datasource.list.action.back" />}
            secondaryButtonUrl={this.getBackUrl()}
            mainButtonLabel={<FormattedMessage id="datamanagement.datasource.list.action.add" />}
            mainButtonUrl={this.getCreateUrl()}
          />

        </CardText>
      </Card>
    )
  }
}


export default DatasourceListComponent
