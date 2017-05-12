/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import Dialog from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import { ObjectLinkedFile, ObjectLinkedFileTypes, CatalogEntity } from '@regardsoss/model'

/**
 * Component to render thumbnail attributes group
 *
 * @author Sébastien Binda
 */
class ThumbmailAttributesRender extends React.Component {

  static propTypes = {
    attributes: PropTypes.shape({
      files: PropTypes.arrayOf(ObjectLinkedFile),
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogEntity,
    lineHeight: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      displayFullSize: false,
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

export default ThumbmailAttributesRender
