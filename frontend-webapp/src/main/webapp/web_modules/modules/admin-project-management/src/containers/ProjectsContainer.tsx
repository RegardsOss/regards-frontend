import * as React from "react"
import { browserHistory } from "react-router"
import { connect } from "react-redux"
import { injectTheme } from "@regardsoss/theme"
import * as actions from "../model/actions"
import { I18nProvider } from "@regardsoss/i18n"
import { map } from "lodash"
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { FormattedMessage } from "react-intl"
import IconButton from "material-ui/IconButton"
import Edit from "material-ui/svg-icons/editor/mode-edit"
import Delete from "material-ui/svg-icons/action/delete"
import { CardActionsComponent } from "@regardsoss/components"
import Camera from "material-ui/svg-icons/image/camera"
import { Project } from "@regardsoss/models"

interface ProjectsProps {
  projects: Array<Project>
  fetchProjects?: () => void
  deleteProject?: (id: string) => void
  createProject?: () => void
  theme: any
}

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class ProjectsContainer extends React.Component<ProjectsProps, any> {

  componentWillMount (): any {
    this.props.fetchProjects()
  }

  handleView = (selectedRows: number[] | string) => {
    if (selectedRows instanceof String)
      throw new Error('Only a single row should be selected in the table')
    if (selectedRows instanceof Array && selectedRows.length !== 1)
      throw new Error('Exactly one row is expected to be selected in the table')

    const project = this.props.projects[selectedRows[0]]
    const url = "/admin/" + "cdpp" + "/projects/" + project.projectId // Todo
    browserHistory.push(url)
  }

  handleEdit = () => {
    console.log("Todo")
  }

  handleDelete = (id: string) => {
    this.props.deleteProject(id)
  }

  render (): JSX.Element {

    return (
      <I18nProvider messageDir='modules/admin-project-management/src/i18n'>
        <Card>
          <CardTitle
            title={<FormattedMessage id='projects.title'/>}
            subtitle={<FormattedMessage id='projects.subtitle'/>}
          />
          <CardText>
            <Table
              selectable={true}
              onRowSelection={this.handleView}
            >
              <TableHeader
                enableSelectAll={false}
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn><FormattedMessage id="projects.table.icon.label"/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id='projects.table.name.label'/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id='projects.table.description.label'/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id='projects.table.isPublic.label'/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id='projects.table.actions.label'/></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                preScanRows={false}
                showRowHover={true}
              >
                {map(this.props.projects, (project: Project, i: number) => (
                  <TableRow key={i}>
                    <TableRowColumn><Camera/></TableRowColumn>
                    <TableRowColumn>{project.name}</TableRowColumn>
                    <TableRowColumn>{project.description}</TableRowColumn>
                    <TableRowColumn>{project.isPublic}</TableRowColumn>
                    <TableRowColumn>
                      <IconButton onTouchTap={this.handleEdit}>
                        <Edit hoverColor={this.props.theme.palette.primary1Color}/>
                      </IconButton>
                      <IconButton onTouchTap={() => this.handleDelete(project.projectId)}>
                        <Delete hoverColor={this.props.theme.palette.accent1Color}/>
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projects.add.button.title"/>}
              mainButtonUrl={"/admin/cpp/projects/create"}
            />
          </CardActions>
        </Card>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  projects: null as any
})
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: () => dispatch(actions.fetchProjects()),
  deleteProject: (id: string) => dispatch(actions.deleteProject(id)),
  createProject: () => dispatch(actions.createProject())
})

let connected = connect<{}, {}, ProjectsProps>(mapStateToProps, mapDispatchToProps)(ProjectsContainer)
let themedAndConnected = injectTheme(connected)
export default themedAndConnected

