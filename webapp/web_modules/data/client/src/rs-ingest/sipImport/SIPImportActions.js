/*
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
 */
import { RequestVerbEnum, BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle SIP entities from backend server.
 * @author Sébastien Binda
 */
export default class SIPImportActions extends BasicSignalActions {
  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      bypassErrorMiddleware: true,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.INGEST}/sips/import`,
    })
  }

  /**
   * @return {*} redux action to dispatch to import a SIP features collection
   */
  importSIPFeaturesCollection(sipFile) {
    return this.sendEntityUsingMultiPart(RequestVerbEnum.POST, {}, { file: sipFile })
  }
}
