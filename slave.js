var globals = {
	chosenStatBarColor: 'pink'
}

var constants = {
	possibleCupSizes: ['A','B','C','D','E','F','G','H'],
	averageMaleHeight: 5.75,
	averageMaleWeight: 160,
	averageFemaleHeight: 5.5,
	averageFemaleWeight: 135,
	minFemaleHeight: 0.85*5.5*0.8,
	maxFemaleHeight: 1.15*5.5,
	minFemaleWeight: 0.75*135*0.8,
	maxFemaleWeight: 2.4*135,
	minMaleHeight: 0.85*5.75*0.8,
	maxMaleHeight: 1.15*5.75,
	minMaleWeight: 0.75*160*0.8,
	maxMaleWeight: 2.4*160,
	maxPenisSize: 10,
	minPenisSize: 1/2*4.5      //the 1/2 is the lowest possible value of the age modifier
}

// arrays that determine the odds of each possible value of an attribute occuring in a newly generated slave
var odds = {
	sex:  		[[3, 7, 1],['m', 'f', 'h']],
	face: 		[[1, 1, 3, 5, 5, 5, 3, 1, 1],[1,2,3,4,5,6,7,8,9,10]],
	age: 		[[1, 8, 4, 2],[10, 20, 30, 40]],
	breast: 	[[6, 8, 6, 3, 1],['A', 'B', 'C', 'D', 'E']],
	race:		[[1, 1, 1, 1, 1],['European', 'African', 'East-asian', 'Indian', 'Middle-eastern']],
	breastPerk:	[[1,1,1,1,1],[1,2,3,4,5]],
	weight:		[[   8,   40,  50,   40,    6,   1,   1,  1,   1],
				 [0.75, 0.87,   1, 1.13, 1.25, 1.5, 1.8,  2, 2.4]], //output is a weight multiplier which is applied to the average weight (per sex)
	height:     [[   1,     2,   4,    8,   14,    16, 16,     16,   8,     4,   2,     2,    1],
				 [0.85, 0.875, 0.9, 0.925, .95,  .975,  1, 1.025, 1.05, 1.075, 1.1, 1.125, 1.15]],  //output is a height multiplier which is applied to the average height (per sex)
	butt:		[[1, 2, 4, 2, 1],[1, 2, 3, 4, 5]],
	musculature:[[3, 5, 8, 6, 3, 2, 1, 1, 1, 1],[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]],
	penisSize:	[[  1, 5,  10,10,  8,  5,   3, 2,   2, 1,   1,  1],
				 [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]]
}

function myFunc() {
	console.log('ay lmao');
}

