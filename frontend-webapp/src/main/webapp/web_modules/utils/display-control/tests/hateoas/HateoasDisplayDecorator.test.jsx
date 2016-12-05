/**
 * @author lmieulet
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { HateoasDisplayDecorator } from '../../src/hateoas/HateoasDisplayDecorator'
import DisplayDecorator from '../../src/DisplayDecorator'


describe('[DISPLAY CONTROL UTILS] Testing HateoasDisplayDecorator', () => {
  it('should exists', () => {
    assert.isDefined(HateoasDisplayDecorator)
  })

  it('should render self and subcomponents', () => {
    const props = {
      endpoints: [],
      children: (<div />),
    }

    const enzymeWrapper = shallow(<HateoasDisplayDecorator {...props} />)
    const subComponent = enzymeWrapper.find('div')
    expect(subComponent).to.have.length(1)
    const subComponent2 = enzymeWrapper.find(DisplayDecorator)
    expect(subComponent2).to.have.length(1)
  })
})
