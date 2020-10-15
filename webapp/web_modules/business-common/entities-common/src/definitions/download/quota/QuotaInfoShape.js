/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { QUOTA_INFO_STATES } from './QuotaInfoStateEnum'

/**
 * Quota information field, as added by withQuotaInfo
 * @author Raphaël Mechali
 */
export const QuotaInfo = PropTypes.shape({
  currentQuota: PropTypes.number.isRequired,
  maxQuota: PropTypes.number.isRequired,
  quotaState: PropTypes.oneOf(QUOTA_INFO_STATES),
  currentRate: PropTypes.number.isRequired,
  rateLimit: PropTypes.number.isRequired,
  rateState: PropTypes.oneOf(QUOTA_INFO_STATES),
  downloadDisabled: PropTypes.bool,
  inUserApp: PropTypes.bool,
})
