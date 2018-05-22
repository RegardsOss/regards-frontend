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
import { BasicSignalActions } from '@regardsoss/store-utils'
import { MIME_TYPES } from '@regardsoss/mime-types'
import DownloadDescriptionDefinitions from './DownloadDescriptionDefinitions'


/**
 * Actions used to download an entity file description (parent, to be considered abstract).
 * Currently handles only markdown content
 */
export default class DownloadEntityDescriptionActions extends BasicSignalActions {
  constructor(objectType, namespacePrefix) {
    super({
      namespace: `${namespacePrefix}/${objectType}`,
      entityEndpoint: DownloadDescriptionDefinitions.getActionDownloadURL(objectType),
      headers: {
        Accept: MIME_TYPES.MARKDOWN_MIME_TYPE,
      },
    })
  }

  downloadEntityDescription(id) {
    this.currentDownloadEntityId = id
    return this.sendSignal('GET', null, { id })
  }
  /**
   * Overriden to not parse as JSON content but as pure text
   * @param {*} res raw result
   */
  buildResults = stream =>
    // asserted: char stream here, and not bytes!
    stream.text().then(content => ({
      entityId: this.currentDownloadEntityId,
      contentType: MIME_TYPES.MARKDOWN_MIME_TYPE,
      content,
    }))
}
