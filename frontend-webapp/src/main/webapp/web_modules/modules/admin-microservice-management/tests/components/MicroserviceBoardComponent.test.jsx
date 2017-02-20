import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { IntlStub } from '@regardsoss/tests-helpers'
import { BoardComponent } from '@regardsoss/components'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

describe('[ADMIN PROJECT MANAGEMENT] Testing microservice board component', () => {
  it('should exists', () => {
    assert.isDefined(MicroserviceBoardComponent)
    assert.isDefined(BoardComponent)
  })

  it('should render sub-components', () => {
    const props = {
      project: 'someProject',
      maintenanceList: {
        'rs-access': {
          CDPP: true,
          SSALTO: false,
        },
        'rs-admin': {
          CDPP: true,
          SSALTO: false,
        },
        'rs-cloud': {
          CDPP: false,
          SSALTO: false,
        },
        'rs-dam': {
          CDPP: false,
          SSALTO: false,
        },
        'rs-gateway': {
          CDPP: false,
          SSALTO: true,
        },
      },
    }
    const options = {
      context: {
        intl: IntlStub,
      },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(BoardComponent)
    expect(subComponent).to.have.length(1)
  })
})
