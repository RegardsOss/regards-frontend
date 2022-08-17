/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { withResourceDisplayControl } from '@regardsoss/display-control'
import SecondaryActionButtonComponent from './SecondaryActionButtonComponent'
import MainActionButtonComponent from './MainActionButtonComponent'

const MainActionButtonComponentWithResourceDisplayControl = withResourceDisplayControl(MainActionButtonComponent)
const SecondaryActionButtonComponentWithResourceDisplayControl = withResourceDisplayControl(SecondaryActionButtonComponent)

class CardActionsView extends React.Component {
  static propTypes = {
    thirdButtonClassName: PropTypes.string,
    thirdButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    thirdButtonUrl: PropTypes.string,
    thirdButtonClick: PropTypes.func,
    isThirdButtonDisabled: PropTypes.bool,
    isThirdButtonVisible: PropTypes.bool,
    thirdHateoasDependency: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    thirdButtonStyle: PropTypes.objectOf(PropTypes.any),

    secondaryButtonClassName: PropTypes.string,
    secondaryButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    secondaryButtonUrl: PropTypes.string,
    secondaryButtonClick: PropTypes.func,
    isSecondaryButtonDisabled: PropTypes.bool,
    isSecondaryButtonVisible: PropTypes.bool,
    secondaryHateoasDependency: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    secondaryButtonStyle: PropTypes.objectOf(PropTypes.any),

    mainButtonClassName: PropTypes.string,
    mainButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    mainButtonUrl: PropTypes.string,
    mainButtonClick: PropTypes.func,
    mainButtonType: PropTypes.string,
    isMainButtonVisible: PropTypes.bool,
    isMainButtonDisabled: PropTypes.bool,
    mainHateoasDependencies: PropTypes.arrayOf(PropTypes.string),

    useAlternateStyle: PropTypes.bool,
  }

  static defaultProps = {
    isThirdButtonVisible: true,
    isSecondaryButtonVisible: true,
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
    mainHateoasDependencies: [],
    useAlternateStyle: false,
  }

  static styleCardActions = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }

  static altStyleCardActions = {
    padding: '5px',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '5px',
  }

  render() {
    const thirdRequiredEndpoints = this.props.thirdHateoasDependency ? [this.props.thirdHateoasDependency] : []
    const secondaryRequiredEndpoints = this.props.secondaryHateoasDependency ? [this.props.secondaryHateoasDependency] : []
    return (
      <div style={!this.props.useAlternateStyle ? CardActionsView.styleCardActions : CardActionsView.altStyleCardActions}>
        {
          // third button if any
          (this.props.thirdButtonUrl || this.props.thirdButtonClick)
            && this.props.isThirdButtonVisible ? (
              <SecondaryActionButtonComponentWithResourceDisplayControl
                resourceDependencies={thirdRequiredEndpoints}
                className={this.props.thirdButtonClassName}
                label={this.props.thirdButtonLabel}
                url={this.props.thirdButtonUrl}
                onClick={this.props.thirdButtonClick}
                disabled={this.props.isThirdButtonDisabled}
                style={this.props.thirdButtonStyle}
              />) : null
        }
        {
          // secondary button if any
          (this.props.secondaryButtonUrl || this.props.secondaryButtonClick)
            && this.props.isSecondaryButtonVisible ? (
              <SecondaryActionButtonComponentWithResourceDisplayControl
                resourceDependencies={secondaryRequiredEndpoints}
                className={this.props.secondaryButtonClassName}
                label={this.props.secondaryButtonLabel}
                url={this.props.secondaryButtonUrl}
                onClick={this.props.secondaryButtonClick}
                disabled={this.props.isSecondaryButtonDisabled}
                style={this.props.secondaryButtonStyle}
              />) : null
        }
        {
          // primary if any
          (this.props.mainButtonUrl || this.props.mainButtonClick || this.props.mainButtonType)
            && this.props.isMainButtonVisible ? (
              <MainActionButtonComponentWithResourceDisplayControl
                resourceDependencies={this.props.mainHateoasDependencies}
                className={this.props.mainButtonClassName}
                label={this.props.mainButtonLabel}
                url={this.props.mainButtonUrl}
                onClick={this.props.mainButtonClick}
                type={this.props.mainButtonType}
                isVisible={this.props.isMainButtonVisible}
                disabled={this.props.isMainButtonDisabled}
              />) : null
        }
      </div>
    )
  }
}

export default CardActionsView
