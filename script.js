const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalScore = document.getElementById("final-score");

const ROTATION_VALUES = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 7 },
];

const data = [16, 16, 16, 16, 16, 16];

const pieColors = [
    "#d8c21e",
    "#111111",
    "#d8c21e",
    "#111111",
    "#d8c21e",
    "#111111",
];

let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
            {
                backgroundColor: pieColors,
                data,
            }
        ],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            datalabels: {
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    }
});

const valueGenerator = (angleValue) => {
    for (let i of ROTATION_VALUES) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalScore.value = i.value;
        }
        spinBtn.disabled = false;
        break;
    }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    finalScore.value = 0;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
    if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
    }
    }, 10);
});