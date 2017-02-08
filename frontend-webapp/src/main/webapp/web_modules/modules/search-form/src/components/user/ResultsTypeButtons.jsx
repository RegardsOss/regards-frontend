/**
 * LICENSE_PLACEHOLDER
 **/

import FloatingActionButton from 'material-ui/FloatingActionButton'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import { themeContextType } from '@regardsoss/theme'

/**
 * React component to display buttons to manage results visualisations
 * @author Sébastien binda
 */
class ResultsTypeButtons extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }
  render() {
    return (
      <div
        style={this.context.moduleTheme.resultsButtonsType.buttonsGroup}
      >
        <div
          style={this.context.moduleTheme.resultsButtonsType.buttons}
        >
          <FloatingActionButton style={{ marginBottom: 10 }}>
            <DatasetLibrary />
          </FloatingActionButton>
          <FloatingActionButton style={{ marginBottom: 10 }}>
            <DataLibrary />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}
export default ResultsTypeButtons
