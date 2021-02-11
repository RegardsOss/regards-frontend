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
import root from 'window-or-global'
import startsWith from 'lodash/startsWith'
import { i18nContextType } from '@regardsoss/i18n'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HomeIcone from 'mdi-material-ui/Home'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { SingleContentURLDialogContainer } from '@regardsoss/components'

// Import the index.html file
require('../../html/regards-homepage.html')

/**
 * Home page module container (shows home page for a project)
 * @author Maxime Bouveron
 */
class ProjectAboutPageContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: PropTypes.shape({
      htmlPath: PropTypes.string.isRequired,
      buttonComponent: PropTypes.node,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  UNSAFE_componentWillMount = () => {
    this.setState({
      dialogOpen: !this.isProjectAboutPageHiddenCached(),
    })
  }

  onClose = () => {
    this.setState({ dialogOpen: false })
  }

  onCacheProjectAboutPageHidden = () => {
    root.localStorage.setItem(`${this.props.project}ProjectAboutPageHidden`, true)
    this.onClose()
  }

  onCacheProjectAboutPageDisplayed = () => {
    root.localStorage.setItem(`${this.props.project}ProjectAboutPageHidden`, false)
    this.onClose()
  }

  getFullPath = (path) => {
    if (path) {
      if (startsWith(path, 'http') || startsWith(path, 'wwww')) {
        return path
      } if (startsWith(path, '/')) {
        return `http://${root.location.host}${path}`
      }
      return `http://${root.location.host}/${path}`
    }
    return path
  }

  isProjectAboutPageHiddenCached = () => !!JSON.parse(root.localStorage.getItem(`${this.props.project}ProjectAboutPageHidden`))

  forceOpen = () => {
    this.setState({ dialogOpen: true })
  }

  render() {
    const { moduleConf: { htmlPath, buttonComponent } } = this.props
    const { dialogOpen } = this.state
    const {
      moduleTheme: {
        dialog: {
          heightPercent, widthPercent, button,
        },
      }, intl: { formatMessage },
    } = this.context

    // render: is there a button provided or should we used module default one?
    const runtimeButton = buttonComponent
      // use provided button with added callback
      ? React.cloneElement(buttonComponent, { onClick: this.forceOpen }) : ( // create default button
        <FloatingActionButton
          style={button}
          mini
          title={formatMessage({ id: 'module.defaault.button.tooltip' })}
          onClick={this.forceOpen}
        >
          <HomeIcone />
        </FloatingActionButton>)

    const actions = []
    actions.push(this.isProjectAboutPageHiddenCached()
      ? <FlatButton
          key="project.about.page.display"
          label={this.context.intl.formatMessage({ id: 'project.about.page.display' })}
          onClick={this.onCacheProjectAboutPageDisplayed}
      />
      : <FlatButton
          key="project.about.page.hide"
          label={this.context.intl.formatMessage({ id: 'project.about.page.hide' })}
          onClick={this.onCacheProjectAboutPageHidden}
      />,
    )
    actions.push(
      <FlatButton
        key="project.about.page.ok"
        label={this.context.intl.formatMessage({ id: 'project.about.page.ok' })}
        primary
        onClick={this.onClose}
      />,
    )
    return (
      <div>
        {runtimeButton}
        <SingleContentURLDialogContainer
          open={dialogOpen}
          contentURL={this.getFullPath(htmlPath)}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          onRequestClose={this.onClose}
          actions={actions}
        />
      </div>
    )
  }
}
export default ProjectAboutPageContainer
