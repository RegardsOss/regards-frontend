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
import Paper from 'material-ui/Paper'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import ApplicationThemeComponent from '../../src/components/ApplicationThemeComponent'

describe('[ADMIN UI THEME MANAGEMENT] Testing application theme component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplicationThemeComponent)
    assert.isDefined(Paper)
  })

  it('should render a Paper', () => {
    const props = {
      themeList: {
        1: {
          content: {
            id: 1,
            name: 'Light',
            active: true,
            configuration: {},
          },
          links: [],
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
          links: [],
        },
      },
      currentTheme: {
        content: {
          id: 1,
          name: 'Light',
          active: true,
          configuration: {},
        },
        links: [],
        isFetching: false,
        onAdd: spy(),
        onClose: spy(),
        onSave: spy(),
        onDelete: spy(),
      },
    }
    const options = {
      context: buildTestContext(),
    }
    const enzymeWrapper = shallow(<ApplicationThemeComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Paper)
    expect(subComponent).to.have.length(1)
  })
})
