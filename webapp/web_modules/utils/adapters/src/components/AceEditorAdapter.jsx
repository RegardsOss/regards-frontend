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
import reduce from 'lodash/reduce'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../styles'
// Fix underscore not visible on Ace.
import './ace.css'

const HeadlessAdapter = (props) => <div>{reduce(props, (acc, value, key) => `${acc}<br />${key}: ${value}`, '')}</div>

/**
* Ace editor adapter, to render headless instances
* Note: to reduce the bundle size, only a part of the languages and themes are imported. Please add required themes
* and languages in initialize (an error is visible when a theme or mode is not found)
* @author Raphaël Mechali
*/
export class AceEditorAdapter extends React.Component {
  /** supported themes */
  static supportedThemesToImport = []

  /** supported modes */
  static supportedModesToImport = []

  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    // one of the ace editor modes
    mode: PropTypes.string.isRequired,
    // note: any other ace editor property will be propagated to component below like
    // value: editor content
    // setOptions: editor options
    // ...
    onChange: PropTypes.func,
  }

  static editorProps = {
    $blockScrolling: Infinity,
  }

  state = { loaded: false }

  componentDidMount() {
    const headlessEnvironment = ['test', 'coverage'].includes(process.env.NODE_ENV)
    if (headlessEnvironment) {
      // no loading, use headless replacement
      this.RenderComponent = HeadlessAdapter
    } else {
      // load required elements
      require.ensure([], (require) => {
        // ace dynamically download its files when they are needed
        // we ask webpack to dispose these dependencies inside public folder
        // supported themes
        require('ace-builds/src-noconflict/theme-monokai')

        // supported languages
        require('ace-builds/src-noconflict/worker-json')
        require('ace-builds/src-noconflict/worker-css')
        require('ace-builds/src-noconflict/worker-xml')
        require('ace-builds/src-noconflict/worker-javascript')
        require('ace-builds/src-noconflict/mode-css')
        require('ace-builds/src-noconflict/mode-javascript')
        require('ace-builds/src-noconflict/mode-json')
        require('ace-builds/src-noconflict/mode-xml')
        this.RenderComponent = require('react-ace').default
        // override ace config to let it find its files
        window.ace.config.set('basePath', '/ace')
        window.ace.config.set('themePath', '/ace')
        window.ace.config.set('modePath', '/ace')
        this.setState({ loaded: true })
      })
    }
  }

  render() {
    const { mode, ...otherEditorProps } = this.props
    const { muiTheme } = this.context
    const { loaded } = this.state
    if (!loaded) {
      return null // loading
    }
    const { RenderComponent } = this
    return (
      <RenderComponent mode={mode} fontSize={14} theme={muiTheme.components.editorACE.theme} editorProps={AceEditorAdapter.editorProps} {...otherEditorProps} />
    )
  }
}

export default withModuleStyle(styles)(AceEditorAdapter)
