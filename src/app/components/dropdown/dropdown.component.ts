import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownConfig, DropdownItem } from './dropdown.model.';

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
  width: '100%',
  shadow: '0px 1px 3px #959595',
  closeIconSrc: '',
  multipleSelection: false,
  maximumSelection: -1
}
@Input() color? :  string = 'white';
@Input() disabled?: boolean = false;
selectedOptions: Array<DropdownItem>  = [];

@Input()
set placeholder(value:string){
  this._placeholder = value ? value : 'Select'
}

@Input()
set options(value : Array<any>){
  if (!value){
    this.data = [];
  } else {
    this.data = value.map((item: any) => new DropdownItem(item))
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
    this.setDropDownStyles();
  }
  
  setDropDownStyles(){
  (document.getElementsByClassName('dropdown').item(0) as HTMLElement).style.cssText = `
    background-color : ${this._config.backgroundColor};
    color: ${this._config.textColor};
    width: ${this._config.width}
    `;
    //inherit background color to child
    const childElements = document.querySelectorAll('.dropdown *');
    childElements.forEach((child) => {
      (child as HTMLElement).style.backgroundColor = 'inherit';
    });
    //set dropdown list styles
    (document.getElementsByClassName('dropdown-data').item(0) as HTMLElement).style.cssText = `
    box-shadow: ${this._config.shadow};
    background-color: inherit;
    `;
  }

  clickOption($event:any, item:DropdownItem){
    //two scenarios - handle select/unselect
    let found = false;
    this.selectedOptions.forEach((val) => {
      if (val === item) {
        found = true;
      } else {
        found =  false;
      }
      return found;
    }) 
    if (!found){
      this.addselectedOptions(item);
    } else{
      this.removeSelectedOptions(item);
      }
    !this._config.multipleSelection ? this.closeDropdown() : null;
  }

  addselectedOptions(item:any){
    if (!this._config.multipleSelection){
      if (this.selectedOptions.length > 0){
        //previous selection made 
        this.toggleSelection();
      }
      this.selectedOptions = [];
      this.selectedOptions.push(item); 
      console.log(this.selectedOptions);
      } else {
      this.selectedOptions.push(item);
    }
    this.toggleSelection();
    this.onChange(this.selectedOptions);
    this.onSelect.emit(item);
  }

  removeSelectedOptions(item : any){
    this.toggleSelection()
    this.selectedOptions = [];
    this.onDeselect.emit(item);
    this.closeDropdown();
  }

  toggleSelection(){
    this.selectedOptions.map((val) => {val.selected = !val.selected})
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
    const defaultOption = this.data.find(val => val.text === obj);

    if (obj && obj.length > 0 && defaultOption ){
      //for default value set by parent
        this.selectedOptions = [defaultOption];
        this.toggleSelection();
        this.onChange(defaultOption);
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