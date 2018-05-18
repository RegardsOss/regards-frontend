import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        height: '100%'
    },
    right: {
        // display: 'flex',
        height: '90vh',
        width: 'inherit',
        overflow: 'auto',
    },
    left: {
        width: 500,
        flexShrink: 0
    },
    leftFixed: {
        height: '90vh',
        width: 'inherit'
    },
    leftScrollContent: {
        maxHeight: '100%',
        overflowY: 'overlay',
        paddingLeft: 30,
        paddingRight: 20,
        marginRight: 3
    }
};


export const Layout = ({ muiTheme, sideBar, mainContent, children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Paper zDepth={1} >
            <div style={{ ...styles.container }}>
                <div style={styles.left}>
                    <div style={styles.leftFixed}>
                        <div style={{ ...styles.leftScrollContent }} >
                            {sideBar}
                        </div>
                    </div>
                </div>
                <div style={styles.right}>
                    <div style={{ ...styles.leftScrollContent }} >

                        {mainContent}
                        {children}
                    </div>
                </div>
            </div>
        </Paper>
    </MuiThemeProvider>
);