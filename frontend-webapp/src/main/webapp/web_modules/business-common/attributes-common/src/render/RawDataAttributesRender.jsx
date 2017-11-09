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
import GetApp from 'material-ui/svg-icons/action/get-app'
import NotInterested from 'material-ui/svg-icons/av/not-interested'
import { themeContextType } from '@regardsoss/theme'
import { CatalogDomain } from '@regardsoss/domain'
import { CatalogShapes } from '@regardsoss/shape'

/**
 * Component to render rawdata download attributes group
 *
 * @author Sébastien Binda
 */
class RawDataAttributesRender extends React.Component {

  static propTypes = {
    attributes: PropTypes.shape({
      files: CatalogShapes.entityFiles,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const rawDataURI = get(this.props.attributes, `files.${CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA}[0].uri`, null)
    if (rawDataURI) {
      const styles = { cursor: 'pointer', marginTop: '5px' }
      return (
        <a href={rawDataURI} download title="download">
          <GetApp
            style={styles}
            hoverColor={this.context.muiTheme.palette.accent1Color}
          />
        </a>
      )
    }
    return <NotInterested />
  }

}

export default RawDataAttributesRender
