var Gpio = require('onoff').Gpio; //importation de la librairie onoff et on inter réagit avec le port GPIO
var LED = new Gpio(4, 'out'); //On instancie un objet qui va utiliser la broche du processeur qui se nomme GPIO4
var blinkInterval = setInterval(blinkLED, 500); //on active la fonction setInterval toute les 500 millisecondes

function blinkLED() { //function to start blinking
    if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
        LED.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
        LED.writeSync(0); //set pin state to 0 (turn LED off)
    }
}

function endBlink() { //function to stop blinking
    clearInterval(blinkInterval); // Stop blink intervals
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds
