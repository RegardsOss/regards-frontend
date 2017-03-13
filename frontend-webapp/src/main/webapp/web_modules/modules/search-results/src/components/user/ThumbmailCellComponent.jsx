/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import Dialog from 'material-ui/Dialog'
import { ObjectLinkedFile, ObjectLinkedFileTypes } from '@regardsoss/model'
import Avatar from 'material-ui/Avatar'

/**
 * Render custom cells for entity thumbmails.
 *
 * @author Sébastien Binda
 */
class ThumbmailCellComponent extends React.Component {

  static propTypes = {
    attributes: React.PropTypes.shape({
      files: React.PropTypes.arrayOf(ObjectLinkedFile),
    }),
    entity: React.PropTypes.object,
    lineHeight: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      displayFullSize: false,
      plop: false,
    }
  }

  displayFullSize = (uri) => {
    if (this.state.displayFullSize) {
      return (
        <Dialog
          modal={false}
          onRequestClose={() => this.setState({ displayFullSize: !this.state.displayFullSize })}
          open
        >
          <div>
            <img src={uri} alt="" style={{ maxWidth: 500 }} />
            {this.state.plop}
          </div>
        </Dialog>
      )
    }
    return null
  }

  render() {
    if (this.props.attributes.files && this.props.attributes.files.length > 0) {
      const thumbmail = find(this.props.attributes.files, file => file.type === ObjectLinkedFileTypes.THUMBMAIL)

      if (thumbmail) {
        const style = { cursor: 'pointer' }
        return (
          <div>
            <Avatar
              src={thumbmail.uri}
              size={this.props.lineHeight - 20}
              style={style}
              onTouchTap={() => this.setState({ displayFullSize: !this.state.displayFullSize })}
            />
            {this.displayFullSize(thumbmail.uri)}
          </div>
        )
      }
    }
    return null
  }

}

export default ThumbmailCellComponent
