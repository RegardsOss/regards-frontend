import AppBar from "material-ui/AppBar";

const AppBars = ({theme}) => (
  <div>
    <AppBar title="primary1Color" style={{backgroundColor: theme.palette.primary1Color}}/>
    <AppBar title="primary2Color" style={{backgroundColor: theme.palette.primary2Color}}/>
    <AppBar title="primary3Color" style={{backgroundColor: theme.palette.primary3Color}}/>
    <AppBar title="accent1Color" style={{backgroundColor: theme.palette.accent1Color}}/>
    <AppBar title="accent2Color" style={{backgroundColor: theme.palette.accent2Color}}/>
    <AppBar title="accent3Color" style={{backgroundColor: theme.palette.accent3Color}}/>
  </div>
)

AppBars.propTypes = {
  theme: React.PropTypes.object.isRequired
};

export default AppBars
