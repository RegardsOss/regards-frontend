/**
 * LICENSE_PLACEHOLDER
 **/
import { BoardComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import applicationItems from './ApplicationsBoardItems'

/**
 * Component to display the configured board items with the file ApplicationBoardItems.
 */
class ListApplicationsComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const items = applicationItems(this.props.project, this.context.intl)
    return (
      <BoardComponent items={items} />
    )
  }
}

export default ListApplicationsComponent
