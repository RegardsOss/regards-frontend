/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ThemeList, defaultTheme } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { ThemeActions, ThemeSelectors, getCurrentTheme } from '@regardsoss/theme'
import ApplicationThemeComponent from '../components/ApplicationThemeComponent'

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

  onSave = (theme) => {
    console.log('updating the theme')
  }

  /**
   * Navigate back when clicking on close button
   */
  onClose = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui-configuration/applications`
    browserHistory.push(url)
  }

  onAdd = () => {
    console.log('add a new theme')
  }

  render() {
    const {themeList, currentTheme, isFetching} = this.props

    return (
      <I18nProvider messageDir="modules/admin-ui-configuration/src/i18n">
        <ApplicationThemeComponent
          themeList={themeList}
          currentTheme={currentTheme}
          isFetching={isFetching}
          onAdd={this.onAdd}
          onClose={this.onClose}
          onSave={this.onSave}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationThemeContainer)
