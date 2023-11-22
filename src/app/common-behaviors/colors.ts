import { Color, applyVariant } from "./common";
import { ElementRef } from "@angular/core";


//TODO - Configure default colors according to base appliation's theme (dark mode/light mode)
export class Colors{
    protected border: string ='';
    protected color: string =  'black';
    protected bgColor: string =  '#e0e0e0';

    constructor(public _elementRef : ElementRef) {}
    addColors(value: Color | Array<Color>){
    if (Array.isArray(value)){
            value.forEach(val => {this.applyStyles(val)
            });
        } else{
             this.applyStyles(value)
        }
    }

    applyStyles(val : Color){
        switch (val.type){
            case 'text': 
            (val.color) ? this.applyTextStyles(val) : this.applyTextStyles({color : this.color, type:'text'});
            break;
            case 'background':
            val.color ? this.applyBackgroundStyles(val) : this.applyBackgroundStyles({color : this.bgColor, type:'background'})
            break;
        }
    }

    applyTextStyles(val: Color){
        this._elementRef.nativeElement.firstChild.style.color = val.color;
    }

    applyBackgroundStyles(val: Color){
        let el =  this._elementRef.nativeElement.firstChild.style;
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
                bgColor = val.variant ? applyVariant(val.color, val.variant) : val.color;
            break;
            default :
                bgColor = val.variant ? applyVariant(val.color, val.variant) : val.color;
        }
        el.backgroundColor = bgColor;
        if (border) el.border = border;
        if (color)  el.color = color;
    }

}