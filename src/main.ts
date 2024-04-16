import { CorsairConnect, CorsairDeviceType, CorsairDisconnect, CorsairErrorToString, CorsairGetDevices, CorsairLedColor, CorsairLedId_Keyboard, CorsairSessionState, CorsairSessionStateToString, CorsairSetLedColors, CorsairUnsubscribeFromEvents } from 'cue-sdk'
import _ from 'lodash'
import { GlobalKeyboardListener, IGlobalKey, IGlobalKeyDownMap } from 'node-global-key-listener'
import { inspect } from 'util'
import { getCorsairKeyFromIGlobalKey } from './pure-functions'

const GREEN = { r: 0, g: 255, b: 0 }
const RED = { r: 255, g: 0, b: 0 }
const YELLOW = { r: 255, g: 255, b: 0 }
const BLUE = { r: 0, g: 0, b: 255 }
const ORANGE = { r: 255, g: 128, b: 0 }
const PURPLE = { r: 255, g: 0, b: 255 }

const fretKeys = ['A', 'S', 'D', 'F', 'SPACE', 'J', 'K', 'L', 'SEMICOLON'] satisfies IGlobalKey[] as IGlobalKey[]
const strumKeys = ['R', 'U', 'I', 'O'] satisfies IGlobalKey[] as IGlobalKey[]

let deviceId: string

class LightController {

  private currentKeyState: Partial<{ [key in IGlobalKey]: { r: number, g: number, b: number } }> = {}
  private lastPressedSide: 'left' | 'right' = 'left'
  private heldFrets: (typeof fretKeys[number])[] = []
  activeFrets: (typeof fretKeys[number])[] = []
  private heldStrums: (typeof strumKeys[number])[] = []
  private lastStrumDirection: 'up' | 'down' = 'up'
  lastHeldStrummedFrets: (typeof fretKeys[number])[] = []
  private strummedFrets: (typeof fretKeys[number])[] = []

  fretChanged(fretKey: typeof fretKeys[number], pressed: boolean, changedFast: boolean) {
    if (pressed) {
      this.heldFrets.push(fretKey)
      if (changedFast) {
        this.activeFrets = [fretKey]
      } else {
        this.activeFrets.push(fretKey)
      }

      if (fretKey !== 'SPACE') {
        if ((['A', 'S', 'D', 'F'] satisfies IGlobalKey[] as IGlobalKey[]).includes(fretKey)) {
          this.lastPressedSide = 'left'
        } else {
          this.lastPressedSide = 'right'
        }
      }
    } else {
      this.heldFrets = this.heldFrets.filter(f => f !== fretKey)
      this.lastHeldStrummedFrets = this.lastHeldStrummedFrets.filter(f => f !== fretKey)
      this.activeFrets = this.activeFrets.filter(f => f !== fretKey)
      const nextHighestHeld = _.maxBy(this.heldFrets, f => fretToRank(f))
      if (nextHighestHeld) {
        this.activeFrets.push(nextHighestHeld)
      }
    }

    this.updateLights()
  }

  strum(strumKey: typeof strumKeys[number], pressed: boolean) {
    if (pressed) {
      this.heldStrums.push(strumKey)
      this.activeFrets = this.heldFrets.slice()
      this.strummedFrets = this.activeFrets.slice()
      this.lastHeldStrummedFrets = this.activeFrets.slice()

      if ((['I', 'R'] satisfies IGlobalKey[] as IGlobalKey[]).includes(strumKey)) {
        this.lastStrumDirection = 'up'
      } else {
        this.lastStrumDirection = 'down'
      }
    } else {
      this.heldStrums = this.heldStrums.filter(s => s !== strumKey)
      if (this.heldStrums.length === 0) { this.strummedFrets = [] }
    }

    this.updateLights()
  }

  starPower() {
    // Have two 3-height lines start on (8) and sweep left/right across the keyboard once (needs to go back to previous state once past)
  }

  whammy(pressed: boolean) {
    // Have all held lights dim when pressed and restore when released
  }

