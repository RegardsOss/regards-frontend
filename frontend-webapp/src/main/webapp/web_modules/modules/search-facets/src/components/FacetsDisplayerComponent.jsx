/**
* LICENSE_PLACEHOLDER
**/
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FacetArray } from '../model/FacetShape'
import { } from './DateRangeFacetSelectorComponent'
import { } from './NumberRangeFacetSelectorComponent'
import { } from './WordFacetSelectorComponent'

/**
* Root search facets module display component, used by corresponding container
*/
class FacetsDisplayerComponent extends React.Component {


  static propTypes = {
    facets: FacetArray,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { } = this.props
    const { muiTheme, intl: { formatMessage } } = this.context
    return (
      <Toolbar >
        <ToolbarTitle
          text={formatMessage({ id: 'search.facets.title' })}
          style={{ color: muiTheme.palette.textColor }}
        />

      </Toolbar>
    )
  }
}
export default FacetsDisplayerComponent
