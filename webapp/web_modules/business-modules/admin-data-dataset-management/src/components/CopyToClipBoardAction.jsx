/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ClipboardArrowLeft from 'mdi-material-ui/ClipboardArrowLeft'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

/**
* Copy URN of given dataset into clipboard.
* @author Sébastien Binda
*/
export class CopyToClipBoardAction extends React.Component {
  static propTypes = {
    hoverColor: PropTypes.string,
    entity: DataManagementShapes.Dataset,
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
      <CopyToClipboard
        text={entity.content.ipId}
      >
        <IconButton
          className={`selenium-edit-${content.id}`}
          title={formatMessage({ id: 'dataset.list.tooltip.copy.button' })}
          iconStyle={CopyToClipBoardAction.iconStyle}
          style={CopyToClipBoardAction.buttonStyle}
        >
          <ClipboardArrowLeft hoverColor={hoverColor} />
        </IconButton>
      </CopyToClipboard>
    )
  }
}

export default CopyToClipBoardAction
