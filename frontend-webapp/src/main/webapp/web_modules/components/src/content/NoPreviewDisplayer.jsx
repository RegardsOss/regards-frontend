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
import ImageOff from 'mdi-material-ui/ImageOff'
import { i18nContextType } from '@regardsoss/i18n'
import NoContentComponent from './NoContentComponent'

/**
* Displays picture files
* @author Sébastien Binda
*/
class NoPreviewDisplayer extends React.Component {
  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <NoContentComponent
        title={this.context.intl.formatMessage({ id: 'file.displayer.no.preview.message' })}
        Icon={ImageOff}
      />
    )
  }
}

export default NoPreviewDisplayer
