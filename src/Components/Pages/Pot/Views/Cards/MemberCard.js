import { useTheme } from "@emotion/react";
import _ from "lodash";
import moment from "moment";

//material
import { Alert, Grid, Typography } from "@mui/material";

//components
import LineChart from "Components/Common/Charts/LineChart";
import PaddedPaper from "Components/Common/Paper/PaddedPaper";
import Transactions from "../Transactions";


export default function MemberCard({member, transactions}) {

    let theme = useTheme();

    const min = _.last(transactions);
    let chartData = [];
    const diffInDays = Math.abs(moment(min.date).diff(moment(),'day'));

    let startDate = moment(min.date);

    let running = {
        Debit: 0,
        Payment: 0,
    }

    for (var j = 0; j < (diffInDays+1); j++){
        let day = startDate.clone().add(parseInt(j), 'day');

        for (var _t of _.filter(transactions,{date: day.format('YYYY-MM-DD')})){
            running[_t.trans] += parseFloat(_t.amount)
        }

        chartData[day.format('DD/MM/YYYY')] = {
            label: day.format('DD/MM/YYYY'),
            month: day.format('MMM'),
            data: _.map(
                _.keys(running),
                _i => ({
                    label: _i,
                    data: parseFloat(running[_i]),
                    backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main],
                    borderColor: [theme.palette.primary.main, theme.palette.secondary.main],
                    lineTension: 0.6,
                    pointRadius: 0
                })
            )
        };

    }

    chartData = _.values(chartData);

    return (
        <Grid container >
            <Grid item xs={12} container spacing={1}>
                {parseFloat(_.sumBy(transactions, t => t.trans === 'Debit' ? parseFloat(t.amount) : ( t.trans === 'Payment' ? 0 - parseFloat(t.amount) : 0))) > 0 &&
                    <Grid item xs={12}>
                        <Alert severity="warning">{_.capitalize(member.name)} owes £{parseFloat(_.sumBy(transactions, t => t.trans === 'Debit' ? parseFloat(t.amount) : ( t.trans === 'Payment' ? 0 - parseFloat(t.amount) : 0))).toFixed(2)}</Alert>
                    </Grid>
                }
                <Grid item xs={12}>
                    <LineChart
                        hideLegend
                        yLabel={(value)=>{
                            return `£${parseFloat(value).toFixed(2)}`
                        }}
                        xLabel={(value)=>{
                            return chartData[value].month === chartData[value-1]?.month ? null : chartData[value].month
                        }}
                        data={chartData}
                    />
                </Grid>
                <Grid item xs={6}>
                    <PaddedPaper>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="caption"><b>Pot Contarabutions</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    textAlign='left'
                                    color={theme.palette.primary.main}
                                >£{_.sumBy(transactions, t => t.trans === 'Debit' ? parseFloat(t.amount) : 0)}</Typography>
                            </Grid>
                        </Grid>
                    </PaddedPaper>
                </Grid>
                <Grid item xs={6}>
                    <PaddedPaper>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="caption"><b>Paid In</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    textAlign='left'
                                    color={theme.palette.secondary.main}
                                >£{_.sumBy(transactions, t => t.trans === 'Payment' ? parseFloat(t.amount) : 0)}</Typography>
                            </Grid>
                        </Grid>
                    </PaddedPaper>
                </Grid>
            </Grid>
            <Grid item xs={12}
                style={{
                    backgroundColor: theme.palette.background.default
                }}
            >
                <Transactions transactions={transactions} />
            </Grid>
        </Grid>
    )
}