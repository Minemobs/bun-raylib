import { ptr } from "bun:ffi";

export type u32 = number;
export type i32 = number;
export type f32 = number;

export type Vector2 = { x: f32, y: f32 };
export type Texture2D = { id: u32, width: i32, height: i32, mimaps: i32, format: i32 };
export type Texture = Texture2D;

const tempF32Array = new Float32Array(1);

export function textureToPointer(texture: Texture2D) {
    const buff = new ArrayBuffer(20);
    new Uint32Array(buff, 0, 1)[0] = texture.id;
    const i32Array = new Int32Array(buff, 0, 4);
    i32Array[1] = texture.width;
    i32Array[2] = texture.height;
    i32Array[3] = texture.mimaps;
    i32Array[4] = texture.format;
    return ptr(buff);
}

export function vec2DToArray(vec: Vector2) {
    return Float32Array.of(vec.x, vec.y);
}

export function copyVector(vec: Vector2): Vector2 {
    return { x: vec.x, y: vec.y };
}

export function clampVector(min: Vector2, max: Vector2, vec: Vector2): Vector2 {
    return { x: clamp(min.x, max.x, vec.x), y: clamp(min.y, max.y, vec.y) };
}

export function clamp(min: number, max: number, num: number) {
    return Math.min(Math.max(num, min), max);
}

export function getColor(r: number, g: number, b: number, a = 255) : u32 {
    return (clamp(0, 255, r) & 0xff) | ((clamp(0, 255, g) & 0xff) << 8) | ((clamp(0, 255, b) & 0xff) << 16) | ((clamp(0, 255, a) & 0xff) << 24);
}

export function toCString(str: string) {
    return ptr(Buffer.from(str + "\0"));
}

export function isInteger(num: number) {
    if(num > 2**32-1 || num < -(2**32)/2) return false;
    if(Math.round(num) !== num) return false;
    return true;
}

export function isUnsignedInteger(num: number) {
    if(num < 0 || num > 2**32-1) return false;
    if(Math.round(num) !== num) return false;
    return true;
}

export function isFloat(num: number) {
    tempF32Array[0] = num;
    if(tempF32Array[0] === Infinity || tempF32Array[0] === -Infinity) return false;
    return true;
}

export function throwIfNotI32(variable: number, variableName: string) {
    if(!isInteger(variable)) throw new Error(variableName + " isn't a i32");
}

export function throwIfNotU32(variable: number, variableName: string) {
    if(!isUnsignedInteger(variable)) throw new Error(variableName + " isn't a i32");
}

export function throwIfNotF32(variable: number, variableName: string) {
    if(!isFloat(variable)) throw new Error(variableName + " isn't a f32");
}

export const Colors = {
    GRAY: getColor(130, 130, 130, 255),
    DARK_GRAY: getColor(80, 80, 80, 255),
    YELLOW: getColor(253, 249, 0, 255),
    GOLD: getColor(255, 203, 0, 255),
    ORANGE: getColor(255, 161, 0, 255),
    PINK: getColor(255, 109, 194, 255),
    RED: getColor(230, 41, 55, 255),
    MAROON: getColor(190, 33, 55, 255),
    GREEN: getColor(0, 228, 48, 255),
    LIME: getColor(0, 158, 47, 255),
    DARK_GREEN: getColor(0, 117, 44, 255),
    SKY_BLUE: getColor(102, 191, 255, 255),
    BLUE: getColor(0, 121, 241, 255),
    DARK_BLUE: getColor(0, 82, 172, 255),
    PURPLE: getColor(200, 122, 255, 255),
    VIOLET: getColor(135, 60, 190, 255),
    DARK_PURPLE: getColor(112, 31, 126, 255),
    BEIGE: getColor(211, 176, 131, 255),
    BROWN: getColor(127, 106, 79, 255),
    DARK_BROWN: getColor(76, 63, 47, 255),
    WHITE: getColor(255, 255, 255, 255),
    BLACK: getColor(0, 0, 0, 255),
    BLANK: getColor(0, 0, 0, 0),
    MAGENTA: getColor(255, 0, 255, 255),
    RAY_WHITE: getColor(245, 245, 245, 255),
} as const;

export type Color = keyof typeof Colors | u32;

