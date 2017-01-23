/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

class StringCriteriaComponent extends React.Component {

  componentDidMount() {
    this.props.testDispatch()
  }

  render() {
    console.log('TEST', this.props.test)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card>
          <CardText style={{ width: '100%' }} >
            <TextField
              id="search"
              floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
              onChange={(event, value) => console.log(`Running search for attributeId=${this.props.attributes.searchField} and value=${value}`)}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  test: state['plugins.string-criteria'].pluginTest,
})
const mapDispatchToProps = dispatch => ({
  testDispatch: () => dispatch({ type: 'plugin/TEST' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(StringCriteriaComponent)
