
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'

export class ProjectAccountCreateContainer extends React.Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object,
  }

  render() {
    return (
      <Card
        initiallyExpanded
      >
        <CardHeader
          title="Create a new user"
          actAsExpander
          showExpandableButton
        />
        <CardText>
          <TextField
            hintText="Username"
            fullWidth
          /><br />
          <TextField
            hintText="Email"
            fullWidth
          /><br />
          <TextField
            hintText="Username"
            fullWidth
          /><br />

          <SelectField>
            <MenuItem value={1} primaryText="Custom width" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </SelectField>
        </CardText>
        <CardActionsComponent mainButtonLabel={'Toto'} />
        <CardActions >
          <FlatButton label="Create user" />
          <FlatButton label="Cancel" />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectAccountCreateContainer
