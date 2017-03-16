import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CreateButton from '../../../src/components/theme/CreateButton'
import ThemeCreateComponent from '../../../src/components/theme/ThemeCreateComponent'

describe('[ADMIN UI MANAGEMENT] Testing create button component', () => {
  it('should exists', () => {
    assert.isDefined(CreateButton)
    assert.isDefined(ThemeCreateComponent)
  })

  it('should render a ThemeCreateComponent', () => {
    const props = {
      onCreate: spy(),
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
