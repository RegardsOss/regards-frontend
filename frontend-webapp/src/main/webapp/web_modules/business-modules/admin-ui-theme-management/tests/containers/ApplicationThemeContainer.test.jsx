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
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ApplicationThemeContainer } from '../../src/containers/ApplicationThemeContainer'
import ApplicationThemeComponent from '../../src/components/ApplicationThemeComponent'

/**
 * Tests for ApplicationLayoutContainer
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN UI THEME MANAGEMENT] Testing theme container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplicationThemeContainer)
    assert.isDefined(ApplicationThemeComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project: 'cdpp',
      },
      themeList: {
        1: {
          content: {
            id: 1,
            name: 'Light',
            active: true,
            configuration: {},
          },
        },
        2: {
          content: {
            id: 2,
            name: 'Dark',
            active: false,
            configuration: {
              palette: {
                primary1Color: '#a7000b',
              },
            },
          },
        },
      },
      currentTheme: {
        content: {
          id: 1,
          name: 'Light',
          active: true,
          configuration: {},
        },
      },
      isFetching: false,
      fetchThemeList: spy(),
      updateTheme: spy(),
      deleteTheme: spy(),
      createTheme: spy(),
    }
    const enzymeWrapper = shallow(<ApplicationThemeContainer {...props} />)
    expect(enzymeWrapper.find(ApplicationThemeComponent)).to.have.length(1)
  })
})

