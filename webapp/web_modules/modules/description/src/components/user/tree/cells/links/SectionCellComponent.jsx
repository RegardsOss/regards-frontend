/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import TreeLinkComponent from './TreeLinkComponent'
import { TabTitlesConfiguration } from '../../../../../shapes/ModuleConfiguration'

/**
 * Component to show a section cell
 * @author Raphaël Mechali
 */
class SectionCellComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(UIDomain.DESCRIPTION_BROWSING_SECTIONS).isRequired,
    selected: PropTypes.bool.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // optional tab titles
    tabTitles: TabTitlesConfiguration,
  }

  static defaultProps = {
    tabTitles: {},
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User on click callback: selected section inner link
   */
  onClick = () => {
    const { type, onSelectInnerLink } = this.props
    onSelectInnerLink(type)
  }

  render() {
    const { type, selected, tabTitles } = this.props
    const { intl: { locale, formatMessage } } = this.context
    return (
      <TreeLinkComponent
        text={get(tabTitles[type], `${locale}`) || formatMessage({ id: `module.description.tree.section.${type}.label` })}
        tooltip={get(tabTitles[type], `${locale}`) || formatMessage({ id: `module.description.tree.section.${type}.tooltip` })}
        selected={selected}
        disabled={false}
        onClick={this.onClick}
        section
      />)
  }
}
export default SectionCellComponent
