// Trends Chart
// ================================================================================
let trends_data = {
	labels: [1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976,
		1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986,
		1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996,
		1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
		2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016] ,
	datasets: [
		{
			"values": [132.9, 150.0, 149.4, 148.0,  94.4,  97.6,  54.1,  49.2,  22.5, 18.4,
				39.3, 131.0, 220.1, 218.9, 198.9, 162.4,  91.0,  60.5,  20.6,  14.8,
				33.9, 123.0, 211.1, 191.8, 203.3, 133.0,  76.1,  44.9,  25.1,  11.6,
				28.9,  88.3, 136.3, 173.9, 170.4, 163.6,  99.3,  65.3,  45.8,  24.7,
				12.6,   4.2,   4.8,  24.9,  80.8,  84.5,  94.0, 113.3,  69.8,  39.8]
		}
	]
};

let plot_chart_args = {
	parent: "#chart-trends",
	title: "Mean Total Sunspot Count - Yearly",
	data: trends_data,
	type: 'line',
	height: 250,
	colors: ['blue'],
	is_series: 1,
	show_dots: 0,
	heatline: 1,
	x_axis_mode: 'tick',
	y_axis_mode: 'span'
};

new Chart(plot_chart_args);

Array.prototype.slice.call(
	document.querySelectorAll('.chart-plot-buttons button')
).map(el => {
	el.addEventListener('click', (e) => {
		let btn = e.target;
		let type = btn.getAttribute('data-type');
		let config = [];

		if(type === 'line') {
			config = [0, 0, 0];
		} else if(type === 'region') {
			config = [0, 0, 1];
		} else {
			config = [0, 1, 0];
		}

		plot_chart_args.show_dots = config[0];
		plot_chart_args.heatline = config[1];
		plot_chart_args.region_fill = config[2];

		plot_chart_args.init = false;

		new Chart(plot_chart_args);

		Array.prototype.slice.call(
			btn.parentNode.querySelectorAll('button')).map(el => {
			el.classList.remove('active');
		});
		btn.classList.add('active');
	});
});

// Update values chart
// ================================================================================
let update_data_all_labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue",
	"Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
	"Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
let update_data_all_values = Array.from({length: 30}, () => Math.floor(Math.random() * 75 - 15));

// We're gonna be shuffling this
let update_data_all_indices = update_data_all_labels.map((d,i) => i);

let get_update_data = (source_array, length=10) => {
	let indices = update_data_all_indices.slice(0, length);
	return indices.map((index) => source_array[index]);
};

let update_data = {
	labels: get_update_data(update_data_all_labels),
	datasets: [{
		"values": get_update_data(update_data_all_values)
	}],
	"specific_values": [
		{
			title: "Altitude",
			// title: "A very long text",
			line_type: "dashed",
			value: 38
		},
	]
};

let update_chart = new Chart({
	parent: "#chart-update",
	data: update_data,
	type: 'line',
	height: 250,
	colors: ['lightgreen'],
	is_series: 1,
	region_fill: 1
});

let chart_update_buttons = document.querySelector('.chart-update-buttons');

chart_update_buttons.querySelector('[data-update="random"]').addEventListener("click", (e) => {
	shuffle(update_data_all_indices);
	update_chart.update_values(
		[{values: get_update_data(update_data_all_values)}],
		update_data_all_labels.slice(0, 10)
	);
});

chart_update_buttons.querySelector('[data-update="add"]').addEventListener("click", (e) => {
	// NOTE: this ought to be problem, labels stay the same after update
	let index = update_chart.x.length; // last index to add
	if(index >= update_data_all_indices.length) return;
	update_chart.add_data_point(
		[update_data_all_values[index]], update_data_all_labels[index]
	);
});

chart_update_buttons.querySelector('[data-update="remove"]').addEventListener("click", (e) => {
	update_chart.remove_data_point();
});


// Event chart
// ================================================================================
let moon_names = ["Ganymede", "Callisto", "Io", "Europa"];
let masses = [14819000, 10759000, 8931900, 4800000];
let distances = [1070.412, 1882.709, 421.700, 671.034];
let diameters = [5262.4, 4820.6, 3637.4, 3121.6];

let jupiter_moons = {
	'Ganymede': {
		mass: '14819000 x 10^16 kg',
		'semi-major-axis': '1070412 km',
		'diameter': '5262.4 km'
	},
	'Callisto': {
		mass: '10759000 x 10^16 kg',
		'semi-major-axis': '1882709 km',
		'diameter': '4820.6 km'
	},
	'Io': {
		mass: '8931900 x 10^16 kg',
		'semi-major-axis': '421700 km',
		'diameter': '3637.4 km'
	},
	'Europa': {
		mass: '4800000 x 10^16 kg',
		'semi-major-axis': '671034 km',
		'diameter': '3121.6 km'
	},
};

let events_data = {
	labels: ["Ganymede", "Callisto", "Io", "Europa"],
	datasets: [
		{
			"values": distances,
			"formatted": distances.map(d => d*1000 + " km")
		}
	]
};

let events_chart = new Chart({
	parent: "#chart-events",
	title: "Jupiter's Moons: Semi-major Axis (1000 km)",
	data: events_data,
	type: 'bar',
	height: 250,
	colors: ['lightgreen'],
	is_navigable: 1,
});

let data_div = document.querySelector('.chart-events-data');

events_chart.parent.addEventListener('data-select', (e) => {
	let name = moon_names[e.index];
	data_div.querySelector('.moon-name').innerHTML = name;
	data_div.querySelector('.semi-major-axis').innerHTML = distances[e.index] * 1000;
	data_div.querySelector('.mass').innerHTML = masses[e.index];
	data_div.querySelector('.diameter').innerHTML = diameters[e.index];
	data_div.querySelector('img').src = "charts/img/" + name.toLowerCase() + ".png";
});

// Helpers
// ================================================================================
function shuffle(array) {
	// https://stackoverflow.com/a/2450976/6495043
	// Awesomeness: https://bost.ocks.org/mike/shuffle/

	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

