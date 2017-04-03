import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CreateButton from '../../src/components/CreateButton'
import ThemeCreateComponent from '../../src/components/ThemeCreateComponent'

describe('[ADMIN UI THEME MANAGEMENT] Testing create button component', () => {
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
    assert.isDefined(CreateButton)
    assert.isDefined(ThemeCreateComponent)
  })

  it('should render a ThemeCreateComponent', () => {
    const props = {
      onCreate: spy(),
      entityLinks: [],
    }
    const options = {
      context: {
        muiTheme: getMuiTheme(),
      },
    }
    const enzymeWrapper = shallow(<CreateButton {...props} />, options)
    const subComponent = enzymeWrapper.find(ThemeCreateComponent)
    expect(subComponent).to.have.length(1)
  })
})
