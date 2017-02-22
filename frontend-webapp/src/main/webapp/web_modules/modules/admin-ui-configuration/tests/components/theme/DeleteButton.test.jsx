import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DeleteButton from '../../../src/components/theme/DeleteButton'
import IconButton from 'material-ui/IconButton'

describe('[ADMIN UI MANAGEMENT] Testing delete button component', () => {
  it('should exists', () => {
    assert.isDefined(DeleteButton)
    assert.isDefined(IconButton)
  })

  it('should render a ThemeCreateComponent', () => {
    const props = {
      onDelete: sinon.spy(),
    }
    const options = {
      context: {
        muiTheme: getMuiTheme(),
      },
    }
    const enzymeWrapper = shallow(<DeleteButton {...props} />, options)
    const subComponent = enzymeWrapper.find(IconButton)
    expect(subComponent).to.have.length(1)
  })
})
