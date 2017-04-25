/**
 * LICENSE_PLACEHOLDER
 */
import { themeContextType } from '@regardsoss/theme'

/**
 * Render a <a> HTML Balise with muiTheme styles for colors.
 *
 * @author Sébastien Binda
 */
class LinkComponent extends React.Component {

  static propTypes = {
    link: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    target: React.PropTypes.string,
    rel: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    return (
      <a
        style={{
          color: this.context.muiTheme.palette.primary1Color,
        }}
        href={this.props.link}
        target={this.props.target ? this.props.target : '_self'}
        rel={this.props.rel ? this.props.rel : ''}
      >
        {this.props.label ? this.props.label : this.props.link}
      </a>
    )
  }
}

export default LinkComponent
