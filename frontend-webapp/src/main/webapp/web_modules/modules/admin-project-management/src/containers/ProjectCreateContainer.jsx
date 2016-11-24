
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { injectTheme } from '@regardsoss/theme'
import { I18nProvider } from '@regardsoss/i18n'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import * as actions from '../model/ProjectActions'


export class ProjectCreateContainer extends React.Component {

  handleCreate = () => {
    this.props.createProject()
    const url = '/admin/cdpp/projects'
    browserHistory.push(url)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        <Card>
          <CardTitle
            title={'Create a new project'}
            subtitle={'Add some fancy text here'}
          />
          <CardText>
            <TextField hintText="Name" /><br />
            <TextField hintText="Description" /><br />
            <SelectField>
              <MenuItem value={1} primaryText="Custom width" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projects.submit.button" />}
              mainButtonTouchTap={this.handleCreate}
              secondaryButtonLabel={<FormattedMessage id="projects.cancel.button" />}
              secondaryButtonUrl={'/admin/cpp/projects'}
            />
          </CardActions>
        </Card>
      </I18nProvider>
    )
  }
}
ProjectCreateContainer.propTypes = {
  createProject: React.PropTypes.func.isRequired,
}
const mapDispatchToProps = dispatch => ({
  createProject: () => dispatch(actions.createProject()),
})

const connected = connect(null, mapDispatchToProps)(ProjectCreateContainer)
const themedAndConnected = injectTheme(connected)
export default themedAndConnected
