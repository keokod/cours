from machine import Pin
import time
from machine import UART
from utime import sleep_ms

class SimpleDFPlayerMini:
 
    def __init__(self, uart_id, volume, mode):
        self._uart = UART(uart_id, baudrate=9600)
        self._send_cmd(0x09, 0)
        self.set_eq(1)
        self.set_vol(volume)
        self.set_mode(mode)
        self.pause()
 
    def _send_cmd(self, cmd, data_low=0, data_high=0):
        self._uart.write(b'\x7E')
        self._uart.write(b'\xFF')
        self._uart.write(b'\x06')
        self._uart.write(bytes([cmd]))
        self._uart.write(b'\x00')
        self._uart.write(bytes([data_high]))
        self._uart.write(bytes([data_low]))
        self._uart.write(b'\xEF')
        sleep_ms(200)
 
    def next_track(self):
        self._send_cmd(0x01)
 
    def prev_track(self):
        self._send_cmd(0x02)
 
    def sel_track(self, track_index):
        self._send_cmd(0x03, track_index)
 
    def inc_vol(self):
        self._send_cmd(0x04)
 
    def dec_vol(self):
        self._send_cmd(0x05)
 
    def set_vol(self, volume):
        self._send_cmd(0x06, volume)
 
    def set_eq(self, equalizer):
        self._send_cmd(0x07, equalizer)
 
    def set_mode(self, mode):
        self._send_cmd(0x08, mode)
 
    def suspend(self):
        self._send_cmd(0x0A)
 
    def resume(self):
        self._send_cmd(0x0B)
 
    def reset(self):
        self._send_cmd(0x0C)
 
    def play(self):
        self._send_cmd(0x0D)
 
    def pause(self):
        self._send_cmd(0x0E)
 
    def set_folder(self, folder_index):
        self._send_cmd(0x0F, folder_index)
 
    def enable_loop(self):
        self._send_cmd(0x11, 1)
 
    def disable_loop(self):
        self._send_cmd(0x11, 0)
        
counter = 0
activeMp3 = False

pinOnOff = Pin(15, Pin.IN)
pinTrig = Pin(16, Pin.OUT)
pinSmith = Pin(17, Pin.IN)

p1 = SimpleDFPlayerMini(1,8,0)
p1.play()

def handle_interrupt(pin):
    global counter, activeMp3
    if counter == 0:
        print("!!! bouton appuyé !!")
        print(pin.value())
        counter = counter +1
        print(counter)
        
def introMp3():
    global activeMp3,counter
    if activeMp3 == False:
        print("intro MP3 *********")
        p1 = SimpleDFPlayerMini(1,18,0)
        p1.play()
        activeMp3 = True
    else:
        print("deja activer")
        print(counter)
        
pinSmith.irq(trigger=Pin.IRQ_RISING, handler=handle_interrupt)

while True:
    print(counter)
    pinTrig.value(1) #mettre à 0V l'entréer 16
    print("|||>>>")
    
    if pinOnOff.value() == 0:# quand on appuie sur ON, l'entrer 15 est à 0V
        introMp3()# lancer le mp3
        pinTrig.value(0)#remettre la borche de sortie 16 à 1
        counter = 0
        time.sleep(1)
        
    print("<<<|||")
    counter = counter + 1
    time.sleep(0.5)

