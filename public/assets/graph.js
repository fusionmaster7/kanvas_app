console.log("Graphs here");

const backgroundColor = Array(32).fill("#fa5dbb");
Chart.defaults.global.defaultFamily = "Lato";
Chart.defaults.global.defaultColor = "red";

const renderGraph = (states, stateData) => {
  let ctx = document.getElementById("mychart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...states],
      datasets: [
        {
          label: "# of Active Cases",
          data: [...stateData],
          backgroundColor: backgroundColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

const getData = async () => {
  const res = await axios.get(
    "https://api.covid19india.org/v2/state_district_wise.json"
  );
  let states = [];
  let stateData = [];
  res.data.forEach((newState) => {
    states.push(newState.state);
    let totalCases = 0;
    newState.districtData.forEach((district) => {
      totalCases +=
        district.active +
        district.recovered +
        district.confirmed +
        district.deceased;
    });
    stateData.push(totalCases);
  });
  renderGraph(states, stateData);
};
(async () => {
  await getData();
})();
