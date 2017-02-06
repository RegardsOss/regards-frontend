/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import DatasetEditLinksComponent from '../../src/components/DatasetEditLinksComponent'
import DatasetStepperComponent from '../../src/components/DatasetStepperComponent'


describe('[ADMIN DATA DATASET MANAGEMENT] Testing DatasetEditLinksComponent', () => {
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
    assert.isDefined(DatasetEditLinksComponent)
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
      linkedDatasets: [
        { content: {
          type: 'DATASET',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:DATASET:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:DATASET:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'DATASET',
          },
        } },
      ],
      remainingDatasets: [
        { content: {
          type: 'DATASET',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:DATASET:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:DATASET:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'DATASET',
          },
        } }, { content: {
          type: 'DATASET',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:DATASET:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:DATASET:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'DATASET',
          },
        } },
      ],
    }
    const enzymeWrapper = shallow(<DatasetEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(3)
    expect(enzymeWrapper.find(DatasetStepperComponent)).to.have.length(1)
  })
})
