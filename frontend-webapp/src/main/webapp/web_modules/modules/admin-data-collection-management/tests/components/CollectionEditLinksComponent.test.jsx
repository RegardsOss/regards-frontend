/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import CollectionEditLinksComponent from '../../src/components/CollectionEditLinksComponent'
import CollectionStepperComponent from '../../src/components/CollectionStepperComponent'


describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionEditLinksComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(CollectionEditLinksComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {},
  }
  it('Render properly', () => {
    const props = {
      backUrl: '#',
      doneUrl: '#',
      handleDelete: () => {},
      handleAdd: () => {},
      linkedCollections: [
        { content: {
          type: 'COLLECTION',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'COLLECTION',
          },
        } },
      ],
      remainingCollections: [
        { content: {
          type: 'COLLECTION',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'COLLECTION',
          },
        } }, { content: {
          type: 'COLLECTION',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'COLLECTION',
          },
        } },
      ],
    }
    const enzymeWrapper = shallow(<CollectionEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(3)
    expect(enzymeWrapper.find(CollectionStepperComponent)).to.have.length(1)
  })
})
