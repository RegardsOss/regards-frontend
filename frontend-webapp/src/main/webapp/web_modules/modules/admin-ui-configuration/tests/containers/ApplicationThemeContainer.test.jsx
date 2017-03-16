/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import { ApplicationThemeContainer } from '../../src/containers/ApplicationThemeContainer'
import ApplicationThemeComponent from '../../src/components/theme/ApplicationThemeComponent'

/**
 * Tests for ApplicationLayoutContainer
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN UI MANAGEMENT] Testing theme container', () => {
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

