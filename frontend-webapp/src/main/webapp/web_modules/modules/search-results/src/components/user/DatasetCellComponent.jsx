/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import {themeContextType}from '@regardsoss/theme'

/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class DatasetCellComponent extends React.Component {

  static propTypes = {
    entity: React.PropTypes.object,
    lineHeight: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType
  }

  constructor(props) {
    super(props)
    this.state ={
      style: {height: '100%', width: '80%', margin: 'auto', cursor: 'pointer'}
    }
  }

  setHoverStyle = () => {
    this.setState({
      style: {height: '100%', width: '80%', margin: 'auto', cursor: 'pointer',backgroundColor: this.context.muiTheme.palette.primary3Color}
    })
  }
  setStandardStyle = () => {
    this.setState({
      style: {height: '100%', width: '80%', margin: 'auto', cursor: 'pointer'}
    })
  }

  onDatasetSelection = () => {
    this.props.onClick(this.props.entity)
  }

  render() {
    return (
      <Card
        style={this.state.style}
        onMouseEnter={this.setHoverStyle}
        onMouseLeave={this.setStandardStyle}
        onTouchTap={this.onDatasetSelection}
      >
        <CardHeader
          title={this.props.entity.label}
          style={{
            paddingBottom: 0
          }}
        />
        <CardText>
          <Divider />
          <div style={{display: 'flex',marginTop: 10}}>
            {map(this.props.entity.properties, (property, key) => {
              return (
                <Chip key={key} style={{margin: '0px 5px'}}>
                  <span style={{
                    fontSize: '1.2em',
                    fontWeight: 'Bold',
                    color: this.context.muiTheme.palette.accent1Color
                  }}>{key}</span>
                  :
                  {property}
                </Chip>
              )
            })}
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DatasetCellComponent
