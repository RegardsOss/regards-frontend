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
import { ThemeInjector } from '@regardsoss/theme'
import CardActionsView from './CardActionsView'

class CardActionsComponent extends React.Component {
  static propTypes = {
    thirdButtonClassName: PropTypes.string,
    thirdButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    thirdButtonUrl: PropTypes.string,
    thirdButtonClick: PropTypes.func,
    isThirdButtonDisabled: PropTypes.bool,
    isThirdButtonVisible: PropTypes.bool,
    thirdHateoasDependency: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    thirdButtonStyle: PropTypes.objectOf(PropTypes.any),

    secondaryButtonClassName: PropTypes.string,
    secondaryButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    secondaryButtonUrl: PropTypes.string,
    secondaryButtonClick: PropTypes.func,
    isSecondaryButtonDisabled: PropTypes.bool,
    isSecondaryButtonVisible: PropTypes.bool,
    secondaryHateoasDependency: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
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
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
    useAlternateStyle: false,
  }

  render() {
    return (
      <ThemeInjector>
        <CardActionsView
          thirdButtonClassName={this.props.thirdButtonClassName}
          thirdButtonLabel={this.props.thirdButtonLabel}
          thirdButtonUrl={this.props.thirdButtonUrl}
          thirdButtonClick={this.props.thirdButtonClick}
          thirdButtonDisabled={this.props.isThirdButtonDisabled}
          thirdButtonVisible={this.props.isThirdButtonVisible}
          thirdHateoasDependency={this.props.thirdHateoasDependency}
          thirdButtonStyle={this.props.thirdButtonStyle}
          secondaryButtonClassName={this.props.secondaryButtonClassName}
          secondaryButtonLabel={this.props.secondaryButtonLabel}
          secondaryButtonUrl={this.props.secondaryButtonUrl}
          secondaryButtonClick={this.props.secondaryButtonClick}
          isSecondaryButtonDisabled={this.props.isSecondaryButtonDisabled}
          isSecondaryButtonVisible={this.props.isSecondaryButtonVisible}
          secondaryHateoasDependency={this.props.secondaryHateoasDependency}
          secondaryButtonStyle={this.props.secondaryButtonStyle}
          mainButtonClassName={this.props.mainButtonClassName}
          mainButtonUrl={this.props.mainButtonUrl}
          mainButtonLabel={this.props.mainButtonLabel}
          mainButtonClick={this.props.mainButtonClick}
          mainButtonType={this.props.mainButtonType}
          isMainButtonVisible={this.props.isMainButtonVisible}
          isMainButtonDisabled={this.props.isMainButtonDisabled}
          mainHateoasDependencies={this.props.mainHateoasDependencies}
          theme={null}
          useAlternateStyle={this.props.useAlternateStyle}
        />
      </ThemeInjector>
    )
  }
}

export default CardActionsComponent
