# Example using PIO to drive a set of WS2812 LEDs.
from utime import sleep_ms
import array, time
from machine import Pin, UART
import rp2


# Configure the number of WS2812 LEDs.
NUM_LEDS = 13
PIN_NUM = 22
brightness = 0.2

@rp2.asm_pio(sideset_init=rp2.PIO.OUT_LOW, out_shiftdir=rp2.PIO.SHIFT_LEFT, autopull=True, pull_thresh=24)
def ws2812():
    T1 = 2
    T2 = 5
    T3 = 3
    wrap_target()
    label("bitloop")
    out(x, 1)               .side(0)    [T3 - 1]
    jmp(not_x, "do_zero")   .side(1)    [T1 - 1]
    jmp("bitloop")          .side(1)    [T2 - 1]
    label("do_zero")
    nop()                   .side(0)    [T2 - 1]
    wrap()


# Create the StateMachine with the ws2812 program, outputting on pin
sm = rp2.StateMachine(0, ws2812, freq=8_000_000, sideset_base=Pin(PIN_NUM))

# Start the StateMachine, it will wait for data on its FIFO.
sm.active(1)

# Display a pattern on the LEDs via an array of LED RGB values.
ar = array.array("I", [0 for _ in range(NUM_LEDS)])

##########################################################################
def pixels_show():
    dimmer_ar = array.array("I", [0 for _ in range(NUM_LEDS)])
    for i,c in enumerate(ar):
        r = int(((c >> 8) & 0xFF) * brightness)
        g = int(((c >> 16) & 0xFF) * brightness)
        b = int((c & 0xFF) * brightness)
        dimmer_ar[i] = (g<<16) + (r<<8) + b
    sm.put(dimmer_ar, 8)
    time.sleep_ms(10)

def pixels_set(i, color):
    ar[i] = (color[1]<<16) + (color[0]<<8) + color[2]

#########################

def initMP3():
    volume = 10 # volume
    mode = 0 # liasser le mode 0
    send_cmd(0x09, 3)
    set_eq(1)
    set_vol(volume)
    set_mode(mode)
    pause()
    
def send_cmd( cmd, data_low=0, data_high=0):
    uart = UART(1, baudrate=9600) # on défni l 'UART en pin 0 et 1
    uart.write(b'\x7E')
    uart.write(b'\xFF')
    uart.write(b'\x06')
    uart.write(bytes([cmd]))
    uart.write(b'\x00')
    uart.write(bytes([data_high]))
    uart.write(bytes([data_low]))
    uart.write(b'\xEF')
    sleep_ms(200)

def next_track():
    send_cmd(0x01)

def prev_track():
    send_cmd(0x02)

def sel_track( track_index):
    send_cmd(0x03, track_index)

def inc_vol():
    send_cmd(0x04)

def dec_vol():
    send_cmd(0x05)

def set_vol( volume):
    send_cmd(0x06, volume)

def set_eq( equalizer):
    send_cmd(0x07, equalizer)

def set_mode( mode):
    send_cmd(0x08, mode)

def suspend():
    send_cmd(0x0A)

def resume():
    send_cmd(0x0B)

def reset():
    send_cmd(0x0C)

def play():
    send_cmd(0x0D)

def pause():
    send_cmd(0x0E)

def set_folder( folder_index):
    send_cmd(0x0F, folder_index)

def enable_loop():
    send_cmd(0x11, 1)

def disable_loop():
    send_cmd(0x11, 0)
    

initMP3()
play()
