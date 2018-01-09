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
import { FeedbackDisplayer } from '@regardsoss/components'
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import { FEEDBACK_TYPES_ENUM, feedbackSelectors } from '../../../clients/FeedbackClient'

/**
 * Component to display long operations on module
 * @author Raphaël Mechali
 */
class FeedbackDisplayComponent extends React.Component {
  static FEEDBACK_ICON_BY_TYPE = {
    [FEEDBACK_TYPES_ENUM.ADD_TO_BASKET]: CartIcon,
  }

  render() {
    return (
      <FeedbackDisplayer
        feedbackSelector={feedbackSelectors}
        iconByType={FeedbackDisplayComponent.FEEDBACK_ICON_BY_TYPE}
      />
    )
  }
}
export default FeedbackDisplayComponent
