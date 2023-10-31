import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownConfig } from './dropdown.interface';


@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports : [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent{

data : Array<any> = [];
_placeholder:string = 'Select';
_config: DropDownConfig = {
  defaultOpen: false,
  backgroundColor: '#ffff12',
  textColor: "#111111",
  dropdownWidth: '100%',
  dropdownShadow: '0px 1px 3px #959595',
}
@Input() color? :  string = 'white';
@Input() defaultOption? :  string | null = null;
@Input() multiple? : boolean = false;
@Input() disabled?: boolean = false;
selectedOption: string = '';

@Input()
set placeholder(value:string){
  this._placeholder = value ? value : 'Select'
}

@Input()
set options(value : Array<any>){
  if (!value){
    this.data = [];
  } else {
    this.data.push(...value); //TODO - for simple datatypes - modify code to allow for objects
  }
}

@Input()
public set ddconfig(value : DropDownConfig){
  this._config = value ? value : this._config;
}

@Output() onSelect= new EventEmitter<string>();
@Output() onDeselect= new EventEmitter<string>();
@Output() onCloseDropdown= new EventEmitter<string>();


  
  constructor(private el : ElementRef) {};

  ngOnInit() {
    if (this.defaultOption && this.defaultOption in this.options){
      this.selectedOption = this.defaultOption!;
      }
    this.setDropDownStyles();
  }

  setDropDownStyles(){
  (document.getElementsByClassName('dropdown').item(0) as HTMLElement).style.cssText = `
    background-color : ${this._config.backgroundColor};
    color: ${this._config.textColor};
    width: ${this._config.dropdownWidth}
    `;
    //inherit background color to child
    const childElements = document.querySelectorAll('.dropdown *');
    childElements.forEach((child) => {
      (child as HTMLElement).style.backgroundColor = 'inherit';
    });
    //set dropdown list styles
    (document.getElementsByClassName('dropdown-data').item(0) as HTMLElement).style.cssText = `
    box-shadow: ${this._config.dropdownShadow};
    background-color: inherit;
    `;
  }

  clickOption($event:any, item:any){
    //two scenarios - handle select/unselect
    const isItemPresent = this.selectedOption === item ? true : false;
    if (!isItemPresent){
      this.selectedOption = item;
      
      this.onSelect.emit(this.emittedValue(item));
    } else{
      this.selectedOption = '';
      this.onDeselect.emit(this.emittedValue(item));
        }
    this.closeDropdown();
  }


  emittedValue(item: any) {
  return item;
  }

  toggleDropdown(evt: Event){
    evt.preventDefault();
    if (this.disabled) return;
    //maintain a state for dropdown close vs dropdown open
    this._config.defaultOpen = !this._config.defaultOpen;
    if(!this._config.defaultOpen){
      this.onCloseDropdown.emit();
    }
  }

  closeDropdown() {
    this._config.defaultOpen = false;
    console.log("dropdown");
    this.onCloseDropdown.emit();
  }

}