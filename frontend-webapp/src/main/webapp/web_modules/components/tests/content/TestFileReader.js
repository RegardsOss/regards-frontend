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

/**
 * Fake file reader for test (unknown class in NodeJS context)
 * @author Raphaël Mechali
 */
class TestFileReader {
  constructor(testBlob) {
    this.testBlob = testBlob
    this.listeners = {}
  }
  addEventListener = (evt, l) => { this.listeners[evt] = [...(this.listeners[evt] || []), l] }
  readAsText = () => {
    this.result = this.testBlob.text
    this.listeners.loadend.forEach(listener => listener())
  }
}

export default { TestFileReader }
