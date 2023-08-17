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
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { i18nContextType } from '@regardsoss/i18n'
import { converter } from '@regardsoss/units'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import ConeAngleHelper from '../utils/ConeAngleHelper'
import RightAscensionHelper from '../utils/RightAscensionHelper'
import DeclinaisonHelper from '../utils/DeclinaisonHelper'
import SpatialNameHelper from '../utils/SpatialNameHelper'
import { OPTIONS_ENUM, OPTIONS } from '../domain/Options'

const FIELDS_ENUM = {
  SPATIAL_NAME: 'SPATIAL_NAME',
  ANGLE: 'ANGLE',
  RIGHT_ASCENSION: 'RIGHT_ASCENSION',
  DECLINAISON: 'DECLINAISON',
  UNIT_SELECTED: 'UNIT_SELECTED',
}

/**
 * Main plugin component
 * @author Théo Lasserre
 */
class CriterionComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    spatialName: PropTypes.string,
    onSpatialNameInput: PropTypes.func.isRequired,
    angle: PropTypes.string.isRequired,
    onAngleInput: PropTypes.func.isRequired,
    invalidSNR: PropTypes.bool.isRequired,
    rightAscension: PropTypes.string,
    declinaison: PropTypes.string,
    onRightAscensionInput: PropTypes.func.isRequired,
    onDeclinaisonInput: PropTypes.func.isRequired,
    optionSelected: PropTypes.oneOf(OPTIONS).isRequired,
    onChangeOption: PropTypes.func.isRequired,
    unitSelected: PropTypes.oneOf(converter.UNITS).isRequired,
    onChangeUnit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Display error text depending on option choosen by user.
   * Validation of multiple field of a choosen option is on when at least one of fields of the choosen option is set
   * @param {oneOf(FIELDS_ENUM)} fieldType
   * @returns a text error message or null
   */
  computeErrorText = (fieldType) => {
    const {
      optionSelected, spatialName, invalidSNR, angle, rightAscension, declinaison, unitSelected,
    } = this.props
    const { intl: { formatMessage } } = this.context
    if (optionSelected === OPTIONS_ENUM.SNR) {
      if (fieldType === FIELDS_ENUM.SPATIAL_NAME && SpatialNameHelper.isSpatialNameInError(spatialName, angle, invalidSNR)) {
        return formatMessage({ id: 'snr-criterion.resolution.error.message' })
      }
      if (fieldType === FIELDS_ENUM.ANGLE && ConeAngleHelper.isAngleSNRInError(spatialName, angle, unitSelected)) {
        return formatMessage({ id: `snr-criterion.cone.angle.${unitSelected}.error.message` })
      }
    } else if (optionSelected === OPTIONS_ENUM.DIRECT_VALUES) {
      if (fieldType === FIELDS_ENUM.RIGHT_ASCENSION && RightAscensionHelper.isRightAscensionInError(declinaison, rightAscension, angle, unitSelected)) {
        return formatMessage({ id: `snr-criterion.right.ascension.${unitSelected}.error.message` })
      }
      if (fieldType === FIELDS_ENUM.DECLINAISON && DeclinaisonHelper.isDeclinaisonInError(declinaison, rightAscension, angle, unitSelected)) {
        return formatMessage({ id: `snr-criterion.declinaison.${unitSelected}.error.message` })
      }
      if (fieldType === FIELDS_ENUM.ANGLE && ConeAngleHelper.isAngleDirectValuesInError(declinaison, rightAscension, angle, unitSelected)) {
        return formatMessage({ id: `snr-criterion.cone.angle.${unitSelected}.error.message` })
      }
    }
    return null
  }

  render() {
    const {
      spatialName, onSpatialNameInput,
      angle, onAngleInput, label, rightAscension, declinaison,
      onRightAscensionInput, onDeclinaisonInput, optionSelected,
      onChangeOption, unitSelected, onChangeUnit,
    } = this.props
    const {
      intl: { formatMessage, locale },
      moduleTheme: {
        radioButtonGroupStyle, fieldLineStyle, labelDivStyle, textFieldDivStyle,
        unitIconStyle, unitLabelSyle, fieldLineStyleAlt, errorTextStyle,
      }, muiTheme,
    } = this.context
    return (
      <>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          {/* 1. Label */}
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
            {`${label[locale]}`}
          </td>
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            <RadioButtonGroup
              name="option-selector"
              defaultSelected={optionSelected}
              onChange={onChangeOption}
              style={radioButtonGroupStyle}
            >
              <RadioButton
                value={OPTIONS_ENUM.SNR}
                label={formatMessage({ id: 'snr-criterion.option.SNR' })}
              />
              <RadioButton
                value={OPTIONS_ENUM.DIRECT_VALUES}
                label={formatMessage({ id: 'snr-criterion.option.DIRECT_VALUES' })}
              />
            </RadioButtonGroup>
          </td>
        </tr>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            {
              // Spatial name input
              optionSelected === OPTIONS_ENUM.SNR ? (
                <div style={fieldLineStyle}>
                  <div style={labelDivStyle}>
                    {formatMessage({ id: 'snr-criterion.spatial.name.field' })}
                  </div>
                  <div style={textFieldDivStyle}>
                    <TextField
                      title={formatMessage({ id: 'snr-criterion.spatial.name.field' })}
                      hintText={formatMessage({ id: 'snr-criterion.spatial.name.field' })}
                      value={spatialName}
                      onChange={onSpatialNameInput}
                      fullWidth
                      errorText={this.computeErrorText(FIELDS_ENUM.SPATIAL_NAME)}
                      errorStyle={errorTextStyle}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div style={fieldLineStyle}>
                    <div style={labelDivStyle}>
                      {formatMessage({ id: 'snr-criterion.right.ascension.field' })}
                    </div>
                    <div style={textFieldDivStyle}>
                      <TextField
                        title={formatMessage({ id: 'snr-criterion.right.ascension.field' })}
                        type="number"
                        hintText={formatMessage({ id: 'snr-criterion.right.ascension.field' })}
                        value={rightAscension}
                        fullWidth
                        onChange={onRightAscensionInput}
                        errorText={this.computeErrorText(FIELDS_ENUM.RIGHT_ASCENSION)}
                        errorStyle={errorTextStyle}
                      />
                    </div>
                  </div>
                  <div style={fieldLineStyle}>
                    <div style={labelDivStyle}>
                      {formatMessage({ id: 'snr-criterion.declinaison.field' })}
                    </div>
                    <div style={textFieldDivStyle}>
                      <TextField
                        title={formatMessage({ id: 'snr-criterion.declinaison.field' })}
                        type="number"
                        hintText={formatMessage({ id: 'snr-criterion.declinaison.field' })}
                        value={declinaison}
                        fullWidth
                        onChange={onDeclinaisonInput}
                        errorText={this.computeErrorText(FIELDS_ENUM.DECLINAISON)}
                        errorStyle={errorTextStyle}
                      />
                    </div>
                  </div>
                </>
              )
            }
          </td>
        </tr>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            {/* Angle input */}
            <div style={fieldLineStyle}>
              <div style={labelDivStyle}>
                {formatMessage({ id: 'snr-criterion.cone.angle.field' })}
              </div>
              <div style={textFieldDivStyle}>
                <TextField
                  title={formatMessage({ id: 'snr-criterion.cone.angle.field' })}
                  hintText={formatMessage({ id: 'snr-criterion.cone.angle.field' })}
                  value={angle}
                  type="number"
                  fullWidth
                  onChange={onAngleInput}
                  errorText={this.computeErrorText(FIELDS_ENUM.ANGLE)}
                  errorStyle={errorTextStyle}
                />
              </div>
            </div>
          </td>
        </tr>
        <tr style={muiTheme.module.searchResults.searchPane.criteria.defaultRow}>
          <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell} />
          <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
            {/* Unit selection */}
            <div style={fieldLineStyleAlt}>
              <div style={labelDivStyle}>
                {formatMessage({ id: 'snr-criterion.unit.name.field' })}
              </div>
              <div style={textFieldDivStyle}>
                <RadioButtonGroup
                  name="unit-selector"
                  defaultSelected={unitSelected}
                  onChange={onChangeUnit}
                  style={radioButtonGroupStyle}
                >
                  <RadioButton
                    value={converter.UNITS_ENUM.DEG}
                    label={formatMessage({ id: 'snr-criterion.unit.deg' })}
                    iconStyle={unitIconStyle}
                    labelStyle={unitLabelSyle}
                  />
                  <RadioButton
                    value={converter.UNITS_ENUM.RAD}
                    label={formatMessage({ id: 'snr-criterion.unit.rad' })}
                    iconStyle={unitIconStyle}
                    labelStyle={unitLabelSyle}
                  />
                  <RadioButton
                    value={converter.UNITS_ENUM.ARCSEC}
                    label={formatMessage({ id: 'snr-criterion.unit.arcsec' })}
                    iconStyle={unitIconStyle}
                    labelStyle={unitLabelSyle}
                  />
                </RadioButtonGroup>
              </div>
            </div>
          </td>
        </tr>
      </>

    )
  }
}
export default CriterionComponent
