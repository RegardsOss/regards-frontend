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
import { CatalogDomain } from '@regardsoss/domain'
import { CatalogShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import messages from '../i18n'

/**
 * Component to render rawdata download attributes group.
 * Note: unlike other render, this one is rendering only the first provided value
 *
 * @author Sébastien Binda
 */
class RawDataAttributeRender extends React.Component {

  static propTypes = {
    value: CatalogShapes.entityFiles,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage } } = this.context
    const rawDataURI = get(this.props.value, `${CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA}[0].uri`)
    if (rawDataURI) {
      const styles = { cursor: 'pointer', marginTop: '5px' }
      return (
        <a href={rawDataURI} download title={formatMessage({ id: 'attribute.render.download.title' })}>
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

export default withI18n(messages, true)(RawDataAttributeRender)
