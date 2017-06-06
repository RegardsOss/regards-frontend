/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import Chip from 'material-ui/Chip'
import Card from 'material-ui/Card'
import LabelIcon from 'material-ui/svg-icons/action/label'
import { FormattedMessage } from 'react-intl'

/**
 * React component to display tags of a given entity
 */
class TagsViewComponent extends React.Component {

  static propTypes = {
    // Tags to display
    tags: PropTypes.arrayOf(PropTypes.string),
    // Callaback after tag selection
    onSearchTag: PropTypes.func,
  }

  render() {
    const cardStyles = { marginTop: 20 }
    const titleStyle = {
      margin: 5,
      display: 'flex',
      alignItems: 'center',
    }
    const labelStyle = { marginRight: 5 }
    const contentStyle = { display: 'flex' }
    const chipStyle = { margin: 5 }
    return (
      <Card style={cardStyles}>
        <h1 style={titleStyle}>
          <LabelIcon style={labelStyle} />
          <FormattedMessage id="entities.tags.title" />
        </h1>
        <div style={contentStyle}>
          {this.props.tags && this.props.tags.length > 0 ? map(this.props.tags, tag =>
            (<Chip
              key={tag}
              onTouchTap={() => this.props.onSearchTag(tag)}
              style={chipStyle}
            >
              {tag}
            </Chip>)) : <FormattedMessage id="entities.no.tags.found" />}
        </div>
      </Card>
    )
  }

}

export default TagsViewComponent
