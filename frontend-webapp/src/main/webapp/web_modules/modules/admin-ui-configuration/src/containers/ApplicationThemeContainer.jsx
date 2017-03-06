/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { ThemeList, Theme, defaultTheme } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { ThemeActions, ThemeSelectors, getCurrentTheme } from '@regardsoss/theme'
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
    // Set by mapDispatchToProps
    fetchThemeList: React.PropTypes.func,
    updateTheme: React.PropTypes.func,
    deleteTheme: React.PropTypes.func,
    createTheme: React.PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  componentDidMount() {
    this.props.fetchThemeList()
  }

  onClose = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui-configuration/applications`
    browserHistory.push(url)
  }

  render() {
    const { themeList, currentTheme, isFetching, updateTheme, deleteTheme, createTheme } = this.props

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
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeList: ThemeSelectors.getList(state),
  currentTheme: getCurrentTheme(state),
  isFetching: ThemeSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchThemeList: () => dispatch(ThemeActions.fetchPagedEntityList(0, 100)),
  updateTheme: theme => dispatch(ThemeActions.updateEntity(theme.content.id, theme.content)),
  deleteTheme: theme => dispatch(ThemeActions.deleteEntity(theme.content.id)),
  createTheme: theme => dispatch(ThemeActions.createEntity(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationThemeContainer)
