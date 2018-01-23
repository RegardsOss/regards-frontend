// /**
//  * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
//  *
//  * This file is part of REGARDS.
//  *
//  * REGARDS is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU General Public License as published by
//  * the Free Software Foundation, either version 3 of the License, or
//  * (at your option) any later version.
//  *
//  * REGARDS is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  * GNU General Public License for more details.
//  *
//  * You should have received a copy of the GNU General Public License
//  * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
//  **/
// import { connect } from '@regardsoss/redux'
// import EnumeratedCriterionComponent from '../components/EnumeratedCriterionComponent'

// /**
//  * Root container for enumerated criterion plugin.
//  * That plugin provides all values an model can have (from database) within an auto-completion menu
//  * Restrictions: attribute model values must be string typed
//  * @author Raphaël Mechali
//  */
// export class EnumeratedCriterionContainer extends PluginCriterionContainer {
//   /**
//    * Redux: map state to props function
//    * @param {*} state: current redux state
//    * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
//    * @return {*} list of component properties extracted from redux state
//    */
//   static mapStateToProps(state) {
//     return {}
//   }

//   /**
//    * Redux: map dispatch to props function
//    * @param {*} dispatch: redux dispatch function
//    * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
//    * @return {*} list of component properties extracted from redux state
//    */
//   static mapDispatchToProps(dispatch) {
//     return {}
//   }

//   static propTypes = {
//     // parent props
//     ...PluginCriterionContainer.propTypes,
//     /**
//      * List of attributes associated to the plugin.
//      * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
//      * Value of each keys are the attribute id (retrieved from the server) associated
//      */
//     attributes: DataManagementShapes.AttributeModelList,
//     // from mapStateToProps
//     // from mapDispatchToProps
//   }

//   /**
//   * Class constructor
//   * @param props
//   */
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: '',
//     }
//   }

//   render() {
//     const { maProp } = this.props
//     return (
//       <div />
//     )
//   }
// }
// export default connect(
//   EnumeratedCriterionContainer.mapStateToProps,
//   EnumeratedCriterionContainer.mapDispatchToProps)(EnumeratedCriterionContainer)
