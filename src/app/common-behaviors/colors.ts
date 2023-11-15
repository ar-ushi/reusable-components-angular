import { ElementRef } from '@angular/core';
import { AbstractConstructor, Constructor } from './constructor';

export interface color {
    color : string;
}

type colorConstructor = Constructor<color> & AbstractConstructor<color>;

export interface hasElementRef {
    _elementRef : ElementRef;
}

export function mixinColor<T extends AbstractConstructor<hasElementRef>>(
    base: T,
  ): colorConstructor & T;
  export function mixinColor<T extends Constructor<hasElementRef>>(
    base: T,
  ): colorConstructor & T {
    return class extends base {
      private _color: string = '';
      defaultColor = 'black';
  
      get color(): string {
        return this._color;
      }
      set color(value: string) {
        const color = value || this.defaultColor;
  
        if (color !== this._color) {
          if (this._color) {
            this._elementRef.nativeElement.style.removeProperty('background-color');
          }
          if (color) {
            this._elementRef.nativeElement.style.backgroundColor = color;
          }
  
          this._color = color;
        }
      }
  
      constructor(...args: any[]) {
        super(...args);
  
        // Set the default color that can be specified from the mixin.
        this.color = this.defaultColor;
      }
    };
  }