export const enum MouseButton {
    LEFT,
    RIGHT,
    MIDDLE,
    SIDE,
    EXTRA,
    FORWARD,
    BACK
}

export const enum Keys {
    KEY_NULL = 0,
    KEY_APOSTROPHE = 39,
    KEY_COMMA = 44,
    KEY_MINUS = 45,
    KEY_PERIOD = 46,
    KEY_SLASH = 47,
    KEY_ZERO = 48,
    KEY_ONE = 49,
    KEY_TWO = 50,
    KEY_THREE = 51,
    KEY_FOUR = 52,
    KEY_FIVE = 53,
    KEY_SIX = 54,
    KEY_SEVEN = 55,
    KEY_EIGHT = 56,
    KEY_NINE = 57,
    KEY_SEMICOLON = 59,
    KEY_EQUAL = 61,
    KEY_A = 65,
    KEY_B = 66,
    KEY_C = 67,
    KEY_D = 68,
    KEY_E = 69,
    KEY_F = 70,
    KEY_G = 71,
    KEY_H = 72,
    KEY_I = 73,
    KEY_J = 74,
    KEY_K = 75,
    KEY_L = 76,
    KEY_M = 77,
    KEY_N = 78,
    KEY_O = 79,
    KEY_P = 80,
    KEY_Q = 81,
    KEY_R = 82,
    KEY_S = 83,
    KEY_T = 84,
    KEY_U = 85,
    KEY_V = 86,
    KEY_W = 87,
    KEY_X = 88,
    KEY_Y = 89,
    KEY_Z = 90,
    KEY_LEFT_BRACKET = 91,
    KEY_BACKSLASH = 92,
    KEY_RIGHT_BRACKET = 93,
    KEY_GRAVE = 96,
    KEY_SPACE = 32,
    KEY_ESCAPE = 256,
    KEY_ENTER = 257,
    KEY_TAB = 258,
    KEY_BACKSPACE = 259,
    KEY_INSERT = 260,
    KEY_DELETE = 261,
    KEY_RIGHT = 262,
    KEY_LEFT = 263,
    KEY_DOWN = 264,
    KEY_UP = 265,
    KEY_PAGE_UP = 266,
    KEY_PAGE_DOWN = 267,
    KEY_HOME = 268,
    KEY_END = 269,
    KEY_CAPS_LOCK = 280,
    KEY_SCROLL_LOCK = 281,
    KEY_NUM_LOCK = 282,
    KEY_PRINT_SCREEN = 283,
    KEY_PAUSE = 284,
    KEY_F1 = 290,
    KEY_F2 = 291,
    KEY_F3 = 292,
    KEY_F4 = 293,
    KEY_F5 = 294,
    KEY_F6 = 295,
    KEY_F7 = 296,
    KEY_F8 = 297,
    KEY_F9 = 298,
    KEY_F10 = 299,
    KEY_F11 = 300,
    KEY_F12 = 301,
    KEY_LEFT_SHIFT = 340,
    KEY_LEFT_CONTROL = 341,
    KEY_LEFT_ALT = 342,
    KEY_LEFT_SUPER = 343,
    KEY_RIGHT_SHIFT = 344,
    KEY_RIGHT_CONTROL = 345,
    KEY_RIGHT_ALT = 346,
    KEY_RIGHT_SUPER = 347,
    KEY_KB_MENU = 348,
    KEY_KP_0 = 320,
    KEY_KP_1 = 321,
    KEY_KP_2 = 322,
    KEY_KP_3 = 323,
    KEY_KP_4 = 324,
    KEY_KP_5 = 325,
    KEY_KP_6 = 326,
    KEY_KP_7 = 327,
    KEY_KP_8 = 328,
    KEY_KP_9 = 329,
    KEY_KP_DECIMAL = 330,
    KEY_KP_DIVIDE = 331,
    KEY_KP_MULTIPLY = 332,
    KEY_KP_SUBTRACT = 333,
    KEY_KP_ADD = 334,
    KEY_KP_ENTER = 335,
    KEY_KP_EQUAL = 336,
    KEY_BACK = 4,
    KEY_MENU = 82,
    KEY_VOLUME_UP = 24,
    KEY_VOLUME_DOWN = 25
}