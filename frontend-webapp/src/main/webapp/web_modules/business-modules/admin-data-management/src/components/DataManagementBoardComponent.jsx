/**
 * LICENSE_PLACEHOLDER
 **/
import { BoardComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import dataManagementItems from './DataManagementBoardItems'

/**
 * Board to display datamangement module foncionalities.
 */
class DataManagementBoard extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { project } = this.props
    const items = dataManagementItems(project, this.context.intl)
    return (
      <BoardComponent items={items} />
    )
  }
}

export default DataManagementBoard
