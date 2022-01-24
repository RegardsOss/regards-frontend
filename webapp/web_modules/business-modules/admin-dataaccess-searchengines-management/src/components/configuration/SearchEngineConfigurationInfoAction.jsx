/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DetailIcon from 'mdi-material-ui/InformationOutline'
import IconButton from 'material-ui/IconButton'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Edit table action for search engine configurations
* @author Sébastien Binda
*/
class SearchEngineConfigurationInfoAction extends React.Component {
  static propTypes = {
    entity: CommonShapes.PluginConfiguration,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  infoAvailable = () => {
    const { links } = this.props.entity
    return !!find(links, (l) => l.rel === 'search')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity, entity: { content }, onClick } = this.props
    return (
      <IconButton
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'dataaccess.searchengines.list.info.button' })}
        iconStyle={SearchEngineConfigurationInfoAction.iconStyle}
        style={SearchEngineConfigurationInfoAction.buttonStyle}
        onClick={() => onClick(entity)}
        disabled={!this.infoAvailable()}
      >
        <DetailIcon />
      </IconButton>
    )
  }
}
export default SearchEngineConfigurationInfoAction
