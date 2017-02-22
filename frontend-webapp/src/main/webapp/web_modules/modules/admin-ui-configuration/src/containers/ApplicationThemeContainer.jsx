/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { browserHistory } from 'react-router'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ThemeList, defaultTheme } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { ThemeActions, ThemeSelectors, getCurrentTheme } from '@regardsoss/theme'
import ApplicationThemeComponent from '../components/theme/ApplicationThemeComponent'

/**
 * React container connecting {@link ApplicationThemeComponent} to redux and providing internationalization.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    themeList: ThemeList,
    currentTheme: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchThemeList: React.PropTypes.func,
    updateTheme: React.PropTypes.func,
    deleteTheme: React.PropTypes.func,
    createTheme: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
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

  onAdd = () => {
    console.log('add a new theme')
  }

  render() {
    const {themeList, currentTheme, isFetching, updateTheme, deleteTheme, createTheme} = this.props

    return (
      <I18nProvider messageDir="modules/admin-ui-configuration/src/i18n">
        <ApplicationThemeComponent
          themeList={themeList}
          currentTheme={currentTheme}
          isFetching={isFetching}
          onAdd={this.onAdd}
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
  updateTheme: (theme) => dispatch(ThemeActions.updateEntity(theme.content.id, theme.content)),
  deleteTheme: (theme) => dispatch(ThemeActions.deleteEntity(theme.content.id)),
  createTheme: (theme) => dispatch(ThemeActions.createEntity(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationThemeContainer)
