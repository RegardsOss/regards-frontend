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
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'
import { assert } from 'chai'
import modulesHelper from '../src/ModulesHelper'

/**
 * Test ModulesHelper
 * @author Raphaël Mechali
 */
describe('[Modules API] Testing ModulesHelper', () => {
  it('should exists', () => {
    assert.isDefined(modulesHelper)
  })
  const propertiesBag = {
    a: true, // should be filtered
    b: 'xxx',
    adminForm: true, // should be filtered
    id: true,
    applicationId: true,
    appName: true,
    project: true,
    type: true,
    moduleConf: true,
    description: true,
    active: true,
    container: true,
    page: true,
    conf: true,
  }

  // test properties filtering functions
  const testCases = [{
    label: 'getReportedUserModuleProps should filter only the user module properties in a given properties set',
    expectedFilteredProps: ['a', 'b', 'adminForm'],
    appliedFunction: modulesHelper.getReportedUserModuleProps,
  }, {
    label: 'getReportedAdminModuleProps should filter only the admin module properties in a given properties set',
    expectedFilteredProps: ['a', 'b'],
    appliedFunction: modulesHelper.getReportedAdminModuleProps,
  }]

  testCases.forEach(({ label, expectedFilteredProps, appliedFunction }) => it(label, () => {
    const reportedProps = appliedFunction(propertiesBag)
    assert.isFalse(isEmpty(reportedProps), 'There should be reported props')

    const allKeys = keys(propertiesBag)
    const reportedKeys = keys(
      reportedProps)
    allKeys.forEach((key) => {
      if (expectedFilteredProps.includes(key)) {
        assert.isFalse(reportedKeys.includes(key), `The key ${key} should not have been reported`)
      } else {
        assert.isTrue(reportedKeys.includes(key), `The key ${key} should have been reported`)
      }
    })
  }),
  )
})
