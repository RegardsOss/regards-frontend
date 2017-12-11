/*
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
 */
import root from 'window-or-global'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'
import Paper from 'material-ui/Paper'
import { Field, RenderTextField, ValidationHelpers } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ModuleConfiguration from '../models/ModuleConfiguration'

const defaultHomepagePath = '/html/regards-homepage.html'

/**
 * React component to display module administration module
 *
 * @author Maxime Bouveron
 * @author Xavier-Alexandre Brochard
 */
class AdminContainer extends React.Component {

  state = {
    isLoading: false,
    path: defaultHomepagePath,
  }

  componentDidMount() {
    const path = get(this.props.adminForm, 'form.conf.htmlPath')
    if (isNil(path) || isEmpty(path)) {
      this.props.adminForm.changeField('conf.htmlPath', defaultHomepagePath)
    }
    this.startTest(null)
  }

  getFullPath = (path) => {
    if (path) {
      if (startsWith(path, 'http')) {
        return path
      } else if (startsWith(path, '/')) {
        return `${root.location.protocol}//${root.location.host}${path}`
      }
      return `${root.location.protocol}//${root.location.host}/${path}`
    }
    return path
  }

  startTest = (event) => {
    const path = this.getFullPath(get(this.props.adminForm, 'form.conf.htmlPath'))
    if (path) {
      this.setState({
        isLoading: true,
        path,
      })
      this.reloadIframe() // Force the ifram to unmount...
      setTimeout(this.stopReloadIframe, 1) // ...and immediately remount, in order to force it re-render
    }
  }

  finishTest = () => {
    this.setState({
      isLoading: false,
    })
  }

  /**
   * In order to force the iframe to unmount
   */
  reloadIframe = () => this.setState({
    reload: true,
  })

  /**
   * In order to force the iframe to mount
   */
  stopReloadIframe = () => this.setState({
    reload: false,
  })

  render() {
    const { moduleTheme, intl: { formatMessage } } = this.context
    const { path, isLoading, reload } = this.state
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Field
            name="conf.htmlPath"
            fullWidth
            component={RenderTextField}
            type="text"
            validate={ValidationHelpers.string}
            label={formatMessage({ id: 'project.about.page.admin.url' })}
          />
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            <RaisedButton
              label={formatMessage({ id: 'project.about.page.admin.test' })}
              primary
              disabled={isLoading || !path}
              onTouchTap={this.startTest}
            />
          </LoadableContentDisplayDecorator>
        </div>
        {!reload ?
          <Paper
            style={moduleTheme.iFrameWrapper}
            zDepth={isLoading ? 0 : 3}
          >
            <IFrameURLContentDisplayer
              style={moduleTheme.iFrame}
              contentURL={path}
              onContentLoaded={this.finishTest}
            />
          </Paper>
          : null}
      </div >
    )
  }
}

AdminContainer.propTypes = {
  adminForm: PropTypes.shape({
    changeField: PropTypes.func,
    // Current module configuration. Values from the redux-form
    form: PropTypes.shape({
      // Specific current module configuration for the current AdminContainer
      conf: ModuleConfiguration,
    }),
  }),
}

AdminContainer.contextTypes = {
  ...themeContextType,
  ...i18nContextType,
}

export default AdminContainer
