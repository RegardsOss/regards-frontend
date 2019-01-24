/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import { TEMPORAL_STEP_ENUM_VALUES } from '../utils/TemporalStepEnum'
import { TEMPORAL_TYPE_VALUES } from '../utils/TemporalTypeEnum'
/**
 * @author Léo Mieulet
 */
const LayerTemporalInfos = PropTypes.shape({
  type: PropTypes.oneOf(TEMPORAL_TYPE_VALUES),
  nbStep: PropTypes.number,
  currentStep: PropTypes.number,
  beginDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  step: PropTypes.oneOf(TEMPORAL_STEP_ENUM_VALUES),
  currentDate: PropTypes.instanceOf(Date),
  unavailableSteps: PropTypes.arrayOf(PropTypes.oneOf(TEMPORAL_STEP_ENUM_VALUES)),
  dateList: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
})

export default LayerTemporalInfos
