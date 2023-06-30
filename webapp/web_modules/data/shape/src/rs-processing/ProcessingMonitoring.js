/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const Steps = PropTypes.shape({
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string,
})
export const ProcessingMonitoringContent = PropTypes.shape({
  steps: PropTypes.arrayOf(Steps).isRequired,
  userName: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  processName: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
})
export const ProcessingMonitoring = PropTypes.shape({
  content: ProcessingMonitoringContent,
})
export const ProcessingMonitoringList = PropTypes.objectOf(ProcessingMonitoring)
export const ProcessingMonitoringArray = PropTypes.arrayOf(ProcessingMonitoring)
