import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Link } from 'react-router'
import BoardComponent from '../../src/components/BoardComponent'

// Test a component rendering
describe('[ADMIN DATA MANAGEMENT] Testing BoardComponent', () => {
  it('should exists', () => {
    assert.isDefined(BoardComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project: 'myproject',
      },
    }
    const options = {
      context: {
        muiTheme: {
          adminApp: {
            datamanagement: {
              home: {
                action: {
                  classes: ['clas1', 'clas2'],
                  style: {},
                },
                section1: {
                  items: {
                    classes: ['clas1', 'clas2'],
                    style: {},
                  },
                  container: {
                    classes: ['clas1', 'clas2'],
                    style: {},
                  },
                },
              },
            },
          },
          linkWithoutDecoration: {
          },
        },
        intl: {
          formatMessage() {},
          formatDate() {},
        },
      },
    }

    const enzymeWrapper = shallow(<BoardComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Link)
    expect(subComponent).to.have.length(4)
  })
})
