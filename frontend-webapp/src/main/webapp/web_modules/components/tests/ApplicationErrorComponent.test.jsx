/**
 * @author lmieulet
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ApplicationErrorComponent } from '../src/ApplicationErrorComponent'


describe('[COMPONENTS] Testing ApplicationErrorComponent', () => {
  it('should exists', () => {
    assert.isDefined(ApplicationErrorComponent)
  })

  it('should render self and subcomponents', () => {
    const enzymeWrapper = shallow(<ApplicationErrorComponent />)
    const subComponent = enzymeWrapper.find('div')
    expect(subComponent).to.have.length(1)
  })
})
