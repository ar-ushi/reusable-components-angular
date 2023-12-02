//contains common types, interfaces and enums 

export type Color = {
    color: string;
    type: 'text' | 'background';
    fill?: 'clear' | 'outline' | 'solid';
    variant? : 'lighter' | 'light' | 'dark' | 'darker';
    factor?:number;
}

export enum sizeMultiplier {
    'xl' = 4,
    'l' = 2,
    'default' = 1,
    's' = 0.5,
    'xs'= 0.25,     
}

enum variantFactors {
    lighter = 0.5,
    light = 0.25,
    dark = 0.75,
    darker = 0.5,
}

export function createColorObject(bgcolor : string, color: string, fill?: 'clear' | 'outline' | 'solid', variant?: keyof typeof variantFactors, factor?:number){
    const compColor : Color[] = [
        {color: bgcolor!, type: 'background', fill: fill, variant: variant!, factor:factor!},
        {color: color!, type: 'text'}     
    ]
    return compColor;
}

/*
 TODO - Add in Documentation - bgColor should always be hexcode if you want to use variant

 Uses concepts of Shades (adding black) & Tints (adding white)
 */
export function applyVariant(color: string, variant: keyof typeof variantFactors, factor?: number): string{    
    let adjustedRGB;
    const hexToRGB = (hex : string) => {
        //handle odd length hexcodes
        const paddedColor = hex.length % 2 === 1 ? hex : '0' + hex
        return paddedColor.match(/[A-Za-z0-9]{2}/g)?.map((c) => parseInt(c,16)) || [0,0,0];
    }
    const rgb = hexToRGB(color);
    const _factor = factor ? Math.min(1, Math.max(0, factor)) : variantFactors[variant]; //overriding variant with a custom factor
    //add variant styles
    if (variant === 'dark' || variant === 'darker'){
         adjustedRGB = rgb.map((c) => Math.floor(c * _factor))
    } else {
        adjustedRGB = rgb.map((c) => Math.floor((c + _factor * (255-c)))) 
    }
    const componentToHex = (c: number) => c.toString(16).padStart(2, '0');
    return `#${adjustedRGB.map(componentToHex).join('')}`;
}