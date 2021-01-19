/**
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
 **/
import { assert } from 'chai'
import { getAdminURL, getModuleURL, getModuleDefaultIconURL } from '../../ui/URLHelper'

/**
 * Test ModulesManager
 * @author Raphaël Mechali
 */
describe('[Domain] Testing URLHelper', () => {
  it('getAdminURL should return admin URL for project', () => {
    assert.equal(getAdminURL('p1'), '/admin/p1')
  })
  it('getModuleURL should return module URL for project and ID', () => {
    assert.equal(getModuleURL('p1', 25), '/user/p1/modules/25')
  })
  it('getModuleDefaultIconURL should return SVG icon URL for module', () => {
    assert.equal(getModuleDefaultIconURL('my-module'), '/modules-icon/my-module.svg')
  })
})
