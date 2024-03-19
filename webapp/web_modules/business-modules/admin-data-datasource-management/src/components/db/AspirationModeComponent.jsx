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
import AlertIcon from 'mdi-material-ui/Alert'
import CheckIcon from 'mdi-material-ui/Check'
import { CardTitle, CardText } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { SelectableList, NoContentComponent } from '@regardsoss/components'
import {
  RenderCheckbox,
  Field,
} from '@regardsoss/form-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DBDatasourceFormMappingInputComponent from './DBDatasourceFormMappingInputComponent'
import DBDatasourceHelpers from '../../utils/DBDatasourceHelpers'
import states from '../../domain/db/FormMappingStates'

/**
 * Possible aspiration modes
 */
export const ASPIRATION_MODE_ENUM = {
  NONE: 'NONE',
  BY_DATE: 'BY_DATE',
  BY_ID: 'BY_ID',
}

/**
 * Association of aspiration modes and plugin conf parameters
 */
export const SELECTED_PLUGIN_PARAMETER_ENUM = {
  [ASPIRATION_MODE_ENUM.BY_DATE]: 'lastUpdate',
  [ASPIRATION_MODE_ENUM.BY_ID]: 'columnId',
}

/**
 * @author Théo Lasserre
 */
export class AspirationModeComponent extends React.Component {
  static propTypes = {
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    currentDatasource: DataManagementShapes.Datasource,
    isEditing: PropTypes.bool,
    change: PropTypes.func.isRequired,
    onlyAdvancedConfiguration: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    selectedAspirationMode: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    onlyAdvancedConfiguration: false,
  }

  state = {
    selectedAspirationMode: ASPIRATION_MODE_ENUM.NONE,
    prefix: this.props.onlyAdvancedConfiguration ? states.CUSTOM_FROM : states.FROM_TABLE,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (oldProps.selectedAspirationMode !== newProps.selectedAspirationMode) {
      this.setState({
        selectedAspirationMode: newProps.selectedAspirationMode,
      })
    }
  }

  /**
   * Update local state with selected aspiration mode.
   * @param {*} event
   * @param {*} newAspirationMode
   */
  onChangeAspirationMode = (newAspirationMode) => {
    this.setState({
      selectedAspirationMode: newAspirationMode,
    })
  }

  render() {
    const {
      tableAttributeList, change, currentDatasource, isEditing, onlyAdvancedConfiguration,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        db: {
          aspirationMode: {
            primaryTextStyle, selectItemStyle, subtitleStyle, iconStyle, rightElementStyle, rightElementStyleAlt,
            mainDivStyle, cardTextStyle, leftElementStyle, alertIconStyle, rightElementDivStyle, rightElementInfoStyle,
          },
        },
      },
    } = this.context
    const { selectedAspirationMode, prefix } = this.state
    const isEditingSQL = DBDatasourceHelpers.getIsEditingSQL(SELECTED_PLUGIN_PARAMETER_ENUM[selectedAspirationMode], currentDatasource, tableAttributeList, isEditing)

    return (
      <div style={mainDivStyle}>
        <CardTitle
          title={formatMessage({ id: 'datasource.form.mapping.aspiration.mode.title' })}
          subtitle={formatMessage({ id: 'datasource.form.mapping.aspiration.mode.subtitle' })}
        />
        <CardText style={cardTextStyle}>
          <div style={leftElementStyle}>
            <SelectableList
              defaultValue={selectedAspirationMode}
              onSelect={this.onChangeAspirationMode}
            >
              <ListItem
                key={ASPIRATION_MODE_ENUM.NONE}
                value={ASPIRATION_MODE_ENUM.NONE}
                primaryText={<div style={primaryTextStyle}>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.none' })}</div>}
                secondaryText={<div style={subtitleStyle}>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.none.subtitle' })}</div>}
                style={selectedAspirationMode === ASPIRATION_MODE_ENUM.NONE ? selectItemStyle : null}
                rightIcon={selectedAspirationMode === ASPIRATION_MODE_ENUM.NONE ? <AlertIcon style={alertIconStyle} /> : null}
              />
              <ListItem
                key={ASPIRATION_MODE_ENUM.BY_DATE}
                value={ASPIRATION_MODE_ENUM.BY_DATE}
                primaryText={<div style={primaryTextStyle}>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byDate' })}</div>}
                secondaryText={<div style={subtitleStyle}>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byDate.subtitle' })}</div>}
                style={selectedAspirationMode === ASPIRATION_MODE_ENUM.BY_DATE ? selectItemStyle : null}
                rightIcon={selectedAspirationMode === ASPIRATION_MODE_ENUM.BY_DATE ? <CheckIcon style={iconStyle} /> : null}
              />
              <ListItem
                key={ASPIRATION_MODE_ENUM.BY_ID}
                value={ASPIRATION_MODE_ENUM.BY_ID}
                primaryText={<div style={primaryTextStyle}>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byId' })}</div>}
                secondaryText={<div style={subtitleStyle}>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byId.subtitle' })}</div>}
                style={selectedAspirationMode === ASPIRATION_MODE_ENUM.BY_ID ? selectItemStyle : null}
                rightIcon={selectedAspirationMode === ASPIRATION_MODE_ENUM.BY_ID ? <CheckIcon style={iconStyle} /> : null}
              />
            </SelectableList>
          </div>
          <div style={selectedAspirationMode === ASPIRATION_MODE_ENUM.NONE ? rightElementStyleAlt : rightElementStyle}>
            {
              selectedAspirationMode === ASPIRATION_MODE_ENUM.NONE ?
                <NoContentComponent
                  titleKey="datasource.form.mapping.aspiration.mode.none"
                  Icon={AlertIcon}
                />
                : <div style={rightElementDivStyle}>
                  <div style={rightElementInfoStyle}>
                    {
                      selectedAspirationMode === ASPIRATION_MODE_ENUM.BY_DATE
                        ? formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byDate.info' })
                        : formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byId.info' })
                    }
                  </div>
                  <DBDatasourceFormMappingInputComponent
                    key={SELECTED_PLUGIN_PARAMETER_ENUM[selectedAspirationMode]}
                    modelAttributeName={SELECTED_PLUGIN_PARAMETER_ENUM[selectedAspirationMode]}
                    tableAttributeList={tableAttributeList}
                    isEditingSQL={isEditingSQL}
                    change={change}
                    onlyAdvancedConfiguration={onlyAdvancedConfiguration}
                  />
                </div>
            }
            {
              selectedAspirationMode === ASPIRATION_MODE_ENUM.BY_ID
                ? <div>
                  <Field
                    name={`${prefix}.attributes.uniqueId`}
                    component={RenderCheckbox}
                    noSpacing
                    label={formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byId.non.uniq' })}
                  />
                  <div>{formatMessage({ id: 'datasource.form.mapping.aspiration.mode.byId.non.uniq.warning' })}</div>
                </div>
                : null
            }
          </div>
        </CardText>
      </div>
    )
  }
}

export default AspirationModeComponent
