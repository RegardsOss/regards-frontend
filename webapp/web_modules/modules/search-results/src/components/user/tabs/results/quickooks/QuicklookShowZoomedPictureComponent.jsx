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
import IconButton from 'material-ui/IconButton'
import PictureLoopIcon from 'mdi-material-ui/MagnifyPlusOutline'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to open a popup with a zoomed version of the quicklook, when embedded on map
 * @author Léo Mieulet
 */
class QuicklookShowZoomedPictureComponent extends React.Component {
  static propTypes = {
    onOpenZoom: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onOpenZoom, ...otherProperties } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'open.zoomed.picture.tooltip' })}
        onClick={onOpenZoom}
        {...otherProperties}
      >
        <PictureLoopIcon />
      </IconButton>
    )
  }
}
export default QuicklookShowZoomedPictureComponent
