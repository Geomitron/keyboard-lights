import { CorsairLedId_Keyboard } from 'cue-sdk'
import { IGlobalKey } from 'node-global-key-listener'


export function getCorsairKeyFromIGlobalKey(key: IGlobalKey): CorsairLedId_Keyboard {
  switch(key) {
    case 'A': return CorsairLedId_Keyboard.CLK_A
    case 'B': return CorsairLedId_Keyboard.CLK_B
    case 'C': return CorsairLedId_Keyboard.CLK_C
    case 'D': return CorsairLedId_Keyboard.CLK_D
    case 'E': return CorsairLedId_Keyboard.CLK_E
    case 'F': return CorsairLedId_Keyboard.CLK_F
    case 'G': return CorsairLedId_Keyboard.CLK_G
    case 'H': return CorsairLedId_Keyboard.CLK_H
    case 'I': return CorsairLedId_Keyboard.CLK_I
    case 'J': return CorsairLedId_Keyboard.CLK_J
    case 'K': return CorsairLedId_Keyboard.CLK_K
    case 'L': return CorsairLedId_Keyboard.CLK_L
    case 'M': return CorsairLedId_Keyboard.CLK_M
    case 'N': return CorsairLedId_Keyboard.CLK_N
    case 'O': return CorsairLedId_Keyboard.CLK_O
    case 'P': return CorsairLedId_Keyboard.CLK_P
    case 'Q': return CorsairLedId_Keyboard.CLK_Q
    case 'R': return CorsairLedId_Keyboard.CLK_R
    case 'S': return CorsairLedId_Keyboard.CLK_S
    case 'T': return CorsairLedId_Keyboard.CLK_T
    case 'U': return CorsairLedId_Keyboard.CLK_U
    case 'V': return CorsairLedId_Keyboard.CLK_V
    case 'W': return CorsairLedId_Keyboard.CLK_W
    case 'X': return CorsairLedId_Keyboard.CLK_X
    case 'Y': return CorsairLedId_Keyboard.CLK_Y
    case 'Z': return CorsairLedId_Keyboard.CLK_Z
    case '0': return CorsairLedId_Keyboard.CLK_0
    case '1': return CorsairLedId_Keyboard.CLK_1
    case '2': return CorsairLedId_Keyboard.CLK_2
    case '3': return CorsairLedId_Keyboard.CLK_3
    case '4': return CorsairLedId_Keyboard.CLK_4
    case '5': return CorsairLedId_Keyboard.CLK_5
    case '6': return CorsairLedId_Keyboard.CLK_6
    case '7': return CorsairLedId_Keyboard.CLK_7
    case '8': return CorsairLedId_Keyboard.CLK_8
    case '9': return CorsairLedId_Keyboard.CLK_9
    case 'SPACE': return CorsairLedId_Keyboard.CLK_Space
    case 'COMMA': return CorsairLedId_Keyboard.CLK_CommaAndLessThan
    case 'DOT': return CorsairLedId_Keyboard.CLK_PeriodAndBiggerThan
    case 'SEMICOLON': return CorsairLedId_Keyboard.CLK_SemicolonAndColon
    case 'FORWARD SLASH': return CorsairLedId_Keyboard.CLK_SlashAndQuestionMark
    case 'MINUS': return CorsairLedId_Keyboard.CLK_MinusAndUnderscore
    case 'EQUALS': return CorsairLedId_Keyboard.CLK_EqualsAndPlus
    case 'F1': return CorsairLedId_Keyboard.CLK_F1
    case 'F2': return CorsairLedId_Keyboard.CLK_F2
    case 'F3': return CorsairLedId_Keyboard.CLK_F3
    case 'F4': return CorsairLedId_Keyboard.CLK_F4
    case 'F5': return CorsairLedId_Keyboard.CLK_F5
    case 'F6': return CorsairLedId_Keyboard.CLK_F6
    case 'F7': return CorsairLedId_Keyboard.CLK_F7
    case 'F8': return CorsairLedId_Keyboard.CLK_F8
    case 'F9': return CorsairLedId_Keyboard.CLK_F9
    case 'F10': return CorsairLedId_Keyboard.CLK_F10
    case 'F11': return CorsairLedId_Keyboard.CLK_F11
    case 'F12': return CorsairLedId_Keyboard.CLK_F12
    case 'TAB': return CorsairLedId_Keyboard.CLK_Tab
    case 'SQUARE BRACKET OPEN': return CorsairLedId_Keyboard.CLK_BracketLeft
    case 'SQUARE BRACKET CLOSE': return CorsairLedId_Keyboard.CLK_BracketRight
    case 'BACKSLASH': return CorsairLedId_Keyboard.CLK_Backslash
    default: return CorsairLedId_Keyboard.CLK_Escape
  }
}
