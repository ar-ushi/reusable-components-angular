import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, forwardRef,HostListener, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChipsComponent } from '../chips/chips.component';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownConfig, DropdownItem } from './dropdown.util';
import { autocompleteModule } from '../autocomplete/autocomplete.module';
import { ClickOutsideDirective } from '../clickOutside/click-outside.directive';
import { BaseClass } from 'src/app/common-behaviors/base';
import { Colors } from 'src/app/common-behaviors/colors';
import { createColorObject } from 'src/app/common-behaviors/common';

export const UixDropdownControlValueAccessor : any ={
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
}

@Component({
  selector: 'app-select',
  standalone: true,
  providers: [UixDropdownControlValueAccessor],
  imports : [CommonModule, BrowserModule, FormsModule, autocompleteModule, ClickOutsideDirective, ChipsComponent],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements ControlValueAccessor, AfterViewInit{

/* 
  data --> used to set & can be manipulated for search
  originalData --> deep copy of data array for restoring values
*/
data : any;
originalData : any; //TODO - Better way to do L33 and L34
_placeholder:string = 'Select';
private styles : BaseClass;
_config: DropDownConfig = {
  defaultOpen: false,
  width: '100%',
  shadow: '0px 1px 3px #959595',
  closeIconSrc: '',
  multipleSelection: false,
  limitSelection: 1,
  maximumSelectionErrorMsg : 'Maximum allowed selections exceeded.',
  allowSearch: false,
}
_chips: boolean = false;
_disabled: boolean = false;
@Input() color? :  string;
@Input() bgcolor? : string;
@Input() fill :  'clear' | 'outline' | 'solid' = 'solid';
@Input() type : 'text' | 'checkbox' | 'radio' = 'checkbox';
@Input() transformDataFn?: any;
selectedOptions: Array<DropdownItem>  = [];
showMaximumSelectionError : boolean = false;
enableSearch: boolean = false;
noResultsFoundErrorMsg: string = "";
validDataPresent: boolean = true;

@Input()
set placeholder(value:string){
  this._placeholder = value ? value : 'Select'
}

@Input()
set options(value : Array<any>|string){
  if (typeof(value) === 'string'){
    this.data = value;
    this.originalData = value;
    this.validDataPresent = false;
  } else {
    this.data = value.map((item: any) => this.objectify(item));
    this.originalData = JSON.parse(JSON.stringify(this.data)); 
  }}

@Input()
public set config(obj : DropDownConfig){
  //only override defaults for value sent by parent
  this._config= {...this._config, ...obj};
  if (this._config.multipleSelection){
    this._config.limitSelection = obj.limitSelection ? obj.limitSelection : this.data.length - 1;
  }
}

@Input()
public set chips(val : string | boolean){
  this._chips = (typeof(val) === 'string' || val === true) ? true : false;
}

@Input() 
public set disabled(val : string | boolean){
  this._disabled = (typeof(val) === 'string' || val === true) ? true : false;
}

@Output() onSelect= new EventEmitter<DropdownItem>();
@Output() onDeselect= new EventEmitter<string>();
@Output() onCloseDropdown= new EventEmitter<string>();

//Function to call on change & touch 
onChange = (_:any) => {};
onTouch = () => {};
  
  constructor(
    private el : ElementRef,
    ) {
      this.styles  = new BaseClass( new Colors(el));  
    };

  ngAfterViewInit(): void {
    this.styles.colors.addColors(createColorObject(this.bgcolor!, this.color!, this.fill));    
    this.setDropDownStyles();
  }

  @HostListener('blur')
  public onTouched() {
    if (this.onTouch){
      this.onTouch();
      this.showMaximumSelectionError = false;
    }
  }

  setDropDownStyles(){
    //inherit background color to child
    const childElements = document.querySelectorAll('.dropdown *');
    childElements.forEach((child) => {
      if (child.className !== 'close-btn') {
        (child as HTMLElement).style.backgroundColor = 'inherit';
      }});
    //set dropdown list styles
    (document.querySelector('.dropdown-data') as HTMLElement).style.cssText = `
    box-shadow: ${this._config.shadow};
    background-color: inherit;
    `;
  }

  //TODO - Test all Evt Emitters once
  getFilteredData(filteredDataList: any){
    let transformedFilteredData;
    if (filteredDataList.length == 0){
      this.noResultsFoundErrorMsg= 'No results found. Modify your search';
      this.closeDropdown();
    } else {
      this.noResultsFoundErrorMsg = "";
      if (typeof(this.originalData) === 'string'){ //search over api
        transformedFilteredData = this.transformDataFn(filteredDataList);
        this.setFilteredDataAsOptions(transformedFilteredData);
        this.validDataPresent = true;
      }else{
        this.setFilteredDataAsOptions(filteredDataList)
      }
    }
  }

  setFilteredDataAsOptions(list: Array<any>){
    this.data = list.map((item: any) => this.objectify(item));    console.log(this.data);
    this.openDropdown();
  }
  clickOption($event:any, item:DropdownItem){
    //two scenarios - handle select/unselect
    if (this._disabled || item.disabled){
      return false;
    }
    let found = this.selectedOptions.some(val => val == item);
    if (this._config.limitSelection !== this.selectedOptions.length){
    if (!found){
      this.addselectedOptions(item);
    } else{
      this.removeSelectedOptions(item);
      }
    }else {
      this.showMaximumSelectionError = true;
      this.closeDropdown();
      return this._config.maximumSelectionErrorMsg; //TODO - Modal UI Component
    }
    !this._config.multipleSelection ? this.closeDropdown() : null;
    return;
  }

  addselectedOptions(item:DropdownItem){
    if (!this._config.multipleSelection){
      if (this.selectedOptions.length > 0){
        //toggle previous selection made 
        this.selectedOptions[0].selected = false;
      }
      this.selectedOptions = [];
    } 
    this.selectedOptions.push(item); 
    if (!this._config.limitSelection || this.selectedOptions.length === this.data.length){
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

  toggleDropdown(){
    //only allow toggledropdown if search not initiated
    if (this._disabled) return;
    //maintain a state for dropdown close vs dropdown open
    if (typeof(this.data) !== 'string'){
    this._config.defaultOpen = !this._config.defaultOpen;
    }
    if(!this._config.defaultOpen){
      this.onCloseDropdown.emit();
    }
  }

  closeDropdown() {
    this._config.defaultOpen = false;
    this.onCloseDropdown.emit();
  }

  openDropdown(){
    if (typeof(this.data) !== 'string'){
    this._config.defaultOpen = true;
    }
  }

  objectify(item : any){
      return new DropdownItem(item);
  }

  addDefaultOptiontoSelection(obj : Array<DropdownItem>){
    const parentValueIds = obj.map((item) => item.id);
    this.data.forEach((item: DropdownItem) => {
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
    this.data.some((dataItem: DropdownItem) => 
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
        this.data.find((val: DropdownItem) => {
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
  
}