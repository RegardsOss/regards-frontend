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
import { contentTypeParser } from '../src/ContentTypeParser'

/**
 * Test ContentTypeParser
 * @author Raphaël Mechali
 */
describe('[MIME TYPES] Testing ContentTypeParser', () => {
  it('should exists', () => {
    assert.isDefined(contentTypeParser)
  })
  it('should parse correctly content type parameters', () => {
    assert.deepEqual(contentTypeParser.parseParameters(''), [''], 'Empty string should return one empty element array')
    assert.deepEqual(contentTypeParser.parseParameters('a'), ['a'], 'One parameter content type should return on parameter array')
    assert.deepEqual(contentTypeParser.parseParameters('1; 2; 3'), ['1', '2', '3'], 'Three parameters content type should return all parameters trimed')
    assert.deepEqual(contentTypeParser.parseParameters('TEXT/HTML; charset=UTF-8'), ['TEXT/HTML', 'charset=UTF-8'], 'Real example should return type and charset unchanged')
  })
  it('should retrieve existing MIME types from content type', () => {
    let retrievedMIMEType = contentTypeParser.getMIMEType('TEXT/HTML')
    assert.isDefined(retrievedMIMEType, 'TEXT/HTML should be correctly and retrieve in mime types list')
    assert.equal(retrievedMIMEType.mime, 'text/html', 'it should worth text/html MIME type')

    retrievedMIMEType = contentTypeParser.getMIMEType('imAge/svg+XML; charset=utf-8')
    assert.isDefined(retrievedMIMEType, 'imAge/svg+XML should be correctly and retrieve in mime types list')
    assert.equal(retrievedMIMEType.mime, 'image/svg+xml', 'it should worth image/svg+xml MIME type')
  })
  it('should return null when MIME type is not parsed or found in enumeration', () => {
    assert.isNull(contentTypeParser.getMIMEType(''), 'Empty content type should not return a MIME type')
    assert.isNull(contentTypeParser.getMIMEType('avcxvsdqf'), 'Unknown content type should not return a MIME type')
  })
})
