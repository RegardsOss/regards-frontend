/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import { CatalogEntity } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display datasets in search results.
 *
 * @author Sébastien binda
 */
class DatasetCellComponent extends React.Component {

  static propTypes = {

    entity: CatalogEntity,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      style: { height: '100%', width: '80%', margin: 'auto', cursor: 'pointer' },
    }
  }

  onDatasetSelection = () => {
    this.props.onClick(this.props.entity)
  }

  setHoverStyle = () => {
    this.setState({
      style: { height: '100%', width: '80%', margin: 'auto', cursor: 'pointer', backgroundColor: this.context.muiTheme.palette.primary3Color },
    })
  }
  setStandardStyle = () => {
    this.setState({
      style: { height: '100%', width: '80%', margin: 'auto', cursor: 'pointer' },
    })
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
          title={this.props.entity.content.label}
          titleStyle={{
            fontSize: '1.3em',
          }}
          style={{
            paddingBottom: 0,
          }}
        />
        <CardText>
          <div style={{ display: 'flex', marginTop: 10 }}>
            {map(this.props.entity.content.properties, (property, key) => (
              <Chip key={key} style={{ margin: '0px 5px' }}>
                <span
                  style={{
                    color: this.context.muiTheme.palette.accent1Color,
                  }}
                >{key}</span>
                  :
                  {property}
              </Chip>
              ))}
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DatasetCellComponent
