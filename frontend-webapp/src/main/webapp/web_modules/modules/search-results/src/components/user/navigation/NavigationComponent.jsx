/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb } from '@regardsoss/components'
import NavigationLevel from '../../../models/navigation/NavigationLevel'

const ROOT_PLACEHOLDER = {}

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    resultsTitle: PropTypes.string,
    navigationLevels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired,
    onLevelSelected: PropTypes.func.isRequired, // on level selected in breadcrumb: (level, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getLevelLabel = (level, index) => {
    const { resultsTitle } = this.props
    const { intl: { formatMessage } } = this.context
    if (index === 0) {
      // root level may have no label (use home then)
      return resultsTitle || formatMessage({ id: 'navigation.home.label' })
    }
    return level.label
  }

  render() {
    const { navigationLevels, onLevelSelected } = this.props
    const breadcrumbElements = [
      ROOT_PLACEHOLDER, // add root (as a placeholder)
      ...navigationLevels,
    ]
    return (
      <Breadcrumb elements={breadcrumbElements} labelGenerator={this.getLevelLabel} onAction={onLevelSelected} />
    )
  }

}

export default NavigationComponent
