var Gpio = require('onoff').Gpio; //importation de la librairie onoff et on inter réagit avec le port GPIO      
var LED = new Gpio(20, 'out'); //On instancie un objet qui va utiliser la broche du processeur qui se nomme GPIO4

function changeRL(position){
    LED.writeSync(position); //set pin state to 1 (turn LED on)
}