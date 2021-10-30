function start(callback) {

    let Gpio = require('onoff').Gpio; // Gpio class
    let button = new Gpio(23, 'in', 'rising', { debounceTimeout: 500 });
    let BUZ = new Gpio(18, 'out'); //On instancie un objet qui va utiliser la broche du processeur qui se nomme GPIO4
    console.log('Attente sonnerie ...');
    let sonne = button.watch((err, value) => {
        if (err) {
            throw err;
        }
        console.log('Appel en cours ... , activation du GPIO 23 en valeur :' + value);
        let blinkInterval = setInterval(blinkBUZ, 0.5); //on active la fonction setInterval toute les 500 millisecondes
        function blinkBUZ() { //function to start blinking
            if (BUZ.readSync() === 0) { //check the pin state, if the state is 0 (or off)
                BUZ.writeSync(1); //set pin state to 1 (turn BUZ on)
            } else {
                BUZ.writeSync(0); //set pin state to 0 (turn BUZ off)
            }
        }

        function endBuz() { //function to stop blinking
            clearInterval(blinkInterval); // Stop blink intervals
            BUZ.writeSync(0); // Turn BUZ off
            BUZ.unexport(); // Unexport GPIO to free resources
            callback();
        }

        setTimeout(endBuz, 9000); //stop blinking after 15 seconds
        button.unexport();
        console.log("démarrage de la commande sonnerie ...");
    });
}

function run() {
    start(function () {
        console.log('Sonnerie terminé');
        run();
    });
}
run();
