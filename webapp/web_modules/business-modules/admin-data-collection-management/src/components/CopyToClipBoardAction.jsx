/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DetailIcon from 'material-ui/svg-icons/file/attachment'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

/**
* Copy URN of given collection into clipboard.
* @author Sébastien Binda
*/
export class CopyToClipBoardAction extends React.Component {
  static propTypes = {
    hoverColor: PropTypes.string,
    entity: DataManagementShapes.Collection,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      entity, entity: { content }, hoverColor,
    } = this.props

    return (
      <IconButton
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'collection.list.tooltip.copy.button' })}
        iconStyle={CopyToClipBoardAction.iconStyle}
        style={CopyToClipBoardAction.buttonStyle}
      >
        <CopyToClipboard
          text={entity.content.ipId}
        >
          <DetailIcon hoverColor={hoverColor} />
        </CopyToClipboard>
      </IconButton>
    )
  }
}

export default CopyToClipBoardAction
