/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { defaultTheme } from '@regardsoss/domain/access'
import { AccessShapes } from '@regardsoss/shape'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { connect } from '@regardsoss/redux'
import { ThemeActions, ThemeInstanceActions, ThemeSelectors, getCurrentTheme } from '@regardsoss/theme'
import ApplicationThemeComponent from '../components/ApplicationThemeComponent'

/**
 * React container connecting {@link ApplicationThemeComponent} to redux and providing internationalization.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ApplicationThemeContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // Set by mapStateToProps
    themeList: AccessShapes.ThemeList,
    currentTheme: AccessShapes.Theme,
    isFetching: PropTypes.bool,
    isInstance: PropTypes.bool,
    // Set by mapDispatchToProps
    fetchTheme: PropTypes.func,
    fetchThemeInstance: PropTypes.func,
    fetchThemeList: PropTypes.func,
    fetchThemeInstanceList: PropTypes.func,
    updateTheme: PropTypes.func,
    updateInstanceTheme: PropTypes.func,
    deleteTheme: PropTypes.func,
    deleteInstanceTheme: PropTypes.func,
    createTheme: PropTypes.func,
    createInstanceTheme: PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  componentDidMount() {
    if (this.props.isInstance) {
      this.props.fetchThemeInstanceList()
    } else {
      this.props.fetchThemeList()
    }
  }

  onClose = () => {
    const { params: { project } } = this.props
    const url = this.props.isInstance ? '/admin/ui/board' : `/admin/${project}/ui/board`
    browserHistory.push(url)
  }

  render() {
    const { themeList, currentTheme, isFetching } = this.props

    const createTheme = this.props.isInstance ? this.props.createInstanceTheme : this.props.createTheme
    const updateTheme = this.props.isInstance ? this.props.updateInstanceTheme : this.props.updateTheme
    const deleteTheme = this.props.isInstance ? this.props.deleteInstanceTheme : this.props.deleteTheme
    const fetchTheme = this.props.isInstance ? this.props.fetchThemeInstance : this.props.fetchTheme

    return (
      <I18nProvider messageDir="business-modules/admin-ui-theme-management/src/i18n">
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
  isInstance: AuthenticationParametersSelectors.isInstance(state),
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
