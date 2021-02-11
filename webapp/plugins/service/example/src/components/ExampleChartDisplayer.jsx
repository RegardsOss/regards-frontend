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
import { ChartAdapter } from '@regardsoss/adapters'

/**
* Demonstrates a chart in a plugin
* @author Raphaël Mechali
*/
class ExampleChartContainer extends React.Component {
  static propTypes = {
    beforeDateCount: PropTypes.number.isRequired,
    afterDateCount: PropTypes.number.isRequired,
    unknown: PropTypes.number.isRequired,
  }

  render() {
    const { beforeDateCount, afterDateCount, unknown } = this.props
    // when build a chart, just provide the chart type constructor as string, then all the properties for that chart
    // The adapter will instantiate it and report the properties to it
    // 1 - example chart data
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const chartData = {
      labels: ['Before', 'After', 'Unknown'],
      datasets: [
        {
          label: 'The date data',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [beforeDateCount, afterDateCount, unknown],
        },
      ],
    }
    // 2 - example options (see http://www.chartjs.org/docs/latest/)
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const chartOptions = {
      scales: {
        xAxes: [
          {
            // more info http://www.chartjs.org/docs/latest/axes/styling.html
            gridLines: {
              // other grid lines color: 'color,
              // specific  zero line color: 'zeroLineColor'
              color: 'lightgray',
              display: false,
            },
            ticks: {
              fontColor: 'orange', // just for demonstration!
            },
          }],
        yAxes: [
          {
            color: 'red',
            gridLines: {
              color: 'lightgray',
              display: false,
            },
            ticks: {
              fontColor: 'orange', // just for demonstration!
            },
          }],
      },
      legend: {
        position: 'bottom',
        labels: {
          fontColor: 'white',
        },
      },
    }
    return (
      <ChartAdapter
        ChartComponent="HorizontalBar"
        data={chartData}
        options={chartOptions}
      />
    )
  }
}
export default ExampleChartContainer
