/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    secondaryButtonClassName: PropTypes.string,
    secondaryButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    secondaryButtonUrl: PropTypes.string,
    secondaryButtonClick: PropTypes.func,
    isSecondaryButtonDisabled: PropTypes.bool,
    isSecondaryButtonVisible: PropTypes.bool,
    secondaryHateoasDependency: PropTypes.string,

    mainButtonClassName: PropTypes.string,
    mainButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    mainButtonUrl: PropTypes.string,
    mainButtonClick: PropTypes.func,
    mainButtonType: PropTypes.string,
    isMainButtonVisible: PropTypes.bool,
    isMainButtonDisabled: PropTypes.bool,
    mainHateoasDependencies: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    isMainButtonVisible: true,
    isMainButtonDisabled: false,
  }

  render() {
    return (
      <ThemeInjector>
        <CardActionsView
          secondaryButtonClassName={this.props.secondaryButtonClassName}
          secondaryButtonLabel={this.props.secondaryButtonLabel}
          secondaryButtonUrl={this.props.secondaryButtonUrl}
          secondaryButtonClick={this.props.secondaryButtonClick}
          isSecondaryButtonDisabled={this.props.isSecondaryButtonDisabled}
          isSecondaryButtonVisible={this.props.isSecondaryButtonVisible}
          secondaryHateoasDependency={this.props.secondaryHateoasDependency}
          mainButtonClassName={this.props.mainButtonClassName}
          mainButtonUrl={this.props.mainButtonUrl}
          mainButtonLabel={this.props.mainButtonLabel}
          mainButtonClick={this.props.mainButtonClick}
          mainButtonType={this.props.mainButtonType}
          isMainButtonVisible={this.props.isMainButtonVisible}
          isMainButtonDisabled={this.props.isMainButtonDisabled}
          mainHateoasDependencies={this.props.mainHateoasDependencies}
          theme={null}
        />
      </ThemeInjector>
    )
  }
}

export default CardActionsComponent
