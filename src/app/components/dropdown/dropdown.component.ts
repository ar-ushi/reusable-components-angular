import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownConfig } from './dropdown.interface';

export const DropdownControlValueAccessor : any ={
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  providers: [DropdownControlValueAccessor],
  imports : [CommonModule, BrowserModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements ControlValueAccessor{

data : Array<any> = [];
_placeholder:string = 'Select';
_config: DropDownConfig = {
  defaultOpen: false,
  backgroundColor: '#ffffff',
  textColor: "#111111",
  dropdownWidth: '100%',
  dropdownShadow: '0px 1px 3px #959595',
  closeIconSrc: ''
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
public set ddconfig(obj : DropDownConfig){
  //only override defaults for value sent by parent
  this._config= {...this._config, ...obj};
}

@Output() onSelect= new EventEmitter<string>();
@Output() onDeselect= new EventEmitter<string>();
@Output() onCloseDropdown= new EventEmitter<string>();

//Function to call on change & touch 
onChange = (_:any) => {};
onTouch = () => {};
  
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
      this.onChange(this.selectedOption);
      this.onSelect.emit(item);
    } else{
      this.removeSelected(item);
        }
    this.closeDropdown();
  }

  removeSelected(item : any){
    this.selectedOption = '';
    this.onDeselect.emit(item);
    this.closeDropdown();
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
    this.onCloseDropdown.emit();
  }

  //form control input funcs 
  
  writeValue(obj: any): void {
    if (obj && obj.length > 0 && this.data.filter(val => {val == obj ? true : false})){
      //for default value set by parent
      this.selectedOption = obj;
      this.onChange(obj);
    } else {
      console.log(Error); //TODO - Find a better way of showing error to parent
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    
  }

}