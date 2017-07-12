/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import find from 'lodash/find'
import Dialog from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { ObjectLinkedFile, ObjectLinkedFileTypes, CatalogEntity } from '@regardsoss/model'

/**
 * Component to render thumbnail attributes group
 *
 * @author Sébastien Binda
 */
class ThumbnailAttributesRender extends React.Component {

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
      const thumbnail = find(this.props.attributes.files, file => file.dataType === ObjectLinkedFileTypes.THUMBNAIL)

      if (thumbnail) {
        const style = { cursor: 'pointer' }
        return (
          <div>
            <Avatar
              src={thumbnail.fileRef}
              size={this.props.lineHeight - 20}
              style={style}
              onTouchTap={() => this.setState({ displayFullSize: !this.state.displayFullSize })}
            />
            {this.displayFullSize(thumbnail.fileRef)}
          </div>
        )
      }
      return <NoDataIcon />
    }
    return <NoDataIcon title="" />
  }

}

export default ThumbnailAttributesRender
