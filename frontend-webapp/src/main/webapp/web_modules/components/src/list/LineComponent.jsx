/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import Checkbox from 'material-ui/Checkbox'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display a line into the PageableListComponent.
 */
class LineComponent extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    entity: React.PropTypes.object.isRequired,
    lineComponent: React.PropTypes.func.isRequired,
    displayCheckbox: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onEntityCheck: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
  }

  static defaultProps = {
    displayCheckbox: true,
    disabled: false,
    onEntityCheck: () => {},
    isSelected: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const element = React.createElement(
      this.props.lineComponent,
      merge({}, { entity: this.props.entity.content }),
    )

    let checkbox = null
    if (this.props.displayCheckbox === true) {
      checkbox = (
        <div style={{ maxWidth: 150, display: 'inline-block' }}>
          <Checkbox
            checked={this.props.isSelected}
            onCheck={() => this.props.onEntityCheck(this.props.entity.content)}
            disabled={this.props.disabled}
          />
        </div>
      )
    }

    return (
      <div className="infinite-list-item" style={{ lineHeight: '38px' }}>
        {checkbox}
        <div style={{ display: 'inline-block' }}>
          {element}
        </div>
      </div>
    )
  }

}

LineComponent.defaultProps = {
  isSelected: false,
}

export default LineComponent
