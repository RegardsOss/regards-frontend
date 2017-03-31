import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { HateoasIconAction } from '@regardsoss/display-control'
import DeleteButton from '../../src/components/DeleteButton'

describe('[ADMIN UI MANAGEMENT] Testing delete button component', () => {
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
    assert.isDefined(DeleteButton)
    assert.isDefined(HateoasIconAction)
  })

  it('should render a ThemeCreateComponent', () => {
    const props = {
      onDelete: spy(),
      entityLinks: [],
    }
    const options = {
      context: {
        muiTheme: getMuiTheme(),
      },
    }
    const enzymeWrapper = shallow(<DeleteButton {...props} />, options)
    const subComponent = enzymeWrapper.find(HateoasIconAction)
    expect(subComponent).to.have.length(1)
  })
})
