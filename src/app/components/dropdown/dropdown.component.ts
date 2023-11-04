import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownConfig, DropdownItem } from './dropdown.model';

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
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements ControlValueAccessor{

data : Array<any> = [];
_placeholder:string = 'Select';
_config: DropDownConfig = {
  defaultOpen: false,
  textColor: "#111111",
  width: '100%',
  shadow: '0px 1px 3px #959595',
  closeIconSrc: '',
  multipleSelection: false,
  maximumAllowed: 1,
  maximumSelectionErrorMsg : 'Maximum allowed selections exceeded.'
}
@Input() color? :  string = 'white';
@Input() disabled?: boolean = false;
@Input() fill? : 'default' | 'clear' | 'outline' | 'solid' = 'default';
selectedOptions: Array<DropdownItem>  = [];
showMaximumSelectionError : boolean = false;

@Input()
set placeholder(value:string){
  this._placeholder = value ? value : 'Select'
}

@Input()
set options(value : Array<any>){
  if (!value){
    this.data = [];
  } else {
    this.data = value.map((item: any) => this.objectify(item))
  }
}

@Input()
public set ddconfig(obj : DropDownConfig){
  //only override defaults for value sent by parent
  this._config= {...this._config, ...obj};
  if (this._config.multipleSelection){
    this._config.maximumAllowed = this._config.maximumAllowed ? this._config.maximumAllowed : this.data.length - 1;
  }
}

@Output() onSelect= new EventEmitter<DropdownItem>();
@Output() onDeselect= new EventEmitter<string>();
@Output() onCloseDropdown= new EventEmitter<string>();

//Function to call on change & touch 
onChange = (_:any) => {};
onTouch = () => {};
  
  constructor(
    private el : ElementRef,
    ) {};

  ngOnInit() {
    this.setDropDownStyles();
  }
  
  setDropDownStyles(){
    let border, txtColor;

    if (this.fill && (this.fill === 'clear' ||  this.fill === 'outline')) {
      if (this.fill === 'clear') border = 'none';
      else if (this.fill === 'outline') border = `2px solid ${this.color}`;
      txtColor = this.color != 'white' ? this.color : this._config.textColor;
      this.color = 'white';
    } else {
      txtColor = this._config.textColor;
    }
  (document.getElementsByClassName('dropdown').item(0) as HTMLElement).style.cssText = `
    background-color : ${this.color};
    color: ${txtColor};
    width: ${this._config.width}
    `;

    (document.getElementsByClassName('dropdown-btn').item(0) as HTMLElement).style.cssText = `
    border : ${border};
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
    border: ${border};
    color: ${txtColor}
    `;
  }

  clickOption($event:any, item:DropdownItem){
    //two scenarios - handle select/unselect
    let found = this.selectedOptions.some(val => val == item);

    if (!found){
      this.addselectedOptions(item);
    } else{
      this.removeSelectedOptions(item);
      }
    !this._config.multipleSelection ? this.closeDropdown() : null;
  }

  addselectedOptions(item:DropdownItem){
    if (!this._config.multipleSelection){
      if (this.selectedOptions.length > 0){
        //toggle previous selection made 
        this.selectedOptions[0].selected = false;
      }
      this.selectedOptions = [];
    } else if (this._config.maximumAllowed === this.selectedOptions.length){
      this.showMaximumSelectionError = true;
      this.closeDropdown();
      return this._config.maximumSelectionErrorMsg; //TODO - Modal UI Component
    }
    this.selectedOptions.push(item); 
    if (!this._config.maximumAllowed || this.selectedOptions.length === this.data.length){
      this.closeDropdown();
    }
    this.toggleSelection(item);
    this.onChange(this.selectedOptions);
    this.onSelect.emit(item);
    return;
  }

  removeSelectedOptions(item : any){
    if (!this._config.multipleSelection){
      this.selectedOptions = [];
    } else {
      // two cases - can be an array (default option sent by parent) 
      if (Array.isArray(item)) {
        item = this.selectedOptions[this.selectedOptions.length-1];
        this.selectedOptions.pop();
      } else this.selectedOptions.splice(this.selectedOptions.indexOf(item),1);
    }
    this.toggleSelection(item)
    this.onDeselect.emit(item);
    this.closeDropdown();
  }

  toggleSelection(item: DropdownItem){
    item.selected = !item.selected
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

  objectify(item : any){
    return new DropdownItem(item);
  }

  addDefaultOptiontoSelection(obj : Array<DropdownItem>){
    const parentValueIds = obj.map((item) => item.id);
    this.data.forEach((item) => {
      for (const i in parentValueIds){
        const val = parentValueIds[i];
        if (item.id == val){
          this.selectedOptions.push(item);
          parentValueIds.splice(parseInt(i),1);
        }
      }
    })
  }

  isASubSetof(obj : Array<DropdownItem>){
    const isSubSet = obj.every((objItem : any) => 
    this.data.some(dataItem => 
      this.deepCompareTwoObjects(objItem, dataItem)));
      return isSubSet;
  }

  deepCompareTwoObjects(obj : DropdownItem, dataItem: DropdownItem){
    for (const key in obj){
    if (!dataItem.hasOwnProperty(key) || dataItem[key] !== obj[key]){
      return true;
    }}
    return false;
  }


  //form control input funcs 
  writeValue(obj: any): void {
    //user may send a arr of objects or a obj
    let defaultOption : any; //Any accounts for all types parent may send
    if (obj && (obj.length > 0 || Object.keys(obj).length)){
      obj = this._config.multipleSelection ? obj : obj[0];
      if (Array.isArray(obj)){
        obj = obj.map((item:any) => this.objectify(item));
        //calculate if obj is a subset of data
        defaultOption = this.isASubSetof(obj);
        if (defaultOption) {
         this.addDefaultOptiontoSelection(obj);
        }
      } else {
        obj = this.objectify(obj);
        this.data.find(val => {
          if (val.id == obj.id){
            this.selectedOptions.push(val);
          }
        });
      }
      if (this.selectedOptions){
      //for default value set by parent
      this.selectedOptions.forEach((item: DropdownItem) => {
        this.toggleSelection(item);
      },
      this.onChange(this.selectedOptions)
      )}} else {
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