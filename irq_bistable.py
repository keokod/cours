from machine import Pin
import time

counter = 0;
bascule = False #à false on est sur **OFF** à True on est sur **ON**
pinOnOff = Pin(15, Pin.IN)
pinTrig = Pin(16, Pin.OUT)

def falling():
    print("=== Frond Montant ===")
    pinTrig.value(0)
    pinTrig.value(1)
    #time.sleep(7)
    
def irq():
    print("=== IRQ Start ===")

    
p2 = Pin(17, Pin.IN, Pin.PULL_UP)
p2.irq(lambda pin: irq(), Pin.IRQ_FALLING)

counter = counter +1

while True:
    print("|.....................................",counter)
    print(pinOnOff.value())
    
    if pinOnOff.value() == 0:
        if bascule == False:
            print("ON****")
            bascule = True
            print("bacule : ",bascule)
            falling()
            
    if pinOnOff.value() == 1 and bascule == True:
        bascule = False
        print("OFF***")
        #falling()
    counter = counter +1
    time.sleep(1)

