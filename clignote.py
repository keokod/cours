from gpiozero import LED
from time import sleep
pin7 = LED(4) #on branche une led sur la patte gpio4 et la variable se nomme pin7 broche n7
ecouler = 0
while ecouler <5 :
    pin7.on()
    sleep(0.5)
    pin7.off()
    sleep(0.5)
    ecouler= ecouler + 1
