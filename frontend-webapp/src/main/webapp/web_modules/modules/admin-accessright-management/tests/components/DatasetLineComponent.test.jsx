/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import DatasetLineComponent from '../../src/components/DatasetLineComponent'
import DatasetDump from '../model/dump/DatasetDump'

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing DatasetLineComponent', () => {
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
    assert.isDefined(DatasetLineComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      onDelete: () => {},
      entity: DatasetDump[23],
      accessRights: [],
    }
    const enzymeWrapper = shallow(<DatasetLineComponent {...props} />, { context })
    expect(enzymeWrapper.find('div')).to.have.length(1)
    expect(enzymeWrapper.find('a')).to.have.length(0)
  })
})
