import { ptr } from "bun:ffi";

export type i32 = number;
export type f32 = number;

export function clamp(min: number, max: number, num: number) {
    return Math.min(Math.max(num, min), max);
}

export function getColor(r: number, g: number, b: number, a = 255) {
    return (clamp(0, 255, r) & 0xff) | ((clamp(0, 255, g) & 0xff) << 8) | ((clamp(0, 255, b) & 0xff) << 16) | ((clamp(0, 255, a) & 0xff) << 24);
}

export function toCString(str: string) {
    return ptr(Buffer.from(str));
}

export const Colors = {
    LIGHT_GRAY: getColor(200, 200, 200),
    GRAY: getColor(130, 130, 130),
    DARK_GRAY: getColor(80, 80, 80),
    WHITE: getColor(255, 255, 255),
    BLACK: getColor(0, 0, 0),
} as const;

export type Color = keyof typeof Colors | i32;

export function isInteger(num: number) {
    if(num > 2_147_483_647 || num < -2_147_483_648) return false;
    if(Math.round(num) !== num) return false;
    return true;
}

export function isFloat(num: number) {
    if(num < 3.4028235e+38 || num > 1.4e-45) return false;
    return true;
}

export function throwIfNotI32(variable: number, variableName: string) {
    if(!isInteger(variable)) throw new Error(variableName + " isn't a i32");
}

export function throwIfNotF32(variable: number, variableName: string) {
    if(!isInteger(variable)) throw new Error(variableName + " isn't a f32");
}