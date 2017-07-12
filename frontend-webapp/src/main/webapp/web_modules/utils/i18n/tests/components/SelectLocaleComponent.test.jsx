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
import { shallow } from 'enzyme'
import { expect } from 'chai'
import * as sinon from 'sinon'
import MenuItem from 'material-ui/MenuItem'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import SelectLocaleComponent from '../../src/components/SelectLocaleComponent'

const options = {
  context: buildTestContext(),
}

/**
 * Test a components rendering
 * @author Sébastien Binda
 */
describe('[COMMON] Testing i18n Select Locale components', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render correctly the SelectLocaleComponent', () => {
    const onLocaleChange = (locale) => {
      expect(locale).to.equals('es')
    }
    const spy = sinon.spy(onLocaleChange)
    const props = {
      setLocale: spy,
      currentLocale: 'ru',
      locales: ['fr', 'en', 'ru', 'es'],
    }

    const wrapper = shallow(<SelectLocaleComponent {...props} />, options)
    expect(wrapper.find(MenuItem)).to.have.length(4)
  })
})
