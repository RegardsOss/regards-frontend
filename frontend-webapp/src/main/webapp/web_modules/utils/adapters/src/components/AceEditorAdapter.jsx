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
import reduce from 'lodash/reduce'

const HeadlessAdapter = props => <div>{reduce(props, (acc, value, key) => `${acc}<br />${key}: ${value}`, '')}</div>

/**
* Ace editor adapter, to render headless instances
* Note: to reduce the bundle size, only a part of the languages and themes are imported. Please add required themes
* and languages in initialize (an error is visible when a theme or mode is not found)
* @author Raphaël Mechali
*/
class AceEditorAdapter extends React.Component {

  /** supported themes */
  static supportedThemesToImport = []

  /** supported modes */
  static supportedModesToImport = []

  static LOADED_COMPONENT = null
  /**
   * Initializes this adapter static data: loads the component or replace with headless
   * component when in headles environment
   * @param onAsyncDone on asynchronous loading done callback (not call if synchronous)
   */
  static initialize(onAsyncLoadingDone) {
    if (!AceEditorAdapter.LOADED_COMPONENT) {
      const headlessEnvironment = ['test', 'converage'].includes(process.env.NODE_ENV)
      if (headlessEnvironment) {
        // no loading, use headless replacement
        AceEditorAdapter.LOADED_COMPONENT = HeadlessAdapter
      } else {
        // load required elements
        require.ensure([], (require) => {
          AceEditorAdapter.LOADED_COMPONENT = require('react-ace').default
          // supported themes
          require('brace/theme/monokai')
          // supported language
          require('brace/mode/css')
          require('brace/mode/javascript')
          require('brace/mode/json')
          require('brace/mode/xml')
          onAsyncLoadingDone()
        })
      }
    }
  }

  static propTypes = {
    // one of the ace editor modes
    mode: PropTypes.string.isRequired,
    // one of the ace editor themes
    theme: PropTypes.string.isRequired,
    // note: any other ace editor property will be propagated to component below like
    // value: editor content
    // setOptions: editor options
    // ...
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { RenderComponent: AceEditorAdapter.LOADED_COMPONENT }
  }

  componentDidMount() {
    // check if runtime data as initialize (callback is called only when there is something new loaded)
    AceEditorAdapter.initialize(() => {
      // note: this callback can only be called after the component was mount
      this.setState({ RenderComponent: AceEditorAdapter.LOADED_COMPONENT })
    })
  }

  render() {
    const { mode, theme, ...otherEditorProps } = this.props
    const { RenderComponent } = this.state
    if (!RenderComponent) {
      return null // loading
    }
    return (
      <RenderComponent mode={mode} theme={theme} {...otherEditorProps} />
    )
  }
}
export default AceEditorAdapter
