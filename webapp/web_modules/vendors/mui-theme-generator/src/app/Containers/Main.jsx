import React from 'react'
import merge from 'lodash/merge'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import { getAlternativeThemeConfSubset, ThemeBuilder } from '@regardsoss/theme'
import { withI18n } from '@regardsoss/i18n'
import { Layout } from './Layout'
import Components from '../Components/Components'
import { SideBar } from '../Components/Layout/SideBar'
import messages from '../i18n'


const styles = {
  container: {
    listItem: {
      innerDiv: {
        paddingTop: 6,
        paddingBottom: 6
      },
      rightIcon: {
        top: 0,
        marginTop: 10
      },
      leftIcon: {
        marginTop: 0,
        padding: 0
      }
    }
  }
}


class Main extends React.Component {
  static propTypes = {
    // theme stored on the server
    overwrites: PropTypes.shape({
      mainTheme: PropTypes.object,
      secondaryTheme: PropTypes.object,
    }),
    // Regards components
    customConfigurationKeys: PropTypes.arrayOf(PropTypes.string),
    handleAddOverwrite: PropTypes.func,
    handleRemoveOverwrite: PropTypes.func,
    handleResetOverwrite: PropTypes.func,
    // redraw the view on every modification
    hackingKey: PropTypes.number,
  }

  render() {
    const { overwrites } = this.props
    // Let's build the second theme runtime conf
    const secondaryThemeConf = ThemeBuilder.getAlternativeTheme(overwrites)
    const alternativeThemeSubset = getAlternativeThemeConfSubset(secondaryThemeConf)
    const theme = {
      mainTheme: ThemeBuilder.getPrimaryTheme(overwrites),
      alternativeTheme: alternativeThemeSubset,
    }

    const sideBar = <SideBar
      theme={theme}
      overwrites={overwrites}
      customConfigurationKeys={this.props.customConfigurationKeys}
      addToOverwrites={this.props.handleAddOverwrite}
      removeFromOverwrites={this.props.handleRemoveOverwrite}
      handleResetOverwrite={this.props.handleResetOverwrite}
    />

    return (
      <Layout
        muiTheme={theme.mainTheme}
        sideBar={sideBar}
        mainContent={<Components key={this.props.hackingKey} />}
      />
    )
  }
}

// export with intl context
export default withI18n(messages)(Main)
