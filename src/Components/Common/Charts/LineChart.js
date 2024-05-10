import React from 'react';
import _ from 'lodash';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initialState = () => ({
    data: [],
    options: {}
})

class LineChart extends React.Component {
    constructor(props){
        super(props);

        this.state = initialState();
    }

    componentDidMount(){ this.configureData(); this.configureOptions(); }
    componentDidUpdate(prevProps){
        if (!_.matches(this.props, prevProps)){
            this.configureData(); this.configureOptions();
            ChartJS.refresh();
        }
    }

    configureData() {
        let labels = [];
        let datasets = 
            _.isArray(this.props.data[0].data) ?
                _.map(this.props.data[0].data, (i,idx) => ({
                    ...(_.isObject(i) ? i : {}),
                    label: _.isObject(i) ? (i?.label || `dataset${idx}-`) : `dataset${idx}-`,
                    data: [],
                })) : {
                    ..._.isObject(this.props.data[0].data) ? this.props.data[0].data : {},
                    label: _.isObject(this.props.data[0].data) ? this.props.data[0].data.label : 'Dataset1',
                    data: [],
                }

        _.each(this.props.data, (d,dIdx) => {
            labels.push(d?.label ?? dIdx);
            if (_.isArray(d.data)){
                _.each(d.data, (_d,_dIdx) => {
                    let label = _.isObject(_d) ? (_d?.label || `dataset${_dIdx}`) : `dataset${_dIdx}`;
                    datasets[
                        _.findIndex(datasets, {label})
                    ].data.push(
                        _.isObject(_d) ? _d.data : _d
                    )
                });
            } else {
                datasets[0].data.push(d.data);
            }
        })

        this.setState({ data : {labels,datasets} });
    }

    configureOptions() {
        let options = {
            responsive: true,
            maintainAspectRatio: false,
        };

        if (this.props.hideLegend){
            options = {
                ...options,
                plugins: {
                    ...options?.plugins || {},
                    legend: {
                        display: false
                    },
                }
            }
        }

        if (this.props.title){
            options = {
                ...options,
                plugins: {
                    ...(options?.plugins || {}),
                    title: {
                        display: true,
                        text: this.props.title,
                    },
                }
            }
        }

        if (this.props.stacked){
            options = {
                ...options,
                scales: {
                    ...(options?.scales || {}),
                    x: {
                        ...(options?.scales?.x || {}),
                        stacked: true,
                    },
                    y: {
                        ...(options?.scales?.y || {}),
                        stacked: true,
                    },
                }
            }
        }

        if (this.props.pointStyle){
            options = {
                ...options,
                elements: {
                    point: {
                        pointStyle: this.props.pointStyle
                    }
                }
            }
        }

        if (this.props.xLabel){
            options = {
                ...options,
                scales: {
                    ...options?.scales || {},
                    x: {
                        ...options?.scales?.x || {},
                        ticks: {
                            ...options?.scales?.x?.ticks || {},
                            ///(value, index, ticks)
                            callback: this.props.xLabel
                        }
                    }
                }
            }
        }

        if (this.props.yLabel){
            options = {
                ...options,
                scales: {
                    ...options?.scales || {},
                    y: {
                        ...options?.scales?.y || {},
                        ticks: {
                            ...options?.scales?.y?.ticks || {},
                            ///(value, index, ticks)
                            callback: this.props.yLabel
                        }
                    }
                }
            }
        }

        this.setState({
            options: options,
        })
    }

    render(){
        const { data, options } = this.state;
        if (data.length === 0 ){
            return <></>;
        }
        return (
            <Line 
                options={options} 
                data={data} 
            />
        )
    }
}

export default LineChart