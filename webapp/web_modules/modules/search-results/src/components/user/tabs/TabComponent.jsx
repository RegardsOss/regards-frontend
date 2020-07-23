/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import ResultsIcon from 'mdi-material-ui/ViewSequential'
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import CloseIcon from 'mdi-material-ui/Close'
import IconButton from 'material-ui/IconButton'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TagLabelHelper } from './results/common/TagLabelHelper'

/** Defines expected tab data for rendering */
export const TabData = PropTypes.shape({
  tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
  selected: PropTypes.bool.isRequired,
  closable: PropTypes.bool.isRequired,
  contextCriterion: UIShapes.TagCriterion, // only for context tab, null otherwise
})

/**
 * Tab component: shows a single results module tab and allows switching / closing it
 * @author Raphaël Mechali
 */
class TabComponent extends React.Component {
  static propTypes = {
    tab: TabData.isRequired,
    settings: UIShapes.UISettings.isRequired,
    // selection control callback: (tabType: string) => ()
    onTabSelected: PropTypes.func.isRequired,
    // close control callback: (tabType: string) => ()
    onTabClosed: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Render data by type */
  static RENDER_DATA_BY_TYPE = {
    [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
      labelKey: 'search.results.tab.main.results',
      IconConstructor: ResultsIcon,
    },
    [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
      labelKey: 'search.results.tab.description',
      IconConstructor: DescriptionIcon,
    },
    [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
      labelKey: 'search.results.tab.tag.results',
      IconConstructor: ResultsIcon,
    },
  }

  /**
   * User selected this tab: invoke parent callback with tab type
   */
  onTabSelected = () => {
    const { tab: { tabType }, onTabSelected } = this.props
    onTabSelected(tabType)
  }

  /**
   * User closed this tab: invoke parent callback with tab type
   */
  onTabClosed = () => {
    const { tab: { tabType }, onTabClosed } = this.props
    onTabClosed(tabType)
  }

  render() {
    const {
      tab: {
        tabType, contextCriterion, selected, closable,
      },
      settings,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          titleBar: {
            tab: {
              selectedContainer, unselectedContainer, iconAndTextGroup, iconColor, icon,
              label, closeIconButton, closeIcon,
            },
          },
        },
      },
    } = this.context

    const { labelKey, IconConstructor } = TabComponent.RENDER_DATA_BY_TYPE[tabType]
    const tabLabel = contextCriterion ? TagLabelHelper.getLabel(formatMessage, contextCriterion, settings) : null
    const labelText = formatMessage({ id: labelKey }, { tabLabel })
    return (
      <div style={selected ? selectedContainer : unselectedContainer}>
        {/* Icon and text group */}
        <div onClick={this.onTabSelected} style={iconAndTextGroup}>
          <IconConstructor style={icon} color={iconColor} />
          <div style={label} title={labelText}>{labelText}</div>
        </div>
        { closable ? (
          <IconButton
            onClick={this.onTabClosed}
            style={closeIconButton}
            iconStyle={closeIcon}
          >
            <CloseIcon />
          </IconButton>) : null}
      </div>
    )
  }
}
export default TabComponent
