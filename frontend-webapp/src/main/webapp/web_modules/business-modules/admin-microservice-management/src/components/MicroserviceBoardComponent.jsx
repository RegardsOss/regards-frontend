/**
 * LICENSE_PLACEHOLDER
 **/
import { BoardComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import {themeContextType} from '@regardsoss/theme'
import microserviceBoardItems from './MicroserviceBoardItems'

/**
 * React component displaying the configurable microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
class MicroserviceBoardComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    maintenance: PropTypes.objectOf(PropTypes.objectOf(PropTypes.func)).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const items = microserviceBoardItems(
      this.props.project,
      this.props.maintenance,
      this.context.intl,
      this.context.muiTheme
    )
    return (
      <BoardComponent items={items} />
    )
  }
}

export default MicroserviceBoardComponent
