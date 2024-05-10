import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

//app component
import _ from 'lodash';
import moment from 'moment';

//material ui
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Grid, Typography, breadcrumbsClasses } from '@mui/material';

//component
import LineChart from 'Components/Common/Charts/LineChart';
import MemberAvatar from 'Components/Common/Members/MemberAvatar';
import PaddedPaper from 'Components/Common/Paper/PaddedPaper';
import MemberCard from './Cards/MemberCard';

//avatar component
import A1 from 'Assets/Files/Members/1/avatar.jpg';
import A2 from 'Assets/Files/Members/2/avatar.jpg';
import A3 from 'Assets/Files/Members/3/avatar.jpg';
import A4 from 'Assets/Files/Members/4/avatar.jpg';
import A5 from 'Assets/Files/Members/5/avatar.jpg';

export default function MembersTransactions({transactions}){

    const users = useSelector(state => state.lists.users);

    const [showMore, setShowMore] = React.useState([]);
    const [chartData, setChartData] = React.useState(null);

    async function getChartData() {
        const min = _.last(transactions);
        let _tranactions = [];

        const diffInDays = Math.abs(moment(min.date).diff(moment(),'day'));

        let startDate = moment(min.date)

        let colors = [];
        _.each(
            _.orderBy(users, user => _.sumBy(transactions, i => ( parseInt(i.payeeId) === parseInt(user.id) && i.trans === 'Debit') ? parseFloat(i.amount) : 0 ), 'desc'),
            (u,uIdx) => {
                colors[u.id] = ['#af9500', '#d7d7d7', '#6a3805', '#ad8a56', '#ad8a58'][uIdx];
            }
        )

        let userRunnning = {};

        _.each(users, u => {
            userRunnning[u.id] = 0;
        })

        for (var j = 0; j < (diffInDays+1); j++){
            let day = startDate.clone().add(parseInt(j), 'day');

            for (var _t of _.filter(transactions,{date: day.format('YYYY-MM-DD')})){
                userRunnning[parseInt(_t.payeeId)] += _t.trans === 'Debit' ? parseFloat(_t.amount) : 0
            }

            _tranactions[day.format('DD/MM/YYYY')] = {
                label: day.format('DD/MM/YYYY'),
                month: day.format('MMM'),
                data: _.map(
                    _.keys(userRunnning),
                    _i => ({
                        label: _i,
                        data: parseFloat(userRunnning[_i]),
                        backgroundColor: colors[_i],
                        borderColor: colors[_i],
                        lineTension: 0.2,
                       
                    })
                )
            };
        }
        setChartData(_.values(_tranactions))
    }

    useEffect(() =>{
        getChartData();
    },[transactions])

    return (
        <Box pl={1.5} pr={1.5}>
            <Grid container spacing={1}>
                <Grid item xs={12} pb={1} pt={1}>
                    {chartData && chartData.length > 0 &&
                        <PaddedPaper
                            style={{height: 200, padding: '0.5em'}}
                        >
                            <LineChart
                                hideLegend
                                yLabel={(value)=>{
                                    return `£${parseFloat(value).toFixed(2)}`
                                }}
                                xLabel={(value)=>{
                                    return chartData[value].month === chartData[value-1]?.month ? null : chartData[value].month
                                }}
                                data={chartData}
                                pointStyle={
                                    (point)=>{
                                        if (point.index === (chartData.length -1)) {
                                            let _cd = 
                                                _.find(
                                                    chartData[chartData.length -1].data,
                                                    {data: point.raw }
                                                )
                                            let img = new Image();
                                            switch (parseInt(_cd?.label)) {
                                                case 1: img.src = A1; break;
                                                case 2: img.src = A2; break;
                                                case 3: img.src = A3; break;
                                                case 4: img.src = A4; break;
                                                case 5: img.src = A5; break;
                                                default: break;
                                            }
                                            img.height = 25;
                                            img.width = 25;
                                            img.style.cssText = 'border-radius: 100%; overflow: hidden; border: 1px solid pink;'
                                            return [img]
                                        }
                                        return [false];
                                    }
                                }
                            />
                        </PaddedPaper>
                    }
                </Grid>
                {
                    _.map(
                        _.orderBy(users, user => _.sumBy(transactions, i => ( parseInt(i.payeeId) === parseInt(user.id) && i.trans === 'Debit') ? parseFloat(i.amount) : 0 ), 'desc'), 
                        (user, idx) =>
                        <Grid item xs={12}>
                            <PaddedPaper
                                onClick={()=>
                                    setShowMore(
                                        showMore.includes(user.id) ?
                                            _.filter(showMore, i => i !== user.id) :
                                            [...showMore, user.id]
                                    )
                                }
                            >
                                <Grid container spacing={2} alignItems={'center'} >
                                    <Grid item>
                                        <MemberAvatar member={user.id}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{_.capitalize(user.name)}</Typography> 
                                    </Grid>
                                    <Grid item ml='auto'>
                                        <Typography variant="body2">£{parseFloat(
                                            _.sumBy(transactions, i => 
                                                ( 
                                                    parseInt(i.payeeId) === parseInt(user.id) &&
                                                    i.trans === 'Debit'
                                                ) ? parseFloat(i.amount) : 0 )
                                        ).toFixed(2)}</Typography>
                                    </Grid>
                                    <Grid item >
                                        {showMore.includes(user.id) ? <KeyboardArrowUp style={{paddingTop: 5}}/> : <KeyboardArrowDown style={{paddingTop: 5}}/> }
                                    </Grid>
                                    {showMore.includes(user.id) &&
                                        <Grid item xs={12} pt={2}>
                                            <MemberCard 
                                                member={user}  
                                                transactions={_.filter(transactions, i => parseInt(i.payeeId) === parseInt(user.id) )}
                                            />
                                        </Grid>
                                    }
                                </Grid>
                            </PaddedPaper>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )

}