/**
 * LICENSE_PLACEHOLDER
 **/
import { ParameterizedBoardComponent } from '@regardsoss/components'
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
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const items = microserviceBoardItems(this.props.project, this.context.intl)
    return (
      <ParameterizedBoardComponent items={items} />
    )
  }
}

export default MicroserviceBoardComponent
