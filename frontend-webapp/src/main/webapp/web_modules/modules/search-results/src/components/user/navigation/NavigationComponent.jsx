/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb } from '@regardsoss/components'
import NavigationLevel from '../../../models/navigation/NavigationLevel'

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    navigationLevels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired,
    onLevelSelected: PropTypes.func.isRequired, // on level selected in breadcrumb: (level, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getLevelLabel = (level, index) => {
    const { intl: { formatMessage } } = this.context
    // root level may have no label, other levels have one
    return level.label || formatMessage({ id: 'navigation.home.label' })
  }

  render() {
    const { navigationLevels, onLevelSelected } = this.props
    return (
      <Breadcrumb elements={navigationLevels} labelGenerator={this.getLevelLabel} onAction={onLevelSelected} />
    )
  }

}

export default NavigationComponent
