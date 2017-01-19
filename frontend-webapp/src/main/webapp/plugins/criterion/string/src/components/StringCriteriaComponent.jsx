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
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <Card>
        <CardText style={{ width: '100%' }} >
          <TextField
            id="search"
            floatingLabelText={<FormattedMessage id='criterion.search.field.label'/>}
            onChange={(event,value) => console.log(`Running search for attributeId=${this.props.attributes.searchField} and value=${value}`)}
          />
        </CardText>
      </Card>
      </div>
    )
  }
}

export default StringCriteriaComponent
