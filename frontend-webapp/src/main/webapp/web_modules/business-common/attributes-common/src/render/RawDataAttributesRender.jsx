/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import GetApp from 'material-ui/svg-icons/action/get-app'
import NotInterested from 'material-ui/svg-icons/av/not-interested'
import { themeContextType } from '@regardsoss/theme'
import { ObjectLinkedFile, ObjectLinkedFileTypes, CatalogEntity } from '@regardsoss/model'

/**
 * Component to render rawdata download attributes group
 *
 * @author Sébastien Binda
 */
class RawDataAttributesRender extends React.Component {

  static propTypes = {
    attributes: PropTypes.shape({
      files: PropTypes.arrayOf(ObjectLinkedFile),
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogEntity,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    if (this.props.attributes.files && this.props.attributes.files.length > 0) {
      const thumbnail = find(this.props.attributes.files, file => file.type === ObjectLinkedFileTypes.RAWDATA)
      if (thumbnail) {
        const styles = { cursor: 'pointer' }
        return (
          <div>
            <a href={thumbnail.uri} download title="download">
              <GetApp
                style={styles}
                hoverColor={this.context.muiTheme.palette.accent1Color}
              />
            </a>
          </div>
        )
      }
    }
    return <NotInterested />
  }

}

export default RawDataAttributesRender
