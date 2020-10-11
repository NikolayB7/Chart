var ctx = document.getElementById('myChart').getContext('2d');

Chart.defaults.global.elements.point.pointStyle = 'line'
Chart.defaults.global.elements.point.radius = 0

var configChart = {
    legend: {
        display: false,
        position: 'top',
        labels: {
            boxWidth: 20,
            fontColor: 'black'
        }
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false,
                color: "black"

            },
            scaleLabel: {
                display: true,
                labelString: "Время",
                fontColor: "black"
            }
        }],
        yAxes: [{
            gridLines: {
                color: "black",
                borderDash: [2, 5],
            },
            scaleLabel: {
                display: true,
                labelString: "Позиция в ТОПе",
                fontColor: "black"
            }
        }]
    }
};
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [
            {
                label: 'Оплаченные установки',
                backgroundColor: '#E75D6D',
                borderColor: '#E75D6D',
                data: [0, 10, 22, 34, 40, 18, 35, 60, 53, 60, 63, 75, 68, 61, 40],

            },
            {
                label: 'Органические установки',
                backgroundColor: '#9093D2',
                borderColor: '#9093D2',
                data: [0, 70, 80, 90, 120, 170, 130, 160, 200, 220, 230, 250, 240, 230, 220]
            },

        ]
    },
    options: configChart
});



var myLegendContainer = document.getElementById("legend");
// generate HTML legend
myLegendContainer.innerHTML = chart.generateLegend();
// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName('li');
for (var i = 0; i < legendItems.length; i += 1) {
    legendItems[i].addEventListener("click", legendClickCallback, false);
}

function legendClickCallback(event) {
    event = event || window.event;

    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    var chartId = parseInt(parent.classList[0].split("-")[0], 10);
    var chart = Chart.instances[chartId];
    var index = Array.prototype.slice.call(parent.children).indexOf(target);
    var meta = chart.getDatasetMeta(0);
    console.log(index);
    var item = meta.data[index];

    if (item.hidden === null || item.hidden === false) {
        item.hidden = true;
        target.classList.add('hidden');

    } else {
        target.classList.remove('hidden');
        item.hidden = null;

    }
    chart.update();

}