function populateSlaveStatScreen(slave) {
	var statCellsFilled = 0;
	var i = 0;
	
	globals.chosenStatBarColor = slave.sex === 'm' ? '#9ec1e2' : slave.sex === 'f' ? 'pink' : '#c7a7e2';
	
	document.getElementById('SlaveId').innerHTML = slave.name;
	document.getElementById('SlaveId').style = 'color:'+globals.chosenStatBarColor;
	document.getElementById('SlaveAge').innerHTML = slave.age;
	document.getElementById('SlaveSex').innerHTML = slave.sex;
	document.getElementById('SlaveRace').innerHTML = slave.race;
	document.getElementById('SlaveSex').style = 'color:'+globals.chosenStatBarColor;
	document.getElementById('PriceBought').innerHTML = slave.priceBought;
	document.getElementById('DateBought').innerHTML = slave.dateBought;
	document.getElementById('AgeEnslaved').innerHTML = slave.ageEnslaved;
	document.getElementById('NumOwners').innerHTML = slave.numOwners;
	
	//blank out table if it already exists
	var oldTbody = document.getElementById("SlaveSexStatTable").firstChild;
	var newTbody = document.createElement('tbody');
	oldTbody.parentNode.replaceChild(newTbody, oldTbody);
	
	// face
	//appendStatRow('Face', slave.face, slave.face, newTbody);
	appendStatValue('Face', slave.face, newTbody);
	
	// height and weight
	if(slave.sex === 'm'){
		//statCellsFilled = Math.round((slave.heightModified - constants.minMaleHeight) / (constants.maxMaleHeight - constants.minMaleHeight) * 10);
		//appendStatRow('Height', statCellsFilled, conversions.heightToText(slave.heightModified), newTbody);
		appendStatValue('Height', conversions.heightToText(slave.heightModified), newTbody);
		
		
		//statCellsFilled = Math.round((slave.weightModified - constants.minMaleWeight) / (constants.maxMaleWeight - constants.minMaleWeight) * 10);
		//appendStatRow('Weight', statCellsFilled, conversions.weightToText(slave.weightModified), newTbody);
		appendStatValue('Weight', conversions.weightToText(slave.weightModified), newTbody);
	}
	else{
		//statCellsFilled = Math.round((slave.heightModified - constants.minFemaleHeight) / (constants.maxFemaleHeight - constants.minFemaleHeight) * 10);
		//appendStatRow('Height', statCellsFilled, conversions.heightToText(slave.heightModified), newTbody);
		appendStatValue('Height', conversions.heightToText(slave.heightModified), newTbody);
		
		//statCellsFilled = Math.round((slave.weightModified - constants.minFemaleWeight) / (constants.maxFemaleWeight - constants.minFemaleWeight) * 10);
		//appendStatRow('Height', conversions.heightToText(slave.heightModified), newTbody);
		appendStatValue('Weight', conversions.weightToText(slave.weightModified), newTbody);
	}
	
	if(slave.sex !== 'm'){
		// breasts
		//statCellsFilled = Math.round(((constants.possibleCupSizes.indexOf(slave.breastCupModified) + 1) / constants.possibleCupSizes.length) * 10);
		//appendStatRow('Breast Cup Size', statCellsFilled,slave.breastCupModified,newTbody);
		appendStatValue('Breast Cup Size', slave.breastCupModified, newTbody);
		
		// breast perkiness
		//statCellsFilled = slave.breastPerkModified*2;
		//appendStatRow('Breast Perkiness', statCellsFilled, slave.breastPerkModified, newTbody);
		appendStatValue('Breast Perkiness Size (/5)', slave.breastPerkModified, newTbody);
	}
	
	// penisSize
	if(slave.sex !== 'f'){
		//statCellsFilled = Math.round((slave.penisSizeModified - constants.minPenisSize) / (constants.maxPenisSize - constants.minPenisSize) * 10);
		//appendStatRow('Penis Size', statCellsFilled,slave.penisSizeModified,newTbody);
		appendStatValue('Penis Size', slave.penisSizeModified, newTbody);
	}
	
	//butt
	//statCellsFilled = slave.butt*2;
	//appendStatRow('Butt Size', statCellsFilled, slave.butt, newTbody);
	appendStatValue('Butt Size', slave.butt, newTbody);
	
	//muscle
	//statCellsFilled = Math.round(slave.musculature/10);
	//appendStatRow('Musculature', statCellsFilled, slave.musculature, newTbody);
	appendStatValue('Musculature (/10)', Math.round(slave.musculature/10), newTbody);
	
	//blank out table if it already exists
	oldTbody = document.getElementById("SlaveObedienceTable").firstChild;
	newTbody = document.createElement('tbody');
	oldTbody.parentNode.replaceChild(newTbody, oldTbody);
	
	appendStatRow('Fear', Math.round(slave.fear/10), slave.fear, newTbody);
	appendStatRow('Love', Math.round(slave.love/10), slave.love, newTbody);
	appendStatRow('Respect', Math.round(slave.respect/10), slave.respect, newTbody);
	
}

function appendStatValue(name, value, body) {
	var currentRow = body.insertRow(-1); //last index
	currentRow.insertCell().innerHTML = name;
	currentRow.insertCell().innerHTML = value;
}

function appendStatRow(name, cellsFilled, value, body){
	var blankStatBarColor = '#dddddd';
	var i = 0;
	
	var currentRow = body.insertRow(-1); //last index
	
	currentRow.insertCell().innerHTML = name;
	for(i=0;i<10;i++){
		currentRow.insertCell(i+1).style = 'width: 20px';
		if(i+1 <= cellsFilled){
			currentRow.cells[i+1].style = 'background-color: '+globals.chosenStatBarColor+'; width: 20px';
		}
		else {
			currentRow.cells[i+1].style = 'background-color: '+blankStatBarColor+'; width: 20px';
		}
	}
	
	currentRow.insertCell(i+1);
	currentRow.cells[i+1].innerHTML = value;
}

function assignDefaultFemaleCharacteristics(slave) {
	var slaveGirl = {
		// sexual characteristics
		face: 5,            // 0 to 10
		sex: "f",        	 // f, m, h
		race:"white",   	// white, black, east-asian, indian, arab
		age:30, 		 	// 10 to 49
		breastCup:"B",	 	// a to h
		breastCupModified: "A",
		breastPerk:3, 	 	// 1 to 5
		breastPerkModified: 3,
		weight: 135, 	 	// lbs
		weightModified: 135,
		height: 5.5, 	 	// ft
		heightModified: 5.5, // ft
		musculature: 30, 	// 0 to 100
		butt: 5,			// 1-5 small to fat
		penisSize: 0, 		// inches
		penisSizeModified: 0
	}
	
	for (attr in slaveGirl) {
		slave[attr] = slaveGirl[attr];
	}
}

