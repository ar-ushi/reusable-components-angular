import { ElementRef } from "@angular/core";
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

export class Colors {
    protected border: string ='';
    protected color: string =  'black';
    protected bgColor: string =  '#e0e0e0';
    constructor(public _elementRef : ElementRef) {}

    addColors(value: Color | Array<Color> | undefined){
        if (!value){
            this.applyDefaultStyles();
        } else if (Array.isArray(value)){
            value.forEach(val => this.applyStyles(val));
        } else{
            this.applyStyles(value);
        }
    }

    applyStyles(val : Color){
        switch (val.type){
            case 'text': 
            this.applyTextStyles(val);
            break;
            case 'background':
            this.applyBackgroundStyles(val);
            break;
        }
    }
    applyDefaultStyles(){
        this.applyTextStyles({color : this.color, type:'text'});
        this.applyBackgroundStyles({color : this.bgColor, type:'background'})
    }

    applyTextStyles(val: Color){
        this._elementRef.nativeElement.firstChild.style.color = val.color;
    }

    applyBackgroundStyles(val: Color){
        let border, color, bgColor;
        switch(val.fill){
            case 'clear' :
                border = 'none';
                bgColor = 'white';
                color = val.color;
            break;
            case 'outline':
                border = `2px solid ${val.color}`;
                bgColor = 'white';
                color = val.color;
            break;
            case 'solid':
                bgColor = val.color;
            break;
            default :
                bgColor = val.color;
        }
        this._elementRef.nativeElement.firstChild.style.backgroundColor = bgColor;
        if (border) this._elementRef.nativeElement.firstChild.style.border = border;
        if (color)  this._elementRef.nativeElement.firstChild.style.color = color;
    }

    getStyles(){
        //method to return for further styling in parent
    }
}