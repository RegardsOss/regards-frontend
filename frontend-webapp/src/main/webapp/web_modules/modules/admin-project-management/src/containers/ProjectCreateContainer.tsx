import * as React from "react"
import { browserHistory } from "react-router"
import { connect } from "react-redux"
import { injectTheme } from "@regardsoss/theme"
import * as actions from "../model/actions"
import { I18nProvider } from "@regardsoss/i18n"
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import { CardActionsComponent } from "@regardsoss/components"
import { Project } from "@regardsoss/models"
import { FormattedMessage } from "react-intl"

interface ProjectCreateProps {
  project: Project
  createProject?: () => void
  theme: any
}

export class ProjectCreateContainer extends React.Component<ProjectCreateProps, any> {

  handleCreate = () => {
    this.props.createProject()
    const url = "/admin/" + "cdpp" + "/projects"
    browserHistory.push(url)
  }

  render (): JSX.Element {

    return (
      <I18nProvider messageDir='modules/admin-project-management/src/i18n'>
        <Card>
          <CardTitle
            title={"Create a new project"}
            subtitle={"Add some fancy text here"}
          />
          <CardText>
            <TextField hintText="Name"/><br/>
            <TextField hintText="Description"/><br/>
            <SelectField>
              <MenuItem value={1} primaryText="Custom width"/>
              <MenuItem value={2} primaryText="Every Night"/>
              <MenuItem value={3} primaryText="Weeknights"/>
              <MenuItem value={4} primaryText="Weekends"/>
              <MenuItem value={5} primaryText="Weekly"/>
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projects.submit.button"/>}
              mainButtonTouchTap={this.handleCreate}
              secondaryButtonLabel={<FormattedMessage id="projects.cancel.button"/>}
              secondaryButtonUrl={"/admin/cpp/projects"}
            />
          </CardActions>
        </Card>
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  createProject: () => dispatch(actions.createProject())
})

let connected = connect<{}, {}, ProjectCreateProps>(null, mapDispatchToProps)(ProjectCreateContainer)
let themedAndConnected = injectTheme(connected)
export default themedAndConnected
