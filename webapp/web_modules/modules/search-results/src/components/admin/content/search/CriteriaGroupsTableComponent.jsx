/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import flatMap from 'lodash/flatMap'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TableLayout, InfiniteTableContainer, TableColumnBuilder } from '@regardsoss/components'
import { UIDomain } from '@regardsoss/domain'
import { CriteriaGroup } from '../../../../shapes/ModuleConfiguration'
import { PluginMeta } from '../../../../shapes/form/PluginMeta'
import { CriteriaFormHelper } from './CriteriaFormHelpers'
import IdentifierCellComponent from './cells/IdentifierCellComponent'
import LabelCellComponent from './cells/LabelCellComponent'
import ShowLabelCellComponent from './cells/ShowLabelCellComponent'
import ConfigurationCellComponent from './cells/ConfigurationCellComponent'
import CriterionConfigurationDialogComponent from './dialog/CriterionConfigurationDialogComponent'
import InsertOptionComponent from './options/InsertOptionComponent'
import DeleteOptionComponent from './options/DeleteOptionComponent'
import CriteriaEmptyComponent from './CriteriaEmptyComponent'
import MoveOptionComponent from './options/MoveOptionComponent'

/**
 * Shows criteria group
 * @author Raphaël Mechali
 */
class CriteriaGroupsTableComponent extends React.Component {
  static propTypes = {
    fetchingMetadata: PropTypes.bool.isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    pluginsMetadata: PropTypes.arrayOf(PluginMeta).isRequired,
    groups: PropTypes.arrayOf(CriteriaGroup).isRequired,
    // Edition callbacks
    onUpdateCriterionPlugin: PropTypes.func.isRequired,
    onUpdateElementLabel: PropTypes.func.isRequired,
    onUpdateGroupShowTitle: PropTypes.func.isRequired,
    onUpdateCriterionConfiguration: PropTypes.func.isRequired,
    onInsertGroup: PropTypes.func.isRequired,
    onInsertCriterion: PropTypes.func.isRequired,
    onMoveGroup: PropTypes.func.isRequired,
    onMoveCriterion: PropTypes.func.isRequired,
    onDeleteCriterion: PropTypes.func.isRequired,
    onDeleteGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Converts defined groups into entities list for table
   * @param {[*]} groups configuration as an array of CriteriaGroup
   * @param {[*]} pluginsMetadata available meta as an array of PluginMeta
   * @return {[*]} table entities, as an array of CriteriaEditableRow
   */
  static convertToEntities(groups = [], pluginsMetadata) {
    return flatMap(groups, (group, index) => [{
      label: group.title,
      showTitle: group.showTitle,
      groupIndex: index,
      criteria: group.criteria.map(({ label }) => ({ label })),
      // unused in groups
      criterionIndex: null,
      pluginMetadata: null,
      attributes: null,
    },
    ...group.criteria.map((criterion, criterionIndex) => ({
      label: criterion.label,
      showTitle: null, // unused in criteria
      criteria: null, // unused in criteria
      groupIndex: index,
      criterionIndex,
      pluginMetadata: CriteriaFormHelper.getPluginMetadata(criterion.pluginId, pluginsMetadata),
      configuration: criterion.conf,
    }))])
  }

  state = {
    entities: [],
    configurationDialog: {
      open: false,
      criterionRow: null,
    },
  }

  /**
  * Lifecycle method: component will mount. Used here to detect first properties change and update local state
  */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const newState = { ...this.state }
    if (!isEqual(oldProps.groups, newProps.groups)
    || !isEqual(oldProps.pluginsMetadata, newProps.pluginsMetadata)
    || !isEqual(oldProps.fetchingMetadata, newProps.fetchingMetadata)) {
      // update table entities: set one cell for each group and each child.
      // Nota: while fetching, show no entity but loading state instead
      newState.entities = newProps.fetchingMetadata
        ? [] : CriteriaGroupsTableComponent.convertToEntities(newProps.groups, newProps.pluginsMetadata)
    }
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * User callback: Shows a plugin configuration dialog
   * @param {*} criterion editable row matching CriteriaEditableRow, only for a criterion row with plugin metadata
   * and configuration (that must be granted by caller!)
   */
  onShowConfigurationDialog = (criterionRow) => this.setState({
    configurationDialog: {
      open: true,
      criterionRow,
    },
  })

  /**
   * User callback: Closes configuration edition
   */
  onCancelConfigurationEdition = () => this.setState({ configurationDialog: { open: false, criterionRow: null } })

  /**
   * User callback: Closes configuration edition
   */
  onConfirmConfigurationEdition = (newConfiguration) => {
    const { onUpdateCriterionConfiguration } = this.props
    const { configurationDialog: { criterionRow: { groupIndex, criterionIndex } } } = this.state
    // Close dialog (first, as event will be overridden otherwise by property changes)
    this.setState({
      configurationDialog: {
        open: false,
        criterionRow: null,
      }, // then commit changes
    }, () => onUpdateCriterionConfiguration(groupIndex, criterionIndex, newConfiguration))
  }

  buildColumns = () => {
    const {
      groups, pluginsMetadata, availableAttributes,
      onUpdateCriterionPlugin, onUpdateElementLabel,
      onUpdateGroupShowTitle, onInsertGroup, onInsertCriterion,
      onMoveGroup, onMoveCriterion,
      onDeleteCriterion, onDeleteGroup,
    } = this.props
    const { moduleTheme: { configuration: { content: { searchPane: { showLabelColumnWidth } } } } } = this.context
    const { intl: { formatMessage } } = this.context
    return [
      // identifier
      new TableColumnBuilder('identifier')
        .label(formatMessage({ id: 'search.results.form.configuration.search.pane.identifier.column.label' }))
        .titleHeaderCell().rowCellDefinition({
          Constructor: IdentifierCellComponent,
          props: {
            pluginsMetadata,
            onUpdateCriterionPlugin,
          },
        })
        .build(),
      // label, by locale
      ...UIDomain.LOCALES.map((locale) => new TableColumnBuilder(`label.${locale}`)
        .label(formatMessage({ id: 'search.results.form.configuration.search.pane.label.column.label' }, { locale }))
        .titleHeaderCell()
        .rowCellDefinition({
          Constructor: LabelCellComponent,
          props: {
            locale,
            onUpdateElementLabel,
          },
        })
        .build()),
      // show label
      new TableColumnBuilder('show.label')
        .label(formatMessage({ id: 'search.results.form.configuration.search.pane.show.label.column.label' }))
        .titleHeaderCell().fixedSizing(showLabelColumnWidth)
        .rowCellDefinition({
          Constructor: ShowLabelCellComponent,
          props: {
            onUpdateGroupShowTitle,
          },
        })
        .build(),
      // configuration
      new TableColumnBuilder('configuration')
        .label(formatMessage({ id: 'search.results.form.configuration.search.pane.configuration.column.label' }))
        .titleHeaderCell().rowCellDefinition({
          Constructor: ConfigurationCellComponent,
          props: {
            availableAttributes,
            onShowConfigurationDialog: this.onShowConfigurationDialog,
          },
        })
        .build(),
      // options
      new TableColumnBuilder('options')
        .label(formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.label' }))
        .titleHeaderCell().optionsColumn([{ // 1 - Insert option
          OptionConstructor: InsertOptionComponent,
          optionProps: { onInsertGroup, onInsertCriterion },
        }, {
          OptionConstructor: MoveOptionComponent,
          optionProps: { groups, onMoveGroup, onMoveCriterion },
        }, { // 3 - Delete option
          OptionConstructor: DeleteOptionComponent,
          optionProps: { onDeleteCriterion, onDeleteGroup },
        }])
        .build(),
    ]
  }

  render() {
    const { availableAttributes, fetchingMetadata, onInsertGroup } = this.props
    const { entities, configurationDialog: { open, criterionRow } } = this.state
    const { moduleTheme: { configuration: { content: { searchPane } } } } = this.context
    return (
      <>
        {/* 1. Configuration dialog */}
        <CriterionConfigurationDialogComponent
          open={open}
          criterionRow={criterionRow}
          availableAttributes={availableAttributes}
          onConfirm={this.onConfirmConfigurationEdition}
          onCancel={this.onCancelConfigurationEdition}
        />
        {/* 2. Table */}
        <TableLayout>
          <InfiniteTableContainer
            minRowCount={searchPane.defaultRowsCount}
            maxRowCount={Math.max(searchPane.defaultRowsCount, entities.length)} // Remove inner scrollbar
            columns={this.buildColumns()}
            entities={entities}
            emptyComponent={<CriteriaEmptyComponent onInsertGroup={onInsertGroup} fetching={fetchingMetadata} />}
            stripeRows={false}
          />
        </TableLayout>
      </>
    )
  }
}
export default CriteriaGroupsTableComponent
