/**
 * LICENSE_PLACEHOLDER
 **/
import SvgIcon from 'material-ui/SvgIcon'

/**
 * A React component to display a SVG element
 */
class SVGIconFromString extends React.Component {

  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    iconStyle: React.PropTypes.object,
    iconViewBox: React.PropTypes.string,
  }

  static defaultProps = {
    iconStyle: { width: '150px', height: '150px' },
    iconViewBox: '0 0 94.5 94.5',
  }
  render() {
    const { iconStyle, icon, iconViewBox } = this.props
    return (
      <SvgIcon viewBox={iconViewBox} style={iconStyle}>
        {/* eslint-disable react/no-danger */}
        <g dangerouslySetInnerHTML={{ __html: icon }} />
      </SvgIcon>
    )
  }
}

export default SVGIconFromString
