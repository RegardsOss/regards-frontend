/**
* LICENSE_PLACEHOLDER
**/
import { CommonShapes } from '@regardsoss/shape'

/**
 * Shows content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
* You can use all accepted dialog properties
*/
class IFrameURLContentDisplayer extends React.Component {
  static propTypes = {
    contentURL: CommonShapes.URL.isRequired,
    onContentLoaded: PropTypes.func, // callback, called when IFrame content was loaded
    onContentError: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  /** Default IFrame styles: grab all space available and re-initialize background to white */
  static DEFAULT_STYLES = {
    height: '100%', width: '100%', position: 'absolute', background: 'white',
  }

  render() {
    const { contentURL, onContentLoaded, onContentError } = this.props
    const styles = this.props.style ? this.props.style : IFrameURLContentDisplayer.DEFAULT_STYLES
    return (
      <iframe
        title="content-displayer"
        style={styles}
        src={contentURL}
        onLoad={onContentLoaded}
        onError={onContentError}
      />
    )
  }
}
export default IFrameURLContentDisplayer
