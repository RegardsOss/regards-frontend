import * as React from "react"
import { Card, CardTitle, CardText } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import { TableRowColumn, Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from "material-ui/Table"
import { DatasetModel } from "@regardsoss/models"
import Delete from "material-ui/svg-icons/action/delete"
import { map } from "lodash"
import FlatButton from "material-ui/FlatButton"
import Edit from "material-ui/svg-icons/editor/mode-edit"
import { CardActionsComponent } from "@regardsoss/components"


interface ModelListProps {
  getBackUrl: () => string
  getCreateUrl: () => string
  datasetModels: Array<DatasetModel>
}
/**
 */
export default class ModelListComponent extends React.Component<ModelListProps, any> {


  getCreateUrl = (): string => {
    return this.props.getCreateUrl()
  }
  getBackUrl = (): string => {
    return this.props.getBackUrl()
  }


  render (): JSX.Element {
    const {datasetModels} = this.props
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={
            <FormattedMessage
            id="datamanagement.datasetmodel.list.header"
            />
          }
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
                    id="datamanagement.datasetmodel.table.name"/>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FormattedMessage
                    id="datamanagement.datasetmodel.table.actions"/>
                </TableHeaderColumn>
                <TableHeaderColumn>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} preScanRows={false}>
              {map(datasetModels, (datasetModel: DatasetModel, id: number) => (

                <TableRow
                  key={id}>
                  <TableRowColumn>
                    {datasetModel.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    <FlatButton
                      icon={<Edit />}
                      disabled={true}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FlatButton
                      icon={<Delete />}
                      disabled={true}/>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <CardActionsComponent
            secondaryButtonUrl={this.getBackUrl()}
            secondaryButtonLabel={
              <FormattedMessage
                id="datamanagement.datasetmodel.list.action.back"
              />
            }
            mainButtonUrl={this.getCreateUrl()}
            mainButtonLabel={
              <FormattedMessage
                id="datamanagement.datasetmodel.list.action.add"
              />
            }
          />
        </CardText>
      </Card>
    )
  }
}
