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
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle AIP tags from backend server.
 * @author Simon MILHAU
 */
export default class AIPSignalActions extends BasicSignalsActions {
  /** Root endpoints for order state actions */
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.INGEST}`

  static RETRY_ACTIONS = 'retryEndpoint'

  static RETRY_SESSION_SUBMISSION_ACTIONS = 'retryAllSubmissionEndpoint'

  static RETRY_SESSION_GENERATION_ACTIONS = 'retryAllGenerationEndpoint'

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      [AIPSignalActions.RETRY_ACTIONS]: {
        entityEndpoint: `${AIPSignalActions.ROOT_ENDPOINT}/aips/{aipId}/retry`,
        namespace: `${namespace}/resume`,
      },
      [AIPSignalActions.RETRY_SESSION_GENERATION_ACTIONS]: {
        entityEndpoint: `${AIPSignalActions.ROOT_ENDPOINT}/sessions/{id}/retry/generation`,
        namespace: `${namespace}/resume`,
      },
    })
  }

  /**
   * Build an action that adds some tags to a set of sips
   */
  retry(aipId) {
    return this.getSubAction(AIPSignalActions.RETRY_ACTIONS).sendSignal('POST', null, { aipId })
  }

  /**
   * Build an action that adds some tags to a set of sips
   */
  retrySessionGeneration(sessionId) {
    return this.getSubAction(AIPSignalActions.RETRY_SESSION_GENERATION_ACTIONS).sendSignal('PUT', null, { id: sessionId })
  }
}
