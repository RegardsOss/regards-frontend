/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import {
  CardActionsComponent, TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults,
} from '@regardsoss/components'
import { CommonShapes } from '@regardsoss/shape'
import PluginStorageConfigurationEditAction from './PluginStorageConfigurationEditAction'
import PluginStorageConfigurationDuplicateAction from './PluginStorageConfigurationDuplicateAction'
import PluginStorageConfigurationPriorityAction from './PluginStorageConfigurationPriorityAction'
import messages from '../i18n'
import styles from '../styles'

/**
* Comment Here
* @author Sébastien Binda
*/
export class PluginStorageConfigurationListComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onNewPluginConf: PropTypes.func.isRequired,
    onEditPluginConf: PropTypes.func.isRequired,
    onDuplicatePluginConf: PropTypes.func.isRequired,
    pluginConfigurations: CommonShapes.PluginConfigurationArray.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  onUp = (pluginConf) => {

  }

  onDown = (pluginConf) => {

  }

  render() {
    const {
      onBack, onNewPluginConf, pluginConfigurations, isLoading,
    } = this.props
    const { intl: { formatMessage }, moduleTheme, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    // Table columns to display
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.name', 'name', 'content.label'),
      TableColumnBuilder.buildSimplePropertyColumn('column.type', 'type', 'content.pluginId'),
      TableColumnBuilder.buildSimplePropertyColumn('column.active', 'active', 'content.active'),
      TableColumnBuilder.buildOptionsColumn('', [{
        OptionConstructor: PluginStorageConfigurationEditAction,
        optionProps: { onEdit: this.props.onEditPluginConf },
      },
      {
        OptionConstructor: PluginStorageConfigurationDuplicateAction,
        optionProps: { onDuplicate: this.props.onDuplicatePluginConf },
      },
      {
        OptionConstructor: PluginStorageConfigurationPriorityAction,
        optionProps: { onUp: this.onUp },
      },
      {
        OptionConstructor: PluginStorageConfigurationPriorityAction,
        optionProps: { onDown: this.onDown },
      },
      ], true, fixedColumnWidth),
    ]
    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'processing-chain.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'storage.data-storage.plugins.list.title' })}
          subtitle={formatMessage({ id: 'storage.data-storage.plugins.list.subtitle' })}
        />
        <CardText style={moduleTheme.root} >
          <TableLayout>
            <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={pluginConfigurations.length} />
            <InfiniteTableContainer
              columns={columns}
              entities={pluginConfigurations}
              emptyComponent={emptyComponent}
              entitiesCount={pluginConfigurations.length}
              minRowCount={0}
              maxRowCount={30}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.list.add.button' })}
            mainButtonClick={onNewPluginConf}
            // TODO
            // mainHateoasDependencies={}
            secondaryButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(PluginStorageConfigurationListComponent))
