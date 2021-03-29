/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import has from 'lodash/has'
import { connect } from 'react-redux'
import { AccessShapes } from '@regardsoss/shape'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { defaultTheme } from '@regardsoss/domain/access'
import { themeActions, themeSelectors } from '../clients/ThemeClient'
import { themeInstanceActions } from '../clients/ThemeInstanceClient'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'
import '../custom/reset.css'
import '../custom/main.css'
import '../custom/font.css'
import '../custom/bootstrap_grid_100.css'
import '../custom/background.jpg'
import '../custom/animations.css'
import RegardsThemeDecorator from './RegardsThemeDecorator'
import ThemeBuilder from '../ThemeBuilder'

/**
 * React HOC fetching the theme and calling RegardsThemeDecorator to provide the theme using context to all sub elements.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
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

  state = {
    isLoading: true,
    mainTheme: {},
    alternativeTheme: {},
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
        activeTheme = find(actionResult.payload.entities.theme, (theme) => theme.content.active) || defaultTheme
      }
      this.setState({
        isLoading: false,
        mainTheme: ThemeBuilder.getPrimaryTheme(activeTheme.content.configuration),
        alternativeTheme: ThemeBuilder.getAlternativeTheme(activeTheme.content.configuration),
      })
      return dispatchSetCurrentTheme(activeTheme.content.id)
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { currentTheme } = this.props

    // Recompute the merged theme when the current theme has changed
    if (!isEqual(nextProps.currentTheme, currentTheme)) {
      this.setState({
        mainTheme: ThemeBuilder.getPrimaryTheme(nextProps.currentTheme.content.configuration),
        alternativeTheme: ThemeBuilder.getAlternativeTheme(nextProps.currentTheme.content.configuration),
      })
    }
  }

  render() {
    const { mainTheme, alternativeTheme, isLoading } = this.state
    return (
      <RegardsThemeDecorator
        mainTheme={mainTheme}
        alternativeTheme={alternativeTheme}
      >
        {isLoading ? null : this.props.children}
      </RegardsThemeDecorator>
    )
  }
}

const mapStateToProps = (state) => ({
  themeList: themeSelectors.getList(state),
  currentTheme: getCurrentTheme(state),
  project: AuthenticationParametersSelectors.getProject(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchThemeList: () => dispatch(themeActions.fetchPagedEntityList(0, 100)),
  fetchThemeInstanceList: () => dispatch(themeInstanceActions.fetchPagedEntityList(0, 100)),
  dispatchSetCurrentTheme: (themeId) => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
