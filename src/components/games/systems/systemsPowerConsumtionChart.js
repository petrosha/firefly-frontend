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

const options = {
    title: {
        text: 'Потребление энергии',
        style: textStyle
    },
    chart:{
        backgroundColor:'transparent',
        type:"bar",
        borderColor:'white',
    },
    legend:{enabled:false},
    xAxis:{
        labels:{
            style: textXAxisStyle,
            rotation:-60,
        },
        opposite:true,
	    categories: []
    },
    yAxis: 
    {
        title:{
            text:"MWatt",
            style:textStyle
        },
        labels:{
            style:textStyle
        },
        max:30,
        reversed:true
    },
    colors:["#fffdf8"],
    series: []
}

const powerConsumptionChart= ({dataSet = [],dataNames=[]})=>{
    if(dataSet.length === 0) {console.log("CHART!"); return (<></>);}

    options.xAxis.categories=[...dataNames];
    options.series[0]={data:dataSet};
    let chartOptions=Object.assign({},options);

    return (
    <>
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{style:{height:"97.5%"}}}
        />
    </>
  )
};

export default powerConsumptionChart;