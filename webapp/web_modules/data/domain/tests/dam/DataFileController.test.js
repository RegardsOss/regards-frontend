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
import { assert } from 'chai'
import { DATA_TYPES_ENUM } from '../../common/DataTypes'
import DataFileController from '../../dam/DataFileController'

describe('[Domain] Testing DataFileController', () => {
  it('should exists', () => {
    assert.isDefined(DataFileController.getFileURI)
  })
  it('should keep URI unchanged for reference files', () => {
    const builtURI = DataFileController.getFileURI({
      dataType: DATA_TYPES_ENUM.RAWDATA,
      reference: true,
      uri: 'test://my-custom-file.png',
      mimeType: 'image/png',
      imageWidth: 10,
      imageHeight: 10,
      online: true,
      filename: 'my-custom-file.png',
    }, 'abde', 'project1')
    assert.equal(builtURI, 'test://my-custom-file.png')
  })
  it('should append token when it is defined for internal files URI', () => {
    const builtURI = DataFileController.getFileURI({
      dataType: DATA_TYPES_ENUM.RAWDATA,
      reference: false,
      uri: 'test://my-custom-file.png',
      mimeType: 'image/png',
      imageWidth: 10,
      imageHeight: 10,
      online: true,
      filename: 'my-custom-file.png',
    }, 'abde', 'project1')
    assert.equal(builtURI, 'test://my-custom-file.png?token=abde')
  })
  it('should append project name when token is not defined to internal files URI', () => {
    const builtURI = DataFileController.getFileURI({
      dataType: DATA_TYPES_ENUM.RAWDATA,
      reference: false,
      uri: 'test://my-custom-file.png',
      mimeType: 'image/png',
      imageWidth: 10,
      imageHeight: 10,
      online: true,
      filename: 'my-custom-file.png',
    }, null, 'project1')
    assert.equal(builtURI, 'test://my-custom-file.png?scope=project1')
  })
})
