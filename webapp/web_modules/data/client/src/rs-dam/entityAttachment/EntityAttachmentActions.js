/*
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
 */
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Document/Dataset/Collection attachments files.
 *
 * @author Léo Mieulet
 */
export default class EntityAttachmentActions extends BasicSignalsActions {
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/entities/{urn}/files`

  static REMOVE_FILE_ACTIONS = 'removeFileEndpoint'

  static UPLOAD_FILES_ACTIONS = 'uploadFilesEndpoint'

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      [EntityAttachmentActions.UPLOAD_FILES_ACTIONS]: {
        entityEndpoint: `${EntityAttachmentActions.ROOT_ENDPOINT}/{dataType}`,
        namespace: `${namespace}/upload`,
      },
      [EntityAttachmentActions.REMOVE_FILE_ACTIONS]: {
        entityEndpoint: `${EntityAttachmentActions.ROOT_ENDPOINT}/{checksum}`,
        namespace: `${namespace}/remove`,
      },
    })
  }

  uploadEntityFile(urn, dataType, formValues, files) {
    return this.getSubAction(EntityAttachmentActions.UPLOAD_FILES_ACTIONS).sendEntityAndArrayOfFilesUsingMultiPart('POST', formValues, files, 'file', { urn, dataType })
  }

  deleteEntityFile(urn, checksum) {
    return this.getSubAction(EntityAttachmentActions.REMOVE_FILE_ACTIONS).sendSignal('DELETE', null, { urn, checksum })
  }
}
