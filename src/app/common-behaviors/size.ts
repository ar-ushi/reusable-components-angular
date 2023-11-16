import { ElementRef } from "@angular/core";

export class Size{
    multiplier = {
        'xl' : 4,
        'l' : 2,
        'default' : 1,
        's' : 0.5,
        'xs': 0.25,    
    }   
    protected paddingratio = 2.25;    
    
    constructor(public _elementRef : ElementRef) {}
    addSize(size : 'xs' | 's' | 'l' | 'xl'| undefined){
        if (size){
            this.calculateSize(size);
        } else{
            this.applyDefaultSize();
        }
    }
    protected calculateSize(size : 'xs' | 's' | 'l' | 'xl'){
        let el = this._elementRef.nativeElement.firstChild.style
        //numeric value and unit of height
        const height = this.parseNumericValue(el.height);
        const calculatedHeight =  height.numericValue * this.multiplier[size];
        //numeric value and unit of font
        const font = this.parseNumericValue(el.fontSize);
        var calculatedFont = font.numericValue + Math.floor((2*this.multiplier[size])/16);
        calculatedFont = calculatedHeight < calculatedFont ? calculatedHeight : calculatedFont;
        //calculate padding
        const calculatedPadding = calculatedHeight/this.paddingratio;
        el.height = `${calculatedHeight}${height.unit}`;
        el.padding = `${calculatedPadding}${height.unit}`;
        el.fontSize = `${calculatedFont}${font.unit}`;
        el.lineHeight = `${calculatedHeight - 2 * calculatedPadding}${height.unit}`;

    }

    applyDefaultSize(){

    }

    parseNumericValue(val:string){
        const match = val.match(/^([\d.]+)([a-zA-Z%]*)$/);
        const numericValue = parseFloat(match![1]);
        const unit = match![2];
        return {numericValue, unit};
    }

}