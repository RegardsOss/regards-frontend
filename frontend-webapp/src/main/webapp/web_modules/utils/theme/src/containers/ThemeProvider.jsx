/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import merge from 'lodash/merge'
import has from 'lodash/has'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { AccessShapes } from '@regardsoss/shape'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { themeActions, themeSelectors } from '../clients/ThemeClient'
import { themeInstanceActions } from '../clients/ThemeInstanceClient'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'
import defaultCustomConfiguration from '../custom/defaultCustomConfiguration'
import '../custom/reset.css'
import '../custom/main.css'
import '../custom/bootstrap_grid_100.css'
import '../custom/background.jpg'
import defaultTheme from '../model/defaultTheme'

/**
 * React HOC customizing the default Material-Ui's theme before injecting it in the context of all children tree.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ThemeProvider extends React.Component {
  static propTypes = {
    currentTheme: AccessShapes.Theme,
    isInstance: PropTypes.bool,
    fetchThemeList: PropTypes.func,
    fetchThemeInstanceList: PropTypes.func,
    dispatchSetCurrentTheme: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  /**
   * Get MuiTheme with default application custom properties
   * @param conf
   * @returns {*}
   */
  static getCustomMuiTheme(conf) {
    return merge({}, defaultCustomConfiguration, getMuiTheme(conf))
  }

  constructor(props) {
    super(props)
    this.state = {
      mergedTheme: ThemeProvider.getCustomMuiTheme(props.currentTheme.configuration),
    }
  }

  componentDidMount() {
    const { dispatchSetCurrentTheme } = this.props
    let fetchAction = this.props.fetchThemeList
    if (this.props.isInstance) {
      fetchAction = this.props.fetchThemeInstanceList
    }

    return fetchAction().then((actionResult) => {
      // Init the current theme from the new list
      let activeTheme = defaultTheme
      if (has(actionResult, 'payload.entities.theme')) {
        activeTheme = find(actionResult.payload.entities.theme, theme => theme.content.active) || defaultTheme
      }
      this.setState({
        mergedTheme: ThemeProvider.getCustomMuiTheme(activeTheme.content.configuration),
      })
      return dispatchSetCurrentTheme(activeTheme.content.id)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { currentTheme } = this.props

    // Recompute the merged theme when the current theme has changed
    if (!isEqual(nextProps.currentTheme, currentTheme)) {
      this.setState({
        mergedTheme: ThemeProvider.getCustomMuiTheme(nextProps.currentTheme.content.configuration || defaultTheme),
      })
    }
  }

  render() {
    const { mergedTheme } = this.state
    return (
      <MuiThemeProvider muiTheme={mergedTheme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  themeList: themeSelectors.getList(state),
  currentTheme: getCurrentTheme(state),
  project: AuthenticationParametersSelectors.getProject(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})
const mapDispatchToProps = dispatch => ({
  fetchThemeList: () => dispatch(themeActions.fetchPagedEntityList(0, 100)),
  fetchThemeInstanceList: () => dispatch(themeInstanceActions.fetchPagedEntityList(0, 100)),
  dispatchSetCurrentTheme: themeId => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
