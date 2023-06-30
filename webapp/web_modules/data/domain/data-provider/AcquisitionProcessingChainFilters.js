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

/** Possible filter params */
export const ACQUISITION_PROCESSSING_CHAIN_FILTER_PARAMS = {
  RUNNING: 'running',
  MODE: 'mode',
  LABEL: 'label',
}

/**
 * Class to construct Ingest products search body parameters
 */
export class AcquisitionProcessingChainFilters {
  constructor() {
    this.filters = {}
  }

  static builder(label = null) {
    const filters = new AcquisitionProcessingChainFilters()
    if (label) {
      filters.withLabel(label)
    }
    return filters
  }

  withLabel(label) {
    this.filters[ACQUISITION_PROCESSSING_CHAIN_FILTER_PARAMS.LABEL] = label
    return this
  }

  build() {
    return this.filters
  }

  static buildDefault() {
    return {
      [ACQUISITION_PROCESSSING_CHAIN_FILTER_PARAMS.RUNNING]: null,
      [ACQUISITION_PROCESSSING_CHAIN_FILTER_PARAMS.MODE]: null,
      [ACQUISITION_PROCESSSING_CHAIN_FILTER_PARAMS.LABEL]: '',
    }
  }
}
