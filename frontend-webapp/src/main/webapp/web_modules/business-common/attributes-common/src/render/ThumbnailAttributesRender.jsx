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
import get from 'lodash/get'
import Dialog from 'material-ui/Dialog'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { CatalogDomain } from '@regardsoss/domain'
import { CatalogShapes } from '@regardsoss/shape'

/**
 * Component to render thumbnail attributes group
 *
 * @author Sébastien Binda
 */
class ThumbnailAttributesRender extends React.Component {

  static propTypes = {
    attributes: PropTypes.shape({
      files: CatalogShapes.entityFiles,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
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
    const thumbnailURI = get(this.props.attributes, `files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.THUMBNAIL}[0].uri`, null)
    if (thumbnailURI) {
      const style = { display: 'block', cursor: 'pointer', height: 25, margin: '0 auto' } // TODO: this is bullshit lineheiht, use theme?
      return (
        <div>
          <img
            src={thumbnailURI}
            style={style}
            alt="no thumbnail"
            onTouchTap={() => this.setState({ displayFullSize: !this.state.displayFullSize })}
          />
          {this.displayFullSize(thumbnailURI)}
        </div>
      )
    }
    return <NoDataIcon />
  }

}

export default ThumbnailAttributesRender
