var months = [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Aout",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre"
	];

exports.displayDate = function(date) {
	if (date) {
		return months[date.getMonth() || 0] + " " + date.getFullYear();
	} else {
		return "";
	}
	
}