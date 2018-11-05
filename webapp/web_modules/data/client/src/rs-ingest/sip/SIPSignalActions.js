/*
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
 */
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle AIP tags from backend server.
 * @author Sébastien Binda
 */
export default class SIPSignalActions extends BasicSignalsActions {
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
      [SIPSignalActions.RETRY_ACTIONS]: {
        entityEndpoint: `${SIPSignalActions.ROOT_ENDPOINT}/sips/{sipId}/retry`,
        namespace: `${namespace}/resume`,
      },
      [SIPSignalActions.RETRY_SESSION_SUBMISSION_ACTIONS]: {
        entityEndpoint: `${SIPSignalActions.ROOT_ENDPOINT}/sessions/{id}/retry/submission`,
        namespace: `${namespace}/resume`,
      },
      [SIPSignalActions.RETRY_SESSION_GENERATION_ACTIONS]: {
        entityEndpoint: `${SIPSignalActions.ROOT_ENDPOINT}/sessions/{id}/retry/generation`,
        namespace: `${namespace}/resume`,
      },
    })
  }

  /**
   * Build an action that adds some tags to a set of sips
   */
  retry(sipId) {
    return this.getSubAction(SIPSignalActions.RETRY_ACTIONS).sendSignal('POST', null, { sipId })
  }

  /**
   * Build an action that adds some tags to a set of sips
   */
  retrySessionSubmission(sessionId) {
    return this.getSubAction(SIPSignalActions.RETRY_SESSION_SUBMISSION_ACTIONS).sendSignal('PUT', null, { id: sessionId })
  }

  /**
   * Build an action that adds some tags to a set of sips
   */
  retrySessionGeneration(sessionId) {
    return this.getSubAction(SIPSignalActions.RETRY_SESSION_GENERATION_ACTIONS).sendSignal('PUT', null, { id: sessionId })
  }
}
