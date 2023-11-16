import { ElementRef } from "@angular/core";
import { Color } from "./common-types";

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