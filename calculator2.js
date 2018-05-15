// The Gist: every input is stored in an array (inp), which is joined and stored into a string (mem) and converted to a number as needed.
// Features: Basic calculations as advertised along with keypress input, number-operator-enter incrementation for each operation ("8*=" => "64", "=" => "512" etc), multiple calculations in a chain, negative numbers (not available with keypress).
// Bugs: 7% acts really weird, guess it is a thing with js. Not easily fixed with toPrecision. https://gist.github.com/lsloan/f8c5ab552545ee968cca Can't calculate a number and continue after hitting "enter".


// Variables
let mem = '';
let memInc = 0;
let oppTemp = ''; // Allows for chaining calculations by storing the opp to come while the opp click runs an enter()
let opp = ''; // Hello, operator!
let inp = [];
let display = '';
let pct = false;
let inv = false;
let inc = false;

/* Display */
document.addEventListener('click', function() { 

	display = inp.join('');

	if(display.length === 0 && mem.length === 0){ 
		document.getElementById('display').innerHTML = '0'; 
	}
	else if(display.length === 0 && mem.length !== 0 && pct !== true){ 
		document.getElementById('display').innerHTML = mem; 
	}
	else if(pct){
		document.getElementById('display').innerHTML = mem*100 + '%'; 
		pct = false;
	}
	else { 
		document.getElementById('display').innerHTML = display; 
	}
	
	if(inv){
		document.getElementById('neg').innerHTML = '-';
	}
	else {
		document.getElementById('neg').innerHTML = '';
	}
	
});

function tilfoej(x) {
	if(inp.length < 19){ inp.push(x); }
}

/* Numberpad */
document.getElementById('ni').addEventListener('click', function() { tilfoej(9);});
document.getElementById('otte').addEventListener('click', function() { tilfoej(8); });
document.getElementById('syv').addEventListener('click', function() { tilfoej(7); });
document.getElementById('seks').addEventListener('click', function() { tilfoej(6); });
document.getElementById('fem').addEventListener('click', function() { tilfoej(5); });
document.getElementById('fire').addEventListener('click', function() { tilfoej(4); });
document.getElementById('tre').addEventListener('click', function() { tilfoej(3); });
document.getElementById('to').addEventListener('click', function() { tilfoej(2); });
document.getElementById('en').addEventListener('click', function() { tilfoej(1); }); 
document.getElementById('nul').addEventListener('click', function() { tilfoej(0); });
document.getElementById('dot').addEventListener('click', function() { tilfoej('.'); }); // Træls særegenskab ved funktioner i addEventListener https://stackoverflow.com/questions/27245040/addeventlistener-click-executed-before-clicked


/* Calculations */
document.getElementById('plus').addEventListener('click', function() { 
	if(opp.length === 0){
		opp = 'plus'; inpToMem();
	}
	else{
		oppTemp = 'plus'; inpToMem();
	}
});
document.getElementById('subt').addEventListener('click', function() { 
	if(opp.length === 0){
		opp = 'subt'; inpToMem();
	}
	else{
		oppTemp = 'subt'; inpToMem();
	}
});
document.getElementById('mult').addEventListener('click', function() { 
	if(opp.length === 0){
		opp = 'mult'; inpToMem();
	}
	else{
		oppTemp = 'mult'; inpToMem();
	}
});
document.getElementById('divi').addEventListener('click', function() { 
	if(opp.length === 0){
		opp = 'divi'; inpToMem();
	}
	else{
		oppTemp = 'divi'; inpToMem();
	}
});

function inpToMem(){
	if(mem.length === 0){
		mem = inp.join('');
		mem = Number(mem);
		if (inv) {mem = -1*mem; inv = false;}
		inp = [];
		document.getElementById('display').innerHTML = mem;
	}
	// Chain-stuff
	else if (pct !== true) {
		enter();
		opp = oppTemp;
	}
}

/*
function chainOpp(){
	if(opp.length === 0){document.getElementById('chain').append(x);}
}
*/

/* Transformationer */
document.getElementById('lig').addEventListener('click', function(){ enter() });

