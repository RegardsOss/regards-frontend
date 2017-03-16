/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { ThemeList, Theme, defaultTheme } from '@regardsoss/model'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { connect } from '@regardsoss/redux'
import { ThemeActions, ThemeInstanceActions, ThemeSelectors, getCurrentTheme } from '@regardsoss/theme'
import ApplicationThemeComponent from '../components/theme/ApplicationThemeComponent'

/**
 * React container connecting {@link ApplicationThemeComponent} to redux and providing internationalization.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ApplicationThemeContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    themeList: ThemeList,
    currentTheme: Theme,
    isFetching: React.PropTypes.bool,
    isIntance: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchTheme: React.PropTypes.func,
    fetchThemeInstance: React.PropTypes.func,
    fetchThemeList: React.PropTypes.func,
    fetchThemeInstanceList: React.PropTypes.func,
    updateTheme: React.PropTypes.func,
    updateInstanceTheme: React.PropTypes.func,
    deleteTheme: React.PropTypes.func,
    deleteInstanceTheme: React.PropTypes.func,
    createTheme: React.PropTypes.func,
    createInstanceTheme: React.PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  componentDidMount() {
    if (this.props.isIntance) {
      this.props.fetchThemeInstanceList()
    } else {
      this.props.fetchThemeList()
    }
  }

  onClose = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui-configuration/applications`
    browserHistory.push(url)
  }

  render() {
    const { themeList, currentTheme, isFetching } = this.props

    const createTheme = this.props.isIntance ? this.props.createInstanceTheme : this.props.createTheme
    const updateTheme = this.props.isIntance ? this.props.updateInstanceTheme : this.props.updateTheme
    const deleteTheme = this.props.isIntance ? this.props.deleteInstanceTheme : this.props.deleteTheme
    const fetchTheme = this.props.isIntance ? this.props.fetchThemeInstance : this.props.fetchTheme

    return (
      <I18nProvider messageDir="modules/admin-ui-configuration/src/i18n">
        <ApplicationThemeComponent
          themeList={themeList}
          currentTheme={currentTheme}
          isFetching={isFetching}
          onClose={this.onClose}
          onCreate={createTheme}
          onSave={updateTheme}
          onDelete={deleteTheme}
          fetchTheme={fetchTheme}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeList: ThemeSelectors.getList(state),
  currentTheme: getCurrentTheme(state),
  isFetching: ThemeSelectors.isFetching(state),
  isIntance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTheme: themeId => dispatch(ThemeActions.fetchEntity(themeId)),
  fetchThemeInstance: themeId => dispatch(ThemeInstanceActions.fetchEntity(themeId)),
  fetchThemeList: () => dispatch(ThemeActions.fetchPagedEntityList(0, 100)),
  fetchThemeInstanceList: () => dispatch(ThemeInstanceActions.fetchPagedEntityList(0, 100)),
  updateTheme: theme => dispatch(ThemeActions.updateEntity(theme.content.id, theme.content)),
  updateInstanceTheme: theme => dispatch(ThemeInstanceActions.updateEntity(theme.content.id, theme.content)),
  deleteTheme: theme => dispatch(ThemeActions.deleteEntity(theme.content.id)),
  deleteInstanceTheme: theme => dispatch(ThemeInstanceActions.deleteEntity(theme.content.id)),
  createTheme: theme => dispatch(ThemeActions.createEntity(theme.content)),
  createInstanceTheme: theme => dispatch(ThemeInstanceActions.createEntity(theme.content)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationThemeContainer)
