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
import find from 'lodash/find'

class DatasetLabel extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    datasetList: PropTypes.object,
  }

  static DEFAULT_DATASET_NAME = '-'

  state = {
    datasetLabel: '',
  }

  componentDidMount() {
    const { value, datasetList } = this.props

    this.saveLabel(value, datasetList)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value, datasetList } = nextProps
    this.saveLabel(value, datasetList)
  }

  saveLabel = (value, datasets) => {
    const matchedDataset = find(datasets, (dts) => dts.content.feature.id === value)
    let datasetLabel = value || DatasetLabel.DEFAULT_DATASET_NAME
    if (matchedDataset) {
      datasetLabel = matchedDataset.content.feature.label
    }
    this.setState({
      datasetLabel,
    })
  }

  render() {
    const { datasetLabel } = this.state

    return (
      <div>{datasetLabel}</div>
    )
  }
}

export default DatasetLabel
