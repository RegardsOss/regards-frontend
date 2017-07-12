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
import root from 'window-or-global'
import startsWith from 'lodash/startsWith'
import { i18nContextType } from '@regardsoss/i18n'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HomeIcone from 'material-ui/svg-icons/action/home'
import { themeContextType } from '@regardsoss/theme'
import { SingleContentURLDialogContainer } from '@regardsoss/components'

// Import the index.html file
require('../../html/regards-homepage.html')

/**
 * Home page module container (shows home page for a project)
 * @author Maxime Bouveron
 */
class HomePageContainer extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    moduleConf: PropTypes.shape({
      htmlPath: PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  componentWillMount = () => {
    this.setState({
      dialogOpen: !this.isHomePageHiddenCached(),
    })
  }


  onClose = () => {
    this.setState({ dialogOpen: false })
  }

  onCacheHomePageHidden = () => {
    root.localStorage.setItem(`${this.props.project}HomePageHidden`, true)
    this.onClose()
  }

  onCacheHomePageDisplayed = () => {
    root.localStorage.setItem(`${this.props.project}HomePageHidden`, false)
    this.onClose()
  }

  getFullPath = (path) => {
    if (path) {
      if (startsWith(path, 'http') || startsWith(path, 'wwww')) {
        return path
      } else if (startsWith(path, '/')) {
        return `http://${root.location.host}${path}`
      }
      return `http://${root.location.host}/${path}`
    }
    return path
  }

  isHomePageHiddenCached = () => !!JSON.parse(root.localStorage.getItem(`${this.props.project}HomePageHidden`))

  forceOpen = () => {
    this.setState({ dialogOpen: true })
  }

  renderActionButtons = () => {
    const actionButtons = []
    if (this.isHomePageHiddenCached()) {
      actionButtons.push(<FlatButton
        key="homepage.display"
        label={this.context.intl.formatMessage({ id: 'homepage.display' })}
        onTouchTap={this.onCacheHomePageDisplayed}
      />)
    } else {
      actionButtons.push(<FlatButton
        key="homepage.hide"
        label={this.context.intl.formatMessage({ id: 'homepage.hide' })}
        onTouchTap={this.onCacheHomePageHidden}
      />)
    }
    actionButtons.push(<FlatButton
      key="homepage.ok"
      label={this.context.intl.formatMessage({ id: 'homepage.ok' })}
      primary
      onTouchTap={this.onClose}
    />)
    return actionButtons
  }

  render() {
    const { moduleConf: { htmlPath } } = this.props
    const { dialogOpen } = this.state
    const { dialog: { bodyStyle, heightPercent, widthPercent, button } } = this.context.moduleTheme
    return (
      <div>
        <FloatingActionButton
          style={button}
          mini
          onTouchTap={this.forceOpen}
          title="Home"
        >
          <HomeIcone />
        </FloatingActionButton>
        <SingleContentURLDialogContainer
          open={dialogOpen}
          contentURL={this.getFullPath(htmlPath)}
          loadingMessage={this.context.intl.formatMessage({ id: 'homepage.loading.message' })}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          onRequestClose={this.onClose}
          bodyStyle={bodyStyle}
          actions={this.renderActionButtons()}
        />
      </div>
    )
  }
}
export default HomePageContainer

