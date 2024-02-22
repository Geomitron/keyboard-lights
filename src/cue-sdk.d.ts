declare module 'cue-sdk' {
  enum CorsairError {
    CE_Success = 0,
    CE_NotConnected = 1,
    CE_NoControl = 2,
    CE_IncompatibleProtocol = 3,
    CE_InvalidArguments = 4,
    CE_InvalidOperation = 5,
    CE_DeviceNotFound = 6,
    CE_NotAllowed = 7
  }

  enum CorsairSessionState {
    CSS_Invalid = 0,
    CSS_Closed = 1,
    CSS_Connecting = 2,
    CSS_Timeout = 3,
    CSS_ConnectionRefused = 4,
    CSS_ConnectionLost = 5,
    CSS_Connected = 6
  }

  enum CorsairDeviceType {
    CDT_Unknown = 0x0000,
    CDT_Keyboard = 0x0001,
    CDT_Mouse = 0x0002,
    CDT_Mousemat = 0x0004,
    CDT_Headset = 0x0008,
    CDT_HeadsetStand = 0x0010,
    CDT_FanLedController = 0x0020,
    CDT_LedController = 0x0040,
    CDT_MemoryModule = 0x0080,
    CDT_Cooler = 0x0100,
    CDT_Motherboard = 0x0200,
    CDT_GraphicsCard = 0x0400,
    CDT_Touchbar = 0x0800,
    CDT_GameController = 0x1000,
    CDT_All = 0xFFFFFFFF
  }

  enum CorsairEventId {
    CEI_Invalid = 0,
    CEI_DeviceConnectionStatusChangedEvent = 1,
    CEI_KeyEvent = 2
  }

  enum CorsairDevicePropertyId {
    CDPI_Invalid = 0,
    CDPI_PropertyArray = 1,
    CDPI_MicEnabled = 2,
    CDPI_SurroundSoundEnabled = 3,
    CDPI_SidetoneEnabled = 4,
    CDPI_EqualizerPreset = 5,
    CDPI_PhysicalLayout = 6,
    CDPI_LogicalLayout = 7,
    CDPI_MacroKeyArray = 8,
    CDPI_BatteryLevel = 9,
    CDPI_ChannelLedCount = 10,
    CDPI_ChannelDeviceCount = 11,
    CDPI_ChannelDeviceLedCountArray = 12,
    CDPI_ChannelDeviceTypeArray = 13
  }

  enum CorsairDataType {
    CT_Boolean = 0,
    CT_Int32 = 1,
    CT_Float64 = 2,
    CT_String = 3,
    CT_Boolean_Array = 16,
    CT_Int32_Array = 17,
    CT_Float64_Array = 18,
    CT_String_Array = 19
  }

  enum CorsairPropertyFlag {
    CPF_None = 0x00,
    CPF_CanRead = 0x01,
    CPF_CanWrite = 0x02,
    CPF_Indexed = 0x04
  }

  enum CorsairPhysicalLayout {
    CPL_Invalid = 0,
    CPL_US = 1,
    CPL_UK = 2,
    CPL_JP = 3,
    CPL_KR = 4,
    CPL_BR = 5
  }

  enum CorsairLogicalLayout {
    CLL_Invalid = 0,
    CLL_US_Int = 1,
    CLL_NA = 2,
    CLL_EU = 3,
    CLL_UK = 4,
    CLL_BE = 5,
    CLL_BR = 6,
    CLL_CH = 7,
    CLL_CN = 8,
    CLL_DE = 9,
    CLL_ES = 10,
    CLL_FR = 11,
    CLL_IT = 12,
    CLL_ND = 13,
    CLL_RU = 14,
    CLL_JP = 15,
    CLL_KR = 16,
    CLL_TW = 17,
    CLL_MEX = 18
  }

  enum CorsairChannelDeviceType {
    CCDT_Invalid = 0,
    CCDT_HD_Fan = 1,
    CCDT_SP_Fan = 2,
    CCDT_LL_Fan = 3,
    CCDT_ML_Fan = 4,
    CCDT_QL_Fan = 5,
    CCDT_8LedSeriesFan = 6,
    CCDT_Strip = 7,
    CCDT_DAP = 8,
    CCDT_Pump = 9,
    CCDT_DRAM = 10,
    CCDT_WaterBlock = 11,
    CCDT_QX_Fan = 12
  }

  enum CorsairAccessLevel {
    CAL_Shared = 0,
    CAL_ExclusiveLightingControl = 1,
    CAL_ExclusiveKeyEventsListening = 2,
    CAL_ExclusiveLightingControlAndKeyEventsListening = 3
  }

  enum CorsairLedGroup {
    CLG_Keyboard = 0,
    CLG_KeyboardGKeys = 1,
    CLG_KeyboardEdge = 2,
    CLG_KeyboardOem = 3,
    CLG_Mouse = 4,
    CLG_Mousemat = 5,
    CLG_Headset = 6,
    CLG_HeadsetStand = 7,
    CLG_MemoryModule = 8,
    CLG_Motherboard = 9,
    CLG_GraphicsCard = 10,
    CLG_DIY_Channel1 = 11,
    CLG_DIY_Channel2 = 12,
    CLG_DIY_Channel3 = 13,
    CLG_Touchbar = 14,
    CLG_GameController = 15
  }

  enum CorsairLedId_Keyboard {
    CLK_Invalid = 0,
    CLK_Escape = 1,
    CLK_F1 = 2,
    CLK_F2 = 3,
    CLK_F3 = 4,
    CLK_F4 = 5,
    CLK_F5 = 6,
    CLK_F6 = 7,
    CLK_F7 = 8,
    CLK_F8 = 9,
    CLK_F9 = 10,
    CLK_F10 = 11,
    CLK_F11 = 12,
    CLK_F12 = 13,
    CLK_GraveAccentAndTilde = 14,
    CLK_1 = 15,
    CLK_2 = 16,
    CLK_3 = 17,
    CLK_4 = 18,
    CLK_5 = 19,
    CLK_6 = 20,
    CLK_7 = 21,
    CLK_8 = 22,
    CLK_9 = 23,
    CLK_0 = 24,
    CLK_MinusAndUnderscore = 25,
    CLK_EqualsAndPlus = 26,
    CLK_Backspace = 27,
    CLK_Tab = 28,
    CLK_Q = 29,
    CLK_W = 30,
    CLK_E = 31,
    CLK_R = 32,
    CLK_T = 33,
    CLK_Y = 34,
    CLK_U = 35,
    CLK_I = 36,
    CLK_O = 37,
    CLK_P = 38,
    CLK_BracketLeft = 39,
    CLK_BracketRight = 40,
    CLK_CapsLock = 41,
    CLK_A = 42,
    CLK_S = 43,
    CLK_D = 44,
    CLK_F = 45,
    CLK_G = 46,
    CLK_H = 47,
    CLK_J = 48,
    CLK_K = 49,
    CLK_L = 50,
    CLK_SemicolonAndColon = 51,
    CLK_ApostropheAndDoubleQuote = 52,
    CLK_Backslash = 53,
    CLK_Enter = 54,
    CLK_LeftShift = 55,
    CLK_NonUsBackslash = 56,
    CLK_Z = 57,
    CLK_X = 58,
    CLK_C = 59,
    CLK_V = 60,
    CLK_B = 61,
    CLK_N = 62,
    CLK_M = 63,
    CLK_CommaAndLessThan = 64,
    CLK_PeriodAndBiggerThan = 65,
    CLK_SlashAndQuestionMark = 66,
    CLK_RightShift = 67,
    CLK_LeftCtrl = 68,
    CLK_LeftGui = 69,
    CLK_LeftAlt = 70,
    CLK_Space = 71,
    CLK_RightAlt = 72,
    CLK_RightGui = 73,
    CLK_Application = 74,
    CLK_RightCtrl = 75,
    CLK_LedProgramming = 76,
    CLK_Lang1 = 77,
    CLK_Lang2 = 78,
    CLK_International1 = 79,
    CLK_International2 = 80,
    CLK_International3 = 81,
    CLK_International4 = 82,
    CLK_International5 = 83,
    CLK_PrintScreen = 84,
    CLK_ScrollLock = 85,
    CLK_PauseBreak = 86,
    CLK_Insert = 87,
    CLK_Home = 88,
    CLK_PageUp = 89,
    CLK_Delete = 90,
    CLK_End = 91,
    CLK_PageDown = 92,
    CLK_UpArrow = 93,
    CLK_LeftArrow = 94,
    CLK_DownArrow = 95,
    CLK_RightArrow = 96,
    CLK_NonUsTilde = 97,
    CLK_Brightness = 98,
    CLK_WinLock = 99,
    CLK_Mute = 100,
    CLK_Stop = 101,
    CLK_ScanPreviousTrack = 102,
    CLK_PlayPause = 103,
    CLK_ScanNextTrack = 104,
    CLK_NumLock = 105,
    CLK_KeypadSlash = 106,
    CLK_KeypadAsterisk = 107,
    CLK_KeypadMinus = 108,
    CLK_Keypad7 = 109,
    CLK_Keypad8 = 110,
    CLK_Keypad9 = 111,
    CLK_KeypadPlus = 112,
    CLK_Keypad4 = 113,
    CLK_Keypad5 = 114,
    CLK_Keypad6 = 115,
    CLK_Keypad1 = 116,
    CLK_Keypad2 = 117,
    CLK_Keypad3 = 118,
    CLK_KeypadComma = 119,
    CLK_KeypadEnter = 120,
    CLK_Keypad0 = 121,
    CLK_KeypadPeriodAndDelete = 122,
    CLK_VolumeUp = 123,
    CLK_VolumeDown = 124,
    CLK_MR = 125,
    CLK_M1 = 126,
    CLK_M2 = 127,
    CLK_M3 = 128,
    CLK_Fn = 129
  }

  enum CorsairMacroKeyId {
    CMKI_Invalid = 0,
    CMKI_1 = 1,
    CMKI_2 = 2,
    CMKI_3 = 3,
    CMKI_4 = 4,
    CMKI_5 = 5,
    CMKI_6 = 6,
    CMKI_7 = 7,
    CMKI_8 = 8,
    CMKI_9 = 9,
    CMKI_10 = 10,
    CMKI_11 = 11,
    CMKI_12 = 12,
    CMKI_13 = 13,
    CMKI_14 = 14,
    CMKI_15 = 15,
    CMKI_16 = 16,
    CMKI_17 = 17,
    CMKI_18 = 18,
    CMKI_19 = 19,
    CMKI_20 = 20
  }

  function CorsairErrorToString(value: CorsairError): string
  function CorsairSessionStateToString(value: CorsairSessionState): string
  function CorsairDeviceTypeToString(value: CorsairDeviceType): string
  function CorsairEventIdToString(value: CorsairEventId): string
  function CorsairDevicePropertyIdToString(value: CorsairDevicePropertyId): string
  function CorsairDataTypeToString(value: CorsairDataType): string
  function CorsairPropertyFlagToString(value: CorsairPropertyFlag): string
  function CorsairPhysicalLayoutToString(value: CorsairPhysicalLayout): string
  function CorsairLogicalLayoutToString(value: CorsairLogicalLayout): string
  function CorsairChannelDeviceTypeToString(value: CorsairChannelDeviceType): string
  function CorsairAccessLevelToString(value: CorsairAccessLevel): string
  function CorsairLedGroupToString(value: CorsairLedGroup): string
  function CorsairLedId_KeyboardToString(value: CorsairLedId_Keyboard): string
  function CorsairMacroKeyIdToString(value: CorsairMacroKeyId): string

  /**
   * Sets handler for session state changes, checks versions of SDK client, server and host (iCUE)
   * to understand which of SDK functions can be used with this version of iCUE.
   */
  function CorsairConnect(onStateChanged: (value: { data: { state: CorsairSessionState, details: CorsairSessionDetails } }) => void): CorsairError.CE_Success | CorsairError.CE_InvalidArguments | CorsairError.CE_InvalidOperation

  /**
   * checks versions of SDK client, server and host (iCUE) to understand which of SDK functions can be used with this version of iCUE.
   * If there is no active session or client is not connected to the server, then only client version will be filled
   */
  function CorsairGetSessionDetails(): { error: CorsairError.CE_Success | CorsairError.CE_InvalidArguments; data: CorsairSessionDetails }

  /**
   * removes handler for session state changes previously set by CorsairConnect
   */
  function CorsairDisconnect(): { error: CorsairError.CE_Success | CorsairError.CE_NotConnected }

  /**
   * Returns the list of currently connected devices, filtered by `filter`.
   */
  function CorsairGetDevices(filter: {
    /** The logical or of one or more `CorsairDeviceType` values. */
    deviceTypeMask: CorsairDeviceType | number
  }): { error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_InvalidArguments; data: CorsairDeviceInfo[] }

  /**
   * Returns information about device specified by `deviceId`.
   */
  function CorsairGetDeviceInfo(deviceId: string):
    { errorerror: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_InvalidArguments; data: CorsairDeviceInfo }

  /**
   * Returns a list of supported device LEDs by its id with their positions.
   * Position could be either physical (only device-dependent) or logical (depend on device as well as iCUE settings)
   */
  function CorsairGetLedPositions(deviceId: string): {
    error: CorsairError.CE_Success | CorsairError.CE_DeviceNotFound | CorsairError.CE_NotConnected | CorsairError.CE_InvalidArguments
    data: CorsairLedPosition[]
  }

  /**
   * Registers a callback that will be called by SDK when some event happened.
   * If client is already subscribed but calls this function again SDK should use only last callback
   * registered for sending notifications.
   */
  function CorsairSubscribeForEvents(callback: (event: { data: {
    /** contains information about device that was connected or disconnected */
    id: CorsairEventId.CEI_DeviceConnectionStatusChangedEvent
    /** the `deviceId` of the device that emitted this event */
    deviceId: string
    /** true if connected, false if disconnected */
    isConnected: boolean
  } | {
    /** contains information about device where G, M or S key was pressed/released and the key itself */
    id: CorsairEventId.CEI_KeyEvent
    /** the `deviceId` of the device that emitted this event */
    deviceId: string
    /** G, M or S key that was pressed/released */
    keyId: CorsairMacroKeyId
    /** true if pressed, false if released */
    isPressed: boolean
  }}) => void): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_InvalidArguments
  }

  /**
   * unregisters callback previously registered by CorsairSubscribeForEvents call
   */
  function CorsairUnsubscribeFromEvents(): { error: CorsairError.CE_Success | CorsairError.CE_NotConnected }

  /**
   * Sets `isIntercepted` for a specified macro key on device with `deviceId`.
   * If `isIntercepted` is true, that key event will not be forwarded to other shared clients.
   * If `isIntercepted` is false, that key event will be forwarded to other shared clients.
   *
   * (note: this only works if exclusive control has already been taken on key events)
   */
  function CorsairConfigureKeyEvent(deviceId: string, config: CorsairKeyEventConfiguration): {
    error: CorsairError.CE_Success
    | CorsairError.CE_NotConnected
    | CorsairError.CE_NotAllowed        // if exclusive control is disabled in iCUE settings
    | CorsairError.CE_NoControl         // if some other client has or took over exclusive control
    | CorsairError.CE_InvalidOperation  // if client has insufficient access level (must have ExclusiveKeyEventsListening or ExclusiveLightingControlAndKeyEventsListening access level)
    | CorsairError.CE_InvalidArguments
  }

  /**
   * sets specified LEDs to some colors. The color is retained until changed by successive calls.
   * This function does not take logical layout into account.
   * This function executes synchronously, if you are concerned about delays consider using
   * CorsairSetLedColorsBuffer together with CorsairSetLedColorsFlushBufferAsync
   */
  function CorsairSetLedColors(deviceId: string, colors: CorsairLedColor[]): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_DeviceNotFound | CorsairError.CE_InvalidArguments
  }

  /**
   * queues up specified LEDs to some colors. The color is retained until changed by successive calls.
   * This function does not take logical layout into account.
   * The color change will not take effect until `CorsairSetLedColorsFlushBufferAsync` is called.
   */
  function CorsairSetLedColorsBuffer(deviceId: string, colors: CorsairLedColor[]): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_DeviceNotFound | CorsairError.CE_InvalidArguments
  }

  /**
   * flushes the "set LED buffer" (constructed with calls to CorsairSetLedColorsBuffer) and sets them all at once.
   * The color is retained until changed by successive calls.
   * This function does not take logical layout into account.
   */
  function CorsairSetLedColorsFlushBufferAsync(
    callback: null | ((error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_NoControl) => void)
  ): { error: CorsairError.CE_Success | CorsairError.CE_NotConnected }

  /**
   * Modify `colors` to reflect their current colors on device with `deviceId`.
   * The color represents the actual state of the hardware LED, which could be a combination of SDK and/or iCUE input.
   */
  function CorsairGetLedColors(deviceId: string, colors: CorsairLedColor[]): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_DeviceNotFound | CorsairError.CE_InvalidArguments
  }

  /**
   * set layer priority for this shared client. [0..255]
   * By default iCUE has priority of 127 and all shared clients have priority of 128 if they don't call this function.
   * Layers with higher priority value are shown on top of layers with lower priority.
   */
  function CorsairSetLayerPriority(priority: number): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_InvalidArguments
  }

  /**
   * retrieves unique ID of LED for `keyName` on device with `deviceId`, taking logical layout into account.
   * (useful when keyboard layout is remapped away from the default). `keyName` can be ['A'..'Z']
   */
  function CorsairGetLedLuidForKeyName(deviceId: string, keyName: string): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_DeviceNotFound | CorsairError.CE_InvalidArguments
    data: { ledLuid: CorsairLedId_Keyboard }
  }

  /**
   * requests control of device with `deviceId` using specified `accessLevel`.
   * By default client has shared control over lighting and events so there is no need to call `CorsairRequestControl`
   * unless client requires exclusive control.
   */
  function CorsairRequestControl(deviceId: string, accessLevel: CorsairAccessLevel): {
    error: CorsairError.CE_Success
      | CorsairError.CE_NotConnected
      | CorsairError.CE_DeviceNotFound
      | CorsairError.CE_NoControl
      | CorsairError.CE_InvalidArguments // if provided accessLevel is not supported by this version of SDK
      | CorsairError.CE_NotAllowed       // if exclusive control is disabled in iCUE settings
  }

  /**
   * releases previously requested control for specified device.
   * This action resets access level to default (shared).
   * This also clears all colors set during exclusive control.
   */
  function CorsairReleaseControl(deviceId: string): {
    error: CorsairError.CE_Success | CorsairError.CE_NotConnected | CorsairError.CE_DeviceNotFound | CorsairError.CE_InvalidArguments
  }

  interface CorsairSessionDetails {
    clientVersion: CorsairVersion
    serverVersion: CorsairVersion
    serverHostVersion: CorsairVersion
  }

  interface CorsairVersion {
    major: number
    minor: number
    patch: number
  }

  interface CorsairDeviceInfo {
    type: CorsairDeviceType
    /** The deviceId, a unique identifier used to reference this device in other function calls. */
    id: string
    /** Device serial number. */
    serial: string
    /** Device model name. */
    model: string
    /** Number of controllable LEDs on the device. */
    ledCount: number
    /** Number of channels controlled by the device. */
    channelCount: number
  }

  interface CorsairLedPosition {
    /** Unique identifier of led. */
    id: number
    /** X position on the device (in mm) */
    cx: number
    /** Y position on the device (in mm) */
    cy: number
  }

  interface CorsairLedColor {
    /** Unique identifier of led. */
    id: number
    /** Red brightness [0..255] */
    r: number
    /** Green brightness [0..255] */
    g: number
    /** Blue brightness [0..255] */
    b: number
    /** Alpha channel (opacity) [0..255] (0 for translucent, 255 for opaque) */
    a: number
  }

  interface CorsairKeyEventConfiguration {
    /** G, M or S key that was pressed/released */
    keyId: CorsairMacroKeyId
    /**
     * flag that defines how the key event should behave.
     * If `true`, then iCUE will pass the event to the current exclusive SDK client and stop passing it to the other clients.
     * If `false`, then iCUE will send it to all SDK clients.
     */
    isIntercepted: boolean
  }
}
