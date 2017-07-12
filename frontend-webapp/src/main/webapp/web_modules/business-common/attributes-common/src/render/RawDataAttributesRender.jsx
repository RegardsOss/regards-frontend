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
      const thumbnail = find(this.props.attributes.files, file => file.dataType === ObjectLinkedFileTypes.RAWDATA)
      if (thumbnail) {
        const styles = { cursor: 'pointer', marginTop: '5px' }
        return (
          <a href={thumbnail.fileRef} download title="download">
            <GetApp
              style={styles}
              hoverColor={this.context.muiTheme.palette.accent1Color}
            />
          </a>
        )
      }
    }
    return <NotInterested />
  }

}

export default RawDataAttributesRender
