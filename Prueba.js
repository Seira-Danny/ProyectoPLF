
//aqui va el otro codigo
function crearTabla(jugadores) {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    const name3 = document.getElementById('name3').value;
    const name4 = document.getElementById('name4').value;
    var ctx = document.getElementById('myChart').getContext('2d');
    var button = document.getElementById("submitButton");
    submitButton.addEventListener("click", function () {
        myChart.destroy();
    });
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [name1, name2, name3, name4],
            datasets: [{
                label: 'Numero de victorias',
                data: [jugadores[0].ganadas, jugadores[1].ganadas, jugadores[2].ganadas, jugadores[3].ganadas],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],

                borderWidth: 5

            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {

                    }
                }]
            }
        }
    });


}

let num = document.getElementById("crear")
num.addEventListener("click", () => {
    let end = document.getElementById('end').value;
    crearTabla(getDatos(end));
})