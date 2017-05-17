/**
 * LICENSE_PLACEHOLDER
 **/
import { BoardComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import projectItems from './BoardUIProjectItems'
import instanceItems from './BoardUIInstanceItems'

/**
 * Component to display the configured board items with the file ApplicationBoardItems.
 * @author Sébastien binda
 */
class BoardUIComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    let items = {}
    if (this.props.project) {
      items = projectItems(this.props.project, this.context.intl)
    } else {
      items = instanceItems(this.context.intl)
    }
    return (
      <BoardComponent items={items} />
    )
  }
}

export default BoardUIComponent
