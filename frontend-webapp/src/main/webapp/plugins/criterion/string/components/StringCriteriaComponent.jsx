/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
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
            floatingLabelText={<FormattedMessage id='criterion.search.field.label'/>}
          />
        </CardText>
      </Card>
    )
  }
}

export default StringCriteriaComponent
