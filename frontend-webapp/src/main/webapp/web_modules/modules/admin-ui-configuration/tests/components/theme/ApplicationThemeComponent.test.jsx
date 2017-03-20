import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import Paper from 'material-ui/Paper'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import ApplicationThemeComponent from '../../../src/components/theme/ApplicationThemeComponent'

describe('[ADMIN UI MANAGEMENT] Testing application theme component', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
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
      context: {
        muiTheme: getMuiTheme(),
        intl: IntlStub,
      },
    }
    const enzymeWrapper = shallow(<ApplicationThemeComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Paper)
    expect(subComponent).to.have.length(1)
  })
})
