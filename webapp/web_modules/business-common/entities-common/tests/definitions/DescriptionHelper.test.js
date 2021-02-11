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
import { DescriptionHelper } from '../../src/definitions/DescriptionHelper'
import { modulesDumpWithDescription } from '../dumps/description.module.dump'

describe('[Entities Common] Testing DescriptionHelper', () => {
  it('should select the module when rights and module are available', () => {
    const selectedModule = DescriptionHelper.getFirstDescriptionModule(DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      'any-other-container', modulesDumpWithDescription)
    assert.deepEqual(selectedModule, modulesDumpWithDescription[8])
  })
  it('should refuse selecting module when user has not rights', () => {
    const selectedModule = DescriptionHelper.getFirstDescriptionModule([],
      'any-other-container', modulesDumpWithDescription)
    assert.isNotOk(selectedModule)
  })
  it('should refuse selecting module when it can not find one enabled static description module', () => {
    // 1 - empty dump
    let selectedModule = DescriptionHelper.getFirstDescriptionModule(DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      'any-other-container', {})
    assert.isNotOk(selectedModule, 'Should not find a module in empty dump')
    // 2 - dump with disabled static module
    selectedModule = DescriptionHelper.getFirstDescriptionModule(DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      'any-other-container', {
        8: {
          content: {
            ...modulesDumpWithDescription[8].content,
            active: false,
          },
        },
      })
    assert.isNotOk(selectedModule, 'Should not find a module when module is disabled')
    // 3 - dump with enabled dynamic module (the description module should be static!)
    selectedModule = DescriptionHelper.getFirstDescriptionModule(DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      'any-other-container', {
        8: {
          content: {
            ...modulesDumpWithDescription[8].content,
            container: 'any-other-container',
          },
        },
      }, 'Should not find a module when module is dynamic')
    assert.isNotOk(selectedModule)
  })
  it('should only select description modules', () => {
    const selectedModule = DescriptionHelper.getFirstDescriptionModule(DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      'any-other-module', {
        8: {
          content: {
            ...modulesDumpWithDescription[8].content,
            type: 'I am not a description module',
          },
        },
      })
    assert.isNotOk(selectedModule)
  })
})
