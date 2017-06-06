/**
* LICENSE_PLACEHOLDER
**/
import { URL } from '@regardsoss/model'

/**
 * Shows content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
* You can use all accepted dialog properties
*/
class IFrameURLContentDisplayer extends React.Component {

  static propTypes = {
    contentURL: URL.isRequired,
    onContentLoaded: PropTypes.func, // callback, called when IFrame content was loaded
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  render() {
    const { contentURL, onContentLoaded } = this.props
    const styles = this.props.style ? this.props.style : { height: '100%', width: '100%', position: 'absolute' }
    return (
      <iframe
        ref="iframe"
        title="content-displayer"
        style={styles}
        src={contentURL}
        onLoad={onContentLoaded}
      />
    )
  }
}
export default IFrameURLContentDisplayer
