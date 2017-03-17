/**
* LICENSE_PLACEHOLDER
**/
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FacetArray, FacetTypes } from '../model/FacetShape'
import DateRangeFacetSelectorComponent from './DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from './NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from './WordFacetSelectorComponent'

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
    const { facets } = this.props
    const { muiTheme, intl: { formatMessage } } = this.context
    return (
      <div>
        <Toolbar >
          <ToolbarTitle
            text={formatMessage({ id: 'search.facets.title' })}
            style={{ color: muiTheme.palette.textColor }}
          />

        </Toolbar>
        {
          facets.map((facet) => {
            switch (facet.type) {
              case FacetTypes.String:
                return (<WordFacetSelectorComponent facet={facet} key={facet.attributeName} />)
              case FacetTypes.Number:
                return (<NumberRangeFacetSelectorComponent facet={facet} key={facet.attributeName} />)
              case FacetTypes.Date:
                return (<DateRangeFacetSelectorComponent facet={facet} key={facet.attributeName} />)
              default:
                throw new Error(`Unknown facet type ${facet.type}`)
            }
          })
        }
      </div>
    )
  }
}
export default FacetsDisplayerComponent
