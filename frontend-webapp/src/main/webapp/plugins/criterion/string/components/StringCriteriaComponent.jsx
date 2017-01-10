/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { Card, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField';

class StringCriteriaComponent extends React.Component {

  render() {
    return (
      <Card>
        <CardText style={{ width: '100%' }} >
          <TextField
            id="search"
            floatingLabelText="Search field ..."
          />
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps= (state) => ({

})

const mapDispatchToProps= (dispatch) => ({

})

export default StringCriteriaComponent
