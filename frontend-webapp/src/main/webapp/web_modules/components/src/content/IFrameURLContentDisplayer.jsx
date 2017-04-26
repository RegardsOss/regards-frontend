/**
* LICENSE_PLACEHOLDER
**/
import { URL } from '@regardsoss/model'

/**
 * Shows content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
* You can use all accepted dialog properties
*/
class IFrameURLContentDisplayerComponent extends React.Component {

  static propTypes = {
    contentURL: URL.isRequired,
    onContentLoaded: React.PropTypes.func, // callback, called when IFrame content was loaded
  }

  render() {
    const { contentURL, onContentLoaded } = this.props
    return (
      <iframe
        height="100%"
        width="100%"
        style={{ position: 'absolute' }}
        src={contentURL}
        onLoad={onContentLoaded}
      />
    )
  }
}
export default IFrameURLContentDisplayerComponent