  private updateLights() {
    const newKeyState: Partial<{ [key in IGlobalKey]: { r: number, g: number, b: number } }> = {}

    for (const heldFret of this.heldFrets) {
      switch(heldFret) {
        case 'A': newKeyState['A'] = GREEN; newKeyState['Z'] = GREEN; break
        case 'S': newKeyState['S'] = RED; newKeyState['X'] = RED; break
        case 'D': newKeyState['D'] = YELLOW; newKeyState['C'] = YELLOW; break
        case 'F': newKeyState['F'] = BLUE; newKeyState['V'] = BLUE; break
        case 'SPACE': newKeyState['SPACE'] = ORANGE; newKeyState['B'] = ORANGE; break
        case 'J': newKeyState['J'] = BLUE; newKeyState['N'] = BLUE; break
        case 'K': newKeyState['K'] = YELLOW; newKeyState['M'] = YELLOW; break
        case 'L': newKeyState['L'] = RED; newKeyState['COMMA'] = RED; break
        case 'SEMICOLON': newKeyState['SEMICOLON'] = GREEN; newKeyState['DOT'] = GREEN; break
      }
    }

    for (const activeFret of [...this.activeFrets, ...this.lastHeldStrummedFrets]) {
      switch(activeFret) {
        case 'A': newKeyState['2'] = GREEN; break
        case 'S': newKeyState['3'] = RED; break
        case 'D': newKeyState['4'] = YELLOW; break
        case 'F': newKeyState['5'] = BLUE; break
        case 'SPACE': newKeyState[this.lastPressedSide === 'left' ? '6' : 'F5'] = ORANGE; break
        case 'J': newKeyState['7'] = BLUE; newKeyState['F4'] = BLUE; break
        case 'K': newKeyState['8'] = YELLOW; newKeyState['F3'] = YELLOW; break
        case 'L': newKeyState['9'] = RED; newKeyState['F2'] = RED; break
        case 'SEMICOLON': newKeyState['0'] = GREEN; newKeyState['F1'] = GREEN; break
      }
    }

    for (const heldStrum of this.heldStrums) {
      switch(heldStrum) {
        case 'R': newKeyState['R'] = PURPLE; break
        case 'U': newKeyState['U'] = PURPLE; newKeyState['7'] = PURPLE; newKeyState['F6'] = PURPLE; break
        case 'I': newKeyState['I'] = PURPLE; newKeyState['8'] = PURPLE; newKeyState['F7'] = PURPLE; break
        case 'O': newKeyState['O'] = PURPLE; newKeyState['9'] = PURPLE; newKeyState['F8'] = PURPLE; break
      }
    }

    if (_.intersection(['J', 'K', 'L', 'SEMICOLON'], this.strummedFrets).length === 0) {
      for (const strummedFret of this.strummedFrets) {
        switch(strummedFret) {
          case 'A': newKeyState[this.lastStrumDirection === 'up' ? 'F1' : 'Q'] = GREEN; break
          case 'S': newKeyState[this.lastStrumDirection === 'up' ? 'F2' : 'W'] = RED; break
          case 'D': newKeyState[this.lastStrumDirection === 'up' ? 'F3' : 'E'] = YELLOW; break
          case 'F': newKeyState[this.lastStrumDirection === 'up' ? 'F4' : 'R'] = BLUE; break
          case 'SPACE': newKeyState[this.lastStrumDirection === 'up' ? 'F5' : 'T'] = ORANGE; break
        }
      }
    } else if (_.intersection(['A', 'S', 'D', 'F', 'SPACE'], this.strummedFrets).length === 0) {
      for (const strummedFret of this.strummedFrets) {
        switch(strummedFret) {
          case 'J': newKeyState['5'] = BLUE; break
          case 'K': newKeyState['4'] = YELLOW; break
          case 'L': newKeyState['3'] = RED; break
          case 'SEMICOLON': newKeyState['2'] = GREEN; break
        }
      }
    } else {
      for (const strummedFret of this.strummedFrets) {
        switch(strummedFret) {
          case 'A': newKeyState['Q'] = GREEN; break
          case 'S': newKeyState['W'] = RED; break
          case 'D': newKeyState['E'] = YELLOW; break
          case 'F': newKeyState['R'] = BLUE; break
          case 'SPACE': newKeyState['6'] = ORANGE; newKeyState['T'] = ORANGE; break
          case 'J': newKeyState['5'] = BLUE; newKeyState['R'] = BLUE; break
          case 'K': newKeyState['4'] = YELLOW; newKeyState['E'] = YELLOW; break
          case 'L': newKeyState['3'] = RED; newKeyState['W'] = RED; break
          case 'SEMICOLON': newKeyState['2'] = GREEN; newKeyState['Q'] = GREEN; break
        }
      }
    }

    if (this.heldStrums.length > 0) {
      newKeyState[this.lastStrumDirection === 'up' ? 'ESCAPE' : 'TAB'] = PURPLE
    }

    if (this.strummedFrets.length === 0 && this.heldStrums.length > 0) {
      if (this.lastStrumDirection === 'down') { newKeyState['Q'] = PURPLE }
      newKeyState[this.lastStrumDirection === 'up' ? 'F1' : 'W'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F2' : 'E'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F3' : 'R'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F4' : 'T'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F5' : 'Y'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F6' : 'U'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F7' : 'I'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F8' : 'O'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F9' : 'P'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F10' : 'SQUARE BRACKET OPEN'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F11' : 'SQUARE BRACKET CLOSE'] = PURPLE
      newKeyState[this.lastStrumDirection === 'up' ? 'F12' : 'BACKSLASH'] = PURPLE
    }

    const turnedOnKeys = _.difference(_.keys(newKeyState), _.keys(this.currentKeyState)) as IGlobalKey[]
    const turnedOffKeys = _.difference(_.keys(this.currentKeyState), _.keys(newKeyState)) as IGlobalKey[]

    const colorBuffer: CorsairLedColor[] = []
    for (const turnedOnKey of turnedOnKeys) {
      const color = newKeyState[turnedOnKey]!
      colorBuffer.push({ id: getCorsairKeyFromIGlobalKey(turnedOnKey), r: color.r, g: color.g, b: color.b, a: 255 })
    }
    for (const turnedOffKey of turnedOffKeys) {
      colorBuffer.push({ id: getCorsairKeyFromIGlobalKey(turnedOffKey), r: 0, g: 0, b: 0, a: 255 })
    }
    CorsairSetLedColors(deviceId, colorBuffer)
    this.currentKeyState = newKeyState
  }

