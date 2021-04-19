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
        text: 'Энергозапас',
        style: textStyle
    },
    chart:{
        backgroundColor:'transparent',
        type:"column",
        borderColor:'white',
    },
    legend:{enabled:false},
    xAxis:{
        labels:{
            style: textStyle,
            rotation:-35,
        },
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
        max:200,
    },
    colors:["#7ccdde"],
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
            containerProps={{style:{height:"100%"}}}
        />
    </>
  )
};

export default powerConsumptionChart;