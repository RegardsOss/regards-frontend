/**
 * LICENSE_PLACEHOLDER
 **/
import { BoardComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import microserviceBoardItems from './MicroserviceBoardItems'

/**
 * React component displaying the configurable microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
class MicroserviceBoardComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    maintenance: React.PropTypes.objectOf(React.PropTypes.objectOf(React.PropTypes.func)),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const items = microserviceBoardItems(
      this.props.project,
      this.props.maintenance,
      this.context.intl,
    )
    return (
      <BoardComponent items={items} />
    )
  }
}

export default MicroserviceBoardComponent
