/**
 * @author lmieulet
 */
import { ShowableAtRender } from '@regardsoss/components'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DisplayDecorator from '../src/DisplayDecorator'

describe('[DISPLAY CONTROL UTILS] Testing DisplayDecorator', () => {
  it('should render self and subcomponents', () => {
    const props = {
      displayLogic() { return true },
      children: (<div />),
    }
    const enzymeWrapper = shallow(<DisplayDecorator {...props} />)
    const subComponent = enzymeWrapper.find(ShowableAtRender)
    expect(subComponent).to.have.length(1)
  })
})
