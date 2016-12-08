import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DatabaseConnectionList  from '@regardsoss/admin-database-management/src/components/DatabaseConnectionList'
import DatabaseConnectionTester  from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTester'
import OnHoverSwitchIconButton  from '@regardsoss/components/src/buttons/OnHoverSwitchIconButton'
import PlayArrow  from 'material-ui/svg-icons/av/play-arrow'
import Check  from 'material-ui/svg-icons/navigation/check'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const connectionsList = {
  0: {
    content: {
      id: 0,
      projectName: 'cdpp',
      microservice: 'rs-admin',
      userName: 'Alice',
      password: 'password',
      driverClassName: 'aDriverClassName',
      url: 'http://aUrl'
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      projectName: 'cdpp',
      microservice: 'rs-cloud',
      userName: 'Bob',
      password: 'azerty',
      driverClassName: 'otherDriverClassName',
      url: 'http://otherUrl'
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      projectName: 'cdpp',
      microservice: 'rs-dam',
      userName: 'Charlie',
      password: 'qsdfgh',
      driverClassName: 'someDriverClassName',
      url: 'http://someUrl'
    },
    links: [],
  }
}

storiesOf('InstanceAdmin - Database', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Connection tester buttons', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <OnHoverSwitchIconButton>
          <Check/>
          <PlayArrow/>
        </OnHoverSwitchIconButton>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTester />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const list = object('Connections list', connectionsList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionList
          list={list}
        />
      </ThemeAndLocaleDecorator>
    )
  })
