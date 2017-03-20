/**
 * LICENSE_PLACEHOLDER
 **/
import Toggle from 'material-ui/Toggle'
import find from 'lodash/find'
import omit from 'lodash/omit'
import HateoasLinks from '../model/HateoasLinks'

/**
 * React component to display a ToggleButton with hateoas condition on activation
 * @author Sébastien Binda
 */
class HateoasToggle extends React.Component {

  static propTypes = {
    entityLinks: React.PropTypes.arrayOf(HateoasLinks).isRequired,
    hateoasKey: React.PropTypes.string.isRequired,
  }

  render() {
    const { entityLinks, hateoasKey } = this.props
    if (find(entityLinks, entity => entity.rel === hateoasKey)) {
      return (
        <Toggle
          {...omit(this.props, ['entityLinks', 'hateoasKey'])}
        />
      )
    }
    return (<Toggle
      {...omit(this.props, ['entityLinks', 'hateoasKey'])}
      disabled
    />)
  }

}

export default HateoasToggle
