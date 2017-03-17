/**
 * LICENSE_PLACEHOLDER
 **/
import { ShowableAtRender } from '@regardsoss/components'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import FacetsDisplayerContainer from './FacetsDisplayerContainer'

/**
 * Display the search facets content (mount / unmount children as the show property changes,
 * but alway stays mounted to keep a valid historical state)
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    appName: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: React.PropTypes.string,
    moduleConf: React.PropTypes.shape({
      show: React.PropTypes.bool.isRequired,
      resultsSelectors: React.PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    }),
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { moduleConf: { show, resultsSelectors } } = this.props
    // TODO TOMORROW: background (add a card or share one????)
    // TODO tomorrow ===> connect with results (will not unmount this) or connect only content??? <== better in content, no select if not showable =D
    // TODO tomorrow ===> inject in module the right selectors
    return (
      <ShowableAtRender show={show}>
        <FacetsDisplayerContainer resultsSelectors={resultsSelectors} />
      </ShowableAtRender>
    )
  }
}

export default ModuleContainer
