import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const textStyle = {
    color:'#ffffff',
    fontSize: '20px',
    fontFamily: 'Verdana, sans-serif'
}
const textXAxisStyle = {
    color:'#ffffff',
    fontSize: '15px',
    fontFamily: 'Verdana, sans-serif'
}

const powerConsumptionChart= ({dataSet = [],dataNames=[], maxFuelLevel=1000})=>{
    if(dataSet.length === 0) {console.log("CHART!"); return (<></>);}

    const options = {
        title: {
            text: 'Топливо',
            style: textStyle
        },
        chart:{
            backgroundColor:'transparent',
            type:"column",
            // rotate: -90,
            borderColor:'white',
        },
        legend:{enabled:false},
        xAxis:{
            labels:{
                style: textStyle,
            },
            categories: []
        },
        yAxis: 
        {
            labels:{
                style:textStyle
            },
            max: maxFuelLevel,
            title:{enabled:false}
        },
        colors:["#ffda15"],
        series: []
    }



    options.xAxis.categories=[...dataNames];
    options.series[0]={data:dataSet};
    let chartOptions=Object.assign({},options);

    return (
    <>
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{style:{height:"93.8%"}}}
        />
    </>
  )
};

export default powerConsumptionChart;