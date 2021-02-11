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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ApplicationLayoutContainer } from '../../src/containers/ApplicationLayoutContainer'
import LayoutDumpNetwork from '../model/dump/LayoutDumpNetwork'
/**
 * Tests for ApplicationLayoutContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI LAYOUT MANAGEMENT] Testing Layout container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render correctly a layout container', () => {
    const fetchLayoutCallBack = spy()
    const updateLayoutCallBack = spy()
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
      },
      isFetching: false,
      layout: LayoutDumpNetwork[1],
      fetchLayout: fetchLayoutCallBack,
      updateLayout: updateLayoutCallBack,
    }
    const wrapper = shallow(<ApplicationLayoutContainer
      {...props}
    />)

    assert.isTrue(fetchLayoutCallBack.calledOnce, 'Fetch layout entities should be called at container mount')
    assert.isTrue(wrapper.find(LoadableContentDisplayDecorator).length === 1, 'There should be a LoadableContentDisplayDecorator displayed')
    assert.isTrue(wrapper.find(I18nProvider).length === 1, 'There should be a I18nProvider')
  })
})
