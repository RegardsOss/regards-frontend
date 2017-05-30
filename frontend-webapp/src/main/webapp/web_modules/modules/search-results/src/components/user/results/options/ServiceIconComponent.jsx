/**
* LICENSE_PLACEHOLDER
**/

import { SVGIconFromString } from '@regardsoss/components'

/**
* A service icon displayer
*/
class ServiceIconComponent extends React.Component {

  static propTypes = {
    size: PropTypes.number.isRequired,
    iconDescription: PropTypes.shape({
      content: PropTypes.string.isRequired,
      viewBox: PropTypes.string,
    }),
  }

  render() {
    const { size, iconDescription } = this.props
    if (iconDescription && iconDescription.content) {
      return (
        <SVGIconFromString
          icon={iconDescription.content}
          iconStyle={{
            width: `${size}px`,
            height: `${size}px`,
          }}
          iconViewBox={iconDescription.viewBox}
        />)
    }
    // do not create the icon when not provided
    return null
  }
}
export default ServiceIconComponent