function assignDefaultMaleCharacteristics(slave) {
	var slaveMan = {
		// sexual characteristics
		face: 5,            // 0 to 10
		sex: "m",        	 // f, m, h
		race:"white",   	// white, black, east-asian, indian, arab
		age:30, 		 	// 10 to 50
		breastCup:"A",	 	// a to h
		breastCupModified: "A",
		breastPerk:5, 	 	// 1 to 10
		weight: 160, 	 	// lbs
		weightModified: 160,
		height: 5.75, 	 	// ft
		heightModified: 5.5,
		musculature: 30, 	// 0 to 100
		butt: 5,			// 1-10 small to fat
		penisSize: 6, 	// inches
		penisSizeModified: 6
	}
	
	for (attr in slaveMan) {
		slave[attr] = slaveMan[attr];
	}
}

function assignDefaultSexualSkills(slave) {
	// sexual skills
	var tempSlave = {
		fapjobs: 50,     	// 0 to 100
		schlickjobs: 50, 	// 0 to 100
		blowjobs: 50,    	// 0 to 100
		eatout: 50,      	// 0 to 100
		giveAnal: 50,    	// 0 to 100
		takeAnal: 50,    	// How big they can take and how pleasureable it is for giver
		giveAnal: 50,		// How pleasureable it will be for taker
		takeVaginal: 50,	// How big and how pleasureable for giver
		giveVaginal: 50,
		kinkyness: 10
	}
	
	for (attr in tempSlave) {
		slave[attr] = tempSlave[attr];
	}
}
		
function assignDefaultSlaveryAttributes(slave){
	// slavery values
	var tempSlave = {
		name: 'Parker',
		obedience: 10,  // 0 to 100
		ageEnslaved: 0, // 0 means born into slavery
		numOwners: 1,
		fear: 0,
		respect: 0,
		love: 0,
		priceBought: 0, // price bought for in Denarii
		dateBought: 0
	}
	for (attr in tempSlave) {
		slave[attr] = tempSlave[attr];
	}
}

function assignDefaultWorkSkills(slave){
	// work skills
	var tempSlave = {
		//modifiers
		intelligence: 50,  	// 0 to 100
		charisma: 20,      	// 0 to 100
		effort: 50,			// 0 to 100
		aptitude: 50,		// 0 to 100 (allows skills to increase faster)
		
		//skills
		entertain: 20,
		serve: 20,
		farm: 20,
		clean: 20,
	}
	for (attr in tempSlave) {
		slave[attr] = tempSlave[attr];
	}
}

function generateFemaleSlaveDescription(slave){
	var desc = '';
	desc+=slave.name+' is of '+slave.race+' descent. ';
	if(slave.height>6.25){
		desc+='She towers at a height of ';
	}
	else if(slave.height > 5.8){
		desc+='She\'s tall at a height of ';
	}
	else if(slave.height > 5.3){
		desc+='She stands at a typical height of ';
	}
	else if(slave.height > 5){
		desc+='She\'s quite short at a height of ';
	}
	else {
		desc+='She\'s tiny at a height of ';
	}
	desc+=conversions.heightToText(slave.height)+'.';
	desc+='Her BMI is '+conversions.bmi(slave.height,slave.weight)+'. ';
	
	if(slave.age > 40){
		desc+=slave.age+' years old, she\'s showing obvious signs of age. ';
	}
	else if (slave.age > 30) {
		desc+=slave.age+' years old, she\'s beginning to age, but retains a marked youthfulness. ';
	}
	else if (slave.age > 20) {
		desc+=slave.age+' years old, she\'s in her prime. ';
	}
	else if(slave.age>16){
		desc+=slave.age+' years old, she\'s quite young, but a fully capable slave. ';
	}
	else{
		desc+=slave.age+' years old, she\'s still a child. ';
	}
	console.log(desc);
}

function constructRandomSlave() {
	newSlave = new Object();
	var tempArray = [0];
	
	//choose gender
	var gender = getOddsResult(odds.sex[0], odds.sex[1]);
	if(gender === "f"){
		assignDefaultFemaleCharacteristics(newSlave);
	}
	else if(gender === "m") {
		assignDefaultMaleCharacteristics(newSlave);
	}
	else {
		assignDefaultFemaleCharacteristics(newSlave);
		newSlave.sex = 'h';
		newSlave.penisSize=6;
	}
	assignDefaultWorkSkills(newSlave);
	assignDefaultSexualSkills(newSlave);
	assignDefaultSlaveryAttributes(newSlave);
	
	//overwrite sex characteristics with new generated values
	newSlave.face = getOddsResult(odds.face[0], odds.face[1]);
	newSlave.race = getOddsResult(odds.race[0], odds.race[1]);
	newSlave.age = getOddsResult(odds.age[0], odds.age[1]);
	newSlave.age = Math.floor(newSlave.age + Math.random()*10);  //the second digit is a totally random distribution
	newSlave.breastCup = getOddsResult(odds.breast[0], odds.breast[1]);
	newSlave.breastPerk = getOddsResult(odds.breastPerk[0], odds.breastPerk[1]);
	newSlave.weight = newSlave.weight * getOddsResult(odds.weight[0], odds.weight[1]);
	newSlave.height = newSlave.height * getOddsResult(odds.height[0], odds.height[1]);
	newSlave.butt = getOddsResult(odds.butt[0], odds.butt[1]);
	newSlave.musculature = Math.floor(getOddsResult(odds.musculature[0], odds.musculature[1]) + 10 *Math.random());
	newSlave.penisSize = getOddsResult(odds.penisSize[0], odds.penisSize[1]);
	
	newSlave.heightModified = newSlave.height;
	newSlave.penisSizeModified = newSlave.penisSize;
	newSlave.breastCupModified = newSlave.breastCup;
	newSlave.breastPerkModified = newSlave.breastPerk;
	newSlave.weightModified = newSlave.weight;
	
	//apply an age modifier to age-based traits (e.g. height, weight)
	applyModifiers(newSlave);
	
	var pString='';
	for (attr in newSlave) {
		pString += (attr+' = '+newSlave[attr]) + ', ';
		console.log(attr+' = '+newSlave[attr]);
	}
	document.getElementById('SlaveStats').innerHTML = pString;
	populateSlaveStatScreen(newSlave);
	if(newSlave.sex === 'f'){
		generateFemaleSlaveDescription(newSlave);
	}
	return false;
}

function applyModifiers(slave){
	//attributes affected by age
	if(slave.age < 16){
		//slave.weightModified = slave.age/20 * slave.weight;  //age affects slave weight indirectly via height modifier for weight
		slave.heightModified = (.0333*slave.age + 0.4667) * slave.height;  //smallest multiplier is 0.8
		slave.penisSizeModified = slave.age/16 * slave.penisSize;
		slave.breastCupModified = constants.possibleCupSizes[Math.floor((slave.age-10)/6 * constants.possibleCupSizes.indexOf(slave.breastCup))];
	}
	if(slave.age > 25){
		var perkAdder = Math.round(-slave.age/10+2.5);
		slave.breastPerkModified = Math.min(Math.max(slave.breastPerk + perkAdder,0),5);
	}
	
	// attributes affected by height
	slave.weightModified *= slave.heightModified / ((slave.sex === 'f')? constants.averageFemaleHeight:constants.averageMaleHeight);
	
	// attributes affected by weight
	if(slave.sex === 'f' || slave.sex === 'h') {
		var breastAdder = Math.min(  Math.max(Math.round(slave.weight/constants.averageFemaleWeight * 4 - 4  ,-2))   ,   2  ); //set so 1.5 times average weight adds 2 cup sizes. (maximum of 2 can be added)
																									   // Note this is intentionally using weight instead of weightModified
																									   // so height does not affect breast size indirectly
		console.log('breast adder = '+breastAdder);
		slave.breastCupModified = constants.possibleCupSizes[Math.min(Math.max(constants.possibleCupSizes.indexOf(slave.breastCupModified) + breastAdder,0), constants.possibleCupSizes.length-1)];
		slave.breastPerkModified = Math.min(Math.max(slave.breastPerkModified - breastAdder, 1),5); //opposite of breast modifier
	}
}



function getOddsResult(oddsMap, output){
	var sum = 0;
	var val = 0;
	var i = 0;
	
	for (i=0; i<oddsMap.length; i++) {
		sum+=oddsMap[i];
	}
	var result = Math.random()*sum;
	
	sum = 0;
	for (i=0; i<oddsMap.length; i++) {
		sum+=oddsMap[i];
		if(result < sum){
			return output[i];
		}
	}
	console.log('error: getOddsResult() failed');
	return -1;
}

function generateAttractivenessRating(){
	
}