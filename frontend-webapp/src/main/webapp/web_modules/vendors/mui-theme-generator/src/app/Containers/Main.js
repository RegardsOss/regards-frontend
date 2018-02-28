import React from 'react';
import merge from 'lodash/merge'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { getAlternativeThemeConfSubset, ThemeBuilder } from '@regardsoss/theme'

import { Layout } from './Layout';
import Components from '../Components/Components';
import { SideBar } from '../Components/Layout/sidebar'


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


export default class Main extends React.Component {
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
        // redraw the view on every modification
        hackingKey: PropTypes.number,
    }

    render() {
        const { overwrites } = this.props
        // Let's build the second theme runtime conf
        const secondaryThemeConf = ThemeBuilder.getAlternativeTheme(overwrites)
        const alternativeThemeSubset = getAlternativeThemeConfSubset(secondaryThemeConf)
        let theme = {
            mainTheme: ThemeBuilder.getPrimaryTheme(overwrites),
            alternativeTheme: alternativeThemeSubset,
        }

        let sideBar = <SideBar
            theme={theme}
            overwrites={overwrites}
            customConfigurationKeys={this.props.customConfigurationKeys}
            addToOverwrites={this.props.handleAddOverwrite}
            removeFromOverwrites={this.props.handleRemoveOverwrite}
        />

        return (
            <Layout
                muiTheme={theme.mainTheme}
                sideBar={sideBar}
                mainContent={<Components key={this.props.hackingKey} />}
            />
        );
    }
}