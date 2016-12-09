conversions = {
	kgToLb: function(weightKg){
		return 2.20462*weightKg;
	},
	
	lbToKg: function(weightLb){
		return 0.453592*weightLb;
	},
	
	ftToM: function(heightFt){
		return heightFt*0.3048;
	},
	
	bmi: function(heightFt, weightLbs){
		return this.lbToKg(weightLbs) / Math.pow(this.ftToM(heightFt),2);
	},
	
	heightToText: function(height){
		return Math.floor(height)+'\''+Math.round((height-Math.floor(height))*12)+'"';
	},
	
	weightToText: function(weight){
		return Math.round(weight)+' lbs';
	}
}