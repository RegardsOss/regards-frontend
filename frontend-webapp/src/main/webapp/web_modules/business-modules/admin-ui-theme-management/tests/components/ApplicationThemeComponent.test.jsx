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
