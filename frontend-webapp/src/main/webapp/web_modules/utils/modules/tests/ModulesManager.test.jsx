/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import modulesManager from '../src/ModulesManager'
import { someModulesWithDoubles } from './dumps/modules'

/**
 * Test ModulesManager
 * @author Raphaël Mechali
 */
describe('[Modules] Testing ModulesManager', () => {
  it('should exists', () => {
    assert.isDefined(modulesManager)
  })
  it('should retrieve the right module by type', () => {
    const foundModule = modulesManager.findFirstModuleByType(someModulesWithDoubles, 'order-cart')
    assert.isOk(foundModule, 'Module should be found')
    assert.equal(foundModule.content.id, 2, 'First valid module should be returned')

    const notFoundModule = modulesManager.findFirstModuleByType(someModulesWithDoubles, 'any-non-existing')
    assert.isNotOk(notFoundModule, 'Module should not be found')
  })
  it('should return module URL for project and ID', () => {
    assert.equal(modulesManager.getModuleURL('p1', 25), '/user/p1/modules/25')
  })
  it('should retrieve the right module ID in path', () => {
    assert.equal(modulesManager.getPathModuleId('http://myDomain:888/user/anyProject/modules/208'), 208, 'The right ID should be found')
  })
  it('should provide a type module default icon URL', () => {
    assert.equal(modulesManager.getModuleDefaultIconURL('my-module'), '/modules-icon/my-module.svg')
  })
})