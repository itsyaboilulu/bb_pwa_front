import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialState = () => ({
    data: [],
    options: {}
})

class BarChart extends React.Component {
    constructor(props){
        super(props);

        this.state = initialState();
    }

    componentDidMount(){ this.configureData(); this.configureOptions(); }

    configureData() {
        let labels = [];
        let datasets = 
            _.isArray(this.props.data[0].data) ?
                _.map(this.props.data[0].data, (i,idx) => ({
                    ...(_.isObject(i) ? i : {}),
                    label: _.isObject(i) ? (i?.label || `dataset${idx}`) : `dataset${idx}`,
                    data: [],
                    stack: 'Stack 0', 
                })) : {
                    ..._.isObject(this.props.data[0].data) ? this.props.data[0].data : {},
                    label: _.isObject(this.props.data[0].data) ? this.props.data[0].data.label : 'Dataset1',
                    data: [],
                    stack: 'Stack 0',
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
        };

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
            <Bar 
                options={options} 
                data={data} 
                style={{
                    width: '100%',
                }}
            />
        )
    }
}

export default BarChart