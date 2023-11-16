//common functions to be used by components

import { Color } from "./common-types";

export function createColorObject(bgcolor : string, color: string, fill: 'clear' | 'outline' | 'solid'){
    const compColor : Color[] = [
        {color: bgcolor!, type: 'background', fill: fill},
        {color: color!, type: 'text'}     
    ]
    return compColor;
}

export function variantColor(color: string, factor: number): string{
    const hexToRGB = (hex : string) => hex.match(/\w\w/g)?.map((c) => parseInt(c,16)) || [0,0,0];

    const rgb = hexToRGB(color);

    //add variant styles
    const adjustedRGB =  rgb.map((c) => Math.min(255, Math.max(0, Math.round(c + c * factor))));
    
    const componentToHex = (c: number) => c.toString(16).padStart(2, '0');
    return `#${adjustedRGB.map(componentToHex).join('')}`;

}