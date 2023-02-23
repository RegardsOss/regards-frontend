/**
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
 **/
import { assert } from 'chai'
import { browserHistory } from 'react-router'
import { UIDomain, CommonDomain } from '@regardsoss/domain'

const DEFAULT_FILTERS_STATE = {
  filter1: '',
  filter2: null,
  filter3: 0,
  filter4: 'test',
  filter5: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  filter6: CommonDomain.TableFilterDefaultStateEnum.DATES,
}

describe('[Components] Test FilterPaneHelper', () => {
  it('It should correctly extract filters from url', () => {
    let queryFilters = {
      filter1: '',
      filter2: {
        val1: 'lala',
        val2: 'lolo',
      },
      filter3: 'bonsoir',
      filter4: 'bonjour',
      filter5: JSON.stringify({
        values: ['val1'],
        matchMode: CommonDomain.MATCH_MODE_ENUM.STRICT,
        ignoreCase: true,
      }),
      filter6: '01/02/2002',
      filter7: 'noDefaultState',
    }
    browserHistory.setMockedResult({
      pathname: 'test://www.test.tst',
      query: queryFilters,
      hash: '',
    })
    let extractedFilters = UIDomain.FiltersPaneHelper.extractFiltersFromURL({ ...DEFAULT_FILTERS_STATE })
    console.log(extractedFilters)
    assert.deepEqual(extractedFilters, {
      filter1: '',
      filter2: {
        val1: 'lala',
        val2: 'lolo',
      },
      filter3: 'bonsoir',
      filter4: 'bonjour',
      filter5: {
        values: ['val1'],
        matchMode: CommonDomain.MATCH_MODE_ENUM.STRICT,
        ignoreCase: true,
      },
      filter6: {
        [CommonDomain.REQUEST_PARAMETERS.AFTER]: '01/02/2002',
        [CommonDomain.REQUEST_PARAMETERS.BEFORE]: null,
      },
    })

    queryFilters = {
      filter1: '',
      filter3: null,
      filter6: '01/02/2002,02/02/2002',
    }
    browserHistory.setMockedResult({
      pathname: 'test://www.test.tst',
      query: queryFilters,
      hash: '',
    })
    extractedFilters = UIDomain.FiltersPaneHelper.extractFiltersFromURL({ ...DEFAULT_FILTERS_STATE })
    assert.deepEqual(extractedFilters, {
      filter1: '',
      filter3: null,
      filter6: {
        after: '01/02/2002',
        before: '02/02/2002',
      },
    })

    queryFilters = {}
    browserHistory.setMockedResult({
      pathname: 'test://www.test.tst',
      query: queryFilters,
      hash: '',
    })
    extractedFilters = UIDomain.FiltersPaneHelper.extractFiltersFromURL({ ...DEFAULT_FILTERS_STATE })
    assert.deepEqual(extractedFilters, {})
  })
  it('It should correctly build request parameters', () => {
    const filters = {
      filter1: {
        values: ['test1', 'test2'],
        ignoreCase: true,
        matchMode: CommonDomain.MATCH_MODE_ENUM.STRICT,
      },
      filter2: true,
      filter3: false,
      filter4: '',
      filter5: 'test',
      filter6: {
        after: '02/09/2022',
      },
      filter7: null,
      filter8: {
        after: '08/08/2022',
        before: '09/09/2020',
      },
    }
    const requestParameters = UIDomain.FiltersPaneHelper.buildRequestParameters(filters)
    assert.deepEqual(requestParameters, {
      filter1: {
        values: ['test1', 'test2'],
        mode: 'INCLUDE',
        ignoreCase: true,
        matchMode: CommonDomain.MATCH_MODE_ENUM.STRICT,
      },
      filter2: 'true',
      filter3: '',
      filter5: 'test',
      filter6: {
        after: '02/09/2022',
        before: null,
      },
      filter8: {
        after: '08/08/2022',
        before: '09/09/2020',
      },
    })
  })
})
