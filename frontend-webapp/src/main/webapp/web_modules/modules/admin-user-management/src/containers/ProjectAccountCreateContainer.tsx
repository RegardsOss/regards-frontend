import * as React from "react"
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import { CardActionsComponent } from "@regardsoss/components"

export class ProjectAccountCreateContainer extends React.Component<any, any> {
  static contextTypes: {
    muiTheme: Object
  }
  context: any

  render (): JSX.Element {
    console.log(this.context)
    return (
      <Card
        initiallyExpanded={true}
      >
        <CardHeader
          title="Create a new user"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <TextField
            hintText="Username"
            fullWidth={true}
          /><br />
          <TextField
            hintText="Email"
            fullWidth={true}
          /><br />
          <TextField
            hintText="Username"
            fullWidth={true}
          /><br />

          <SelectField>
            <MenuItem value={1} primaryText="Custom width"/>
            <MenuItem value={2} primaryText="Every Night"/>
            <MenuItem value={3} primaryText="Weeknights"/>
            <MenuItem value={4} primaryText="Weekends"/>
            <MenuItem value={5} primaryText="Weekly"/>
          </SelectField>
        </CardText>
        <CardActionsComponent mainButtonLabel={"Toto"} />
        <CardActions >
          <FlatButton label="Create user"/>
          <FlatButton label="Cancel"/>
        </CardActions>
      </Card>
    )
  }
}

export default ProjectAccountCreateContainer
