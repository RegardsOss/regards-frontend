import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import Paper from 'material-ui/Paper'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import ApplicationThemeComponent from '../../../src/components/theme/ApplicationThemeComponent'

describe('[ADMIN UI MANAGEMENT] Testing application theme component', () => {
  it('should exists', () => {
    assert.isDefined(ApplicationThemeComponent)
    assert.isDefined(Paper)
  })

  it('should render a Paper', () => {
    const props = {
      themeList: {
        1: {
          content: {
            "id": 1,
            "name": "Light",
            "active": true,
            "configuration": {}
          },
        },
        2: {
          content: {
            "id": 2,
            "name": "Dark",
            "active": false,
            "configuration": {
              "palette": {
                "primary1Color": "#a7000b",
              }
            }
          },
        },
      },
      currentTheme: {
        content: {
          "id": 1,
          "name": "Light",
          "active": true,
          "configuration": {}
        },
        isFetching: false,
        onAdd: sinon.spy(),
        onClose: sinon.spy(),
        onSave: sinon.spy(),
        onDelete: sinon.spy(),
      },
    }
    const options = {
      context: {
        muiTheme: getMuiTheme(),
        intl: IntlStub,
      },
    }
    const enzymeWrapper = shallow(<ApplicationThemeComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Paper)
    expect(subComponent).to.have.length(1)
  })
})
