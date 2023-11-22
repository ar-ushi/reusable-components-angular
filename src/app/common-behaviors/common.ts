//contains common types, interfaces and enums 

export type Color = {
    color: string;
    type: 'text' | 'background';
    fill?: 'clear' | 'outline' | 'solid';
    variant? : 'lighter' | 'light' | 'dark' | 'darker'
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

export function createColorObject(bgcolor : string, color: string, fill?: 'clear' | 'outline' | 'solid', variant?: keyof typeof variantFactors){
    const compColor : Color[] = [
        {color: bgcolor!, type: 'background', fill: fill, variant: variant!},
        {color: color!, type: 'text'}     
    ]
    return compColor;
}

/*
 TODO - Add in Documentation - bgColor should always be hexcode if you want to use variant

 Uses concepts of Shades (adding black) & Tints (adding white)
 */
export function applyVariant(color: string, variant: keyof typeof variantFactors): string{    
    let adjustedRGB;
    const hexToRGB = (hex : string) => {
        //handle odd length hexcodes
        const paddedColor = hex.length % 2 === 1 ? hex : '0' + hex
        return paddedColor.match(/[A-Za-z0-9]{2}/g)?.map((c) => parseInt(c,16)) || [0,0,0];
    }
    const rgb = hexToRGB(color);
    //add variant styles
    if (variant === 'dark' || variant === 'darker'){
         adjustedRGB = rgb.map((c) => Math.floor(c * variantFactors[variant]))
    } else {
        adjustedRGB = rgb.map((c) => Math.floor((c + variantFactors[variant] * (255-c)))) 
    }
    const componentToHex = (c: number) => c.toString(16).padStart(2, '0');
    return `#${adjustedRGB.map(componentToHex).join('')}`;
}