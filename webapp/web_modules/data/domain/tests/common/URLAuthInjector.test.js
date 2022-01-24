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
import URLAuthInjector from '../../common/URLAuthInjector'

describe('[Domain] Testing URLAuthInjector', () => {
  it('should exists', () => {
    assert.isDefined(URLAuthInjector)
  })
  it('should append token when it is defined for internal files URI', () => {
    assert.equal(URLAuthInjector('test://my-custom-file.png', 'abde', 'project1'), 'test://my-custom-file.png?token=abde')
    assert.equal(URLAuthInjector('test://my-custom-file.png?xxx=yyy', 'abde', 'project1'), 'test://my-custom-file.png?xxx=yyy&token=abde')
  })
  it('should append project name when token is not defined to internal files URI', () => {
    assert.equal(URLAuthInjector('test://my-custom-file.png', null, 'project1'), 'test://my-custom-file.png?scope=project1')
    assert.equal(URLAuthInjector('test://my-custom-file.png?xxx=yyy', null, 'project1'), 'test://my-custom-file.png?xxx=yyy&scope=project1')
  })
})