  // TODO: foot pedal to override changedFast to false?
  // TODO: incorporate dimmer colors somehow?
}

const keyListener = new GlobalKeyboardListener({ windows: {
  onError: (errorCode) => console.log('Key listener error: ', errorCode),
  onInfo: info => console.log(info)
}})

function close() {
	CorsairUnsubscribeFromEvents()
  CorsairDisconnect()
  keyListener.kill()
	process.exit()
}

process.on('SIGINT', () => close())

const lightController = new LightController()
main()

async function main() {
  await new Promise<void>((resolve, reject) => {
    CorsairConnect(({ data }) => {
      if (data.state === CorsairSessionState.CSS_Connected) {
        resolve()
      } else if (data.state !== CorsairSessionState.CSS_Connecting) {
        reject(CorsairSessionStateToString(data.state) + inspect(data.details))
      }
    })
  })

  const keyboardDevices = CorsairGetDevices({ deviceTypeMask: CorsairDeviceType.CDT_Keyboard })
  if (keyboardDevices.error) {
    console.log(`Error: couldn't get keyboard: ${CorsairErrorToString(keyboardDevices.error)}`)
    return close()
  } else if (keyboardDevices.data.length === 0) {
    console.log(`Error: Keyboard not found.`)
    return close()
  }

  deviceId = keyboardDevices.data[0].id

  const allKeyIds: number[] = []
  for (const key in CorsairLedId_Keyboard) {
    allKeyIds.push(Number(CorsairLedId_Keyboard[key]))
  }
  const turnedOffLedGroup = allKeyIds.map(id => ({ id, r: 0, g: 0, b: 0, a: 255 }))
  CorsairSetLedColors(deviceId, turnedOffLedGroup)

  let lastPress: IGlobalKey | null = null
  keyListener.addListener((event, isDown) => {
    if (event.name) {
      if (event.state === 'UP') {
        keyReleased(event.name)
        if (lastPress === event.name) {
          lastPress = null
        }
      } else {
        if (lastPress !== event.name) {
          keyPressed(event.name)
          lastPress = event.name
        }
      }
    }
  })
}

function keyReleased(key: IGlobalKey) {
  if (fretKeys.includes(key)) {
    lightController.fretChanged(key, false, false)
  } else if (strumKeys.includes(key)) {
    lightController.strum(key, false)
  }
}

function fretToRank(key: IGlobalKey) {
  switch(key) {
    case 'SEMICOLON': return 0
    case 'A': return 1
    case 'L': return 2
    case 'S': return 3
    case 'K': return 4
    case 'D': return 5
    case 'J': return 6
    case 'F': return 7
    case 'SPACE': return 8
    default: return 0
  }
}

/** Time stored as hrtime() */
let lastFretPressTime: [number, number] | null = null
function keyPressed(key: IGlobalKey) {
  if (fretKeys.includes(key)) {
    const diff = lastFretPressTime ? process.hrtime(lastFretPressTime) : [0, 0]
    if (diff[1] < 12000000
      || diff[1] > 400000000
      || (lightController.activeFrets.length > 0 && fretToRank(_.maxBy(lightController.activeFrets, key => fretToRank(key))!) > fretToRank(key))
    ) {
      lightController.fretChanged(key, true, false) // Active chord
    } else {
      lightController.fretChanged(key, true, true) // Single active note
    }
    lastFretPressTime = process.hrtime()
  } else if (strumKeys.includes(key)) {
    lightController.strum(key, true)
  }
}
