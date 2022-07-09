const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		label: 'my dataset',
		data: [300, 50, 100],
		backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)'
		],
		hoverOffset: 4,
	}]
}

let ctx = document.getElementById('myChart').getContext('2d');


let chart = new Chart(ctx, {
	type: 'doughnut',
	data: data,

	// options: {
	// 	scales: {
	// 		y: {
	// 			beginAtZero: true
	// 		}
	// 	}
	// }
});





