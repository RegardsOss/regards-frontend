/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { TableBody, TableRow } from 'material-ui/Table'
import ModuleListComponent from '../../src/components/ModuleListComponent'

describe('[ADMIN UI-CONFIGURATION] Testing Modules list component', () => {
  it('Should render correctly a list of availables modules', () => {
    const options = {
      context: {
        muiTheme: {
          palette: {
            primary1Color: 'White',
            accent1Color: 'White',
            pickerHeaderColor: 'White',
          },
        },
        intl: {
          formatMessage: opt => opt.id,
        },
      },
    }
    const props = {
      modules: [{
        content: {
          id: 1,
          name: 'module',
          description: 'First Module',
          active: true,
          applicationId: 'user',
          container: 'content',
          conf: {},
        },
      }],
      onCreate: () => {},
      onEdit: () => {},
      onDelete: () => {},
      onCreation: () => {},
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />
    , options)

    expect(wrapper.find(TableBody).find(TableRow)).to.have.length(1)
  })
})
