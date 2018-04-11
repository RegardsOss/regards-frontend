# @regardsoss/endpoints-common

## Description

This module allow to fetch all granted resource to the current connected user and store the results in the store.
The resources are stored in : 'common.endpoints' into the application redux store.

## Usage

```js
import {connect} from 'react-redux'
import {CommonEndpointClient} from '@regardsoss/endpoints-common'
import {AdminShapes} from '@regardsoss/shape'

class SampleContainer extends React.Component {
  
  static propTypes = {
    endpoints: AdminShapes.EndpointList,
    fetchEndpoints : PropTypes.func,
  }
  componentDidMount = () => this.props.fetchEndpoints()
   
   render(){
      // After component is mounted, you can access endpoints from this.props.endpoints.
   }
}
const mapStateToProps = (state) => {
  endpoints: CommonEndpointClient.endpointSelectors.getList(state)
}
const mapDispatchToProps = dispatch => ({
  fetchEndpoints: () => dispatch(CommonEndpointClient.endpointActions.fetchPagedEntityList(0, 10000)),
})

export default connect(mapStateToProps,mapDispatchToProps)(SampleContainer)

```