function enter() {

	// Beregn, display og smid i mem
	if (opp === 'plus' && mem.length !== 0  && inp.length !== 0){
		mem = Number(mem);
		
		inp = inp.join('');
		inp = Number(inp);
		
		if(inv){display = mem + -1*inp;}
		else {display = mem + inp;}
		inv = false;
		document.getElementById('display').innerHTML = display;
	}
	
	else if (opp === 'subt' && mem.length !== 0  && inp.length !== 0){
		mem = Number(mem);
		
		inp = inp.join('');
		inp = Number(inp);
		
		if(inv){display = mem - -1*inp;}
		else {display = mem - inp;}
		inv = false;
		document.getElementById('display').innerHTML = display;
	}
	
	else if (opp === 'mult' && mem.length !== 0  && inp.length !== 0){
		mem = Number(mem);
		
		inp = inp.join('');
		inp = Number(inp);
		
		if(inv){display = mem * -1*inp;}
		else {display = mem * inp;}
		inv = false;
		document.getElementById('display').innerHTML = display;
	}
	
	else if (opp === 'divi' && mem.length !== 0  && inp.length !== 0){
		mem = Number(mem);
		
		inp = inp.join('');
		inp = Number(inp);
		
		if(inv){display = mem / (-1*inp);}
		else {display = mem / inp;}
		inv = false;
		document.getElementById('display').innerHTML = display;
	}
	
	/* Incremental - you can click a number, an operator and enter. This will increment the operation at each hit of enter. */
	else if (mem.length !== 0 && inp.length === 0 && opp === 'plus'){
		if(inc === false){
			memInc = mem; 
			inc = true;}; 
		display = memInc + mem;
	}
	
	else if (mem.length !== 0 && inp.length === 0 && opp === 'subt'){
		if(inc === false){
			memInc = mem; 
			inc = true;}; 
		display = mem - memInc;
	}
	
	else if (mem.length !== 0 && inp.length === 0 && opp === 'mult'){
		if(inc === false){
			memInc = mem; 
			inc = true;}; 
		display = memInc * mem;
	}
	
	else if (mem.length !== 0 && inp.length === 0 && opp === 'divi'){
		if(inc === false){
			memInc = mem; 
			inc = true;}; 
		display = mem / memInc;
	}
	
	mem = display;
	inp = [];
}

document.getElementById('pct').addEventListener('click', function() { 
	// multiply by 0.01 and then multiply with the next number entered.
	pct = true;
	inp = inp.join('');
	inp = Number(inp);
	mem = 0.01 * inp;
	console.log(mem);
	opp = 'mult';
	//inpToMem();
	inp = [];
});

document.getElementById('c').addEventListener('click', function() { 
	inp = [];
	mem = '';
	inv = false;
	inc = false;
	pct = false;
	opp = '';
	oppTemp = '';
});

document.getElementById('ce').addEventListener('click', function() { 
	inp = [];
	inv = false;
	inc = false;
});

document.getElementById('inv').addEventListener('click', function() { 
	// Negative number toggle
	if(inv === false){inv = true;}
	else {inv = false;}
});


// Allows for numpad and number keys, along with operators - no percentage nor negative number support. Shoould probably be a switch statement, but I am too lazy to change it now.
window.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.keyCode === 97 || event.keyCode === 49) {
		document.getElementById("en").click();
	}
	else if (event.keyCode === 98 || event.keyCode === 50) {
		document.getElementById("to").click();
	}
	else if (event.keyCode === 99 || event.keyCode === 51) {
		document.getElementById("tre").click();
	}
	else if (event.keyCode === 100 || event.keyCode === 52) {
		document.getElementById("fire").click();
	}
	else if (event.keyCode === 101 || event.keyCode === 53) {
		document.getElementById("fem").click();
	}
	else if (event.keyCode === 102 || event.keyCode === 54) {
		document.getElementById("seks").click();
	}
	else if (event.keyCode === 103 || event.keyCode === 55) {
		document.getElementById("syv").click();
	}
	else if (event.keyCode === 104 || event.keyCode === 56) {
		document.getElementById("otte").click();
	}
	else if (event.keyCode === 105 || event.keyCode === 57) {
		document.getElementById("ni").click();
	}
	else if (event.keyCode === 96 || event.keyCode === 48) {
		document.getElementById("nul").click();
	}
	else if (event.keyCode === 107) {
		document.getElementById("plus").click();
	}
	else if (event.keyCode === 109 && inp.length === 0 && mem.length === 0) {
		document.getElementById("inv").click();
	}
	else if (event.keyCode === 109) {
		document.getElementById("subt").click();
	}
	else if (event.keyCode === 106) {
		document.getElementById("mult").click();
	}
	else if (event.keyCode === 111) {
		document.getElementById("divi").click();
	}
	else if (event.keyCode === 110) {
		document.getElementById("dot").click();
	}
	else if (event.keyCode === 13) {
		document.getElementById("lig").click();
	}
	else if (event.keyCode === 27) {
		document.getElementById("c").click();
	}
	else if (event.keyCode === 8) {
		document.getElementById("ce").click();
	}
	else if (event.keyCode === 37) {
		document.getElementById("pct").click();
	}
	
});






