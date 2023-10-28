import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports : [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  
data : Array<any> = [];
_placeholder:string = 'Select';
@Input() color? :  string = 'white';
@Input() defaultOption? :  string | null = null;
@Input() multiple? : boolean = false;
selectedOption: string = '';

@Input()
set placeholder(value:string){
  this._placeholder = value ? value : 'Select'
}

@Input()
set disabled(val : boolean){
  this.disabled = val ? val : false;
}
@Input()
set options(value : Array<any>){
  if (!value){
    this.data = [];
  } else {
    this.data.push(...value); //for simple datatypes - modify code to allow for objects
  }
}
@Output() onSelect= new EventEmitter<string>();
@Output() onDeselect= new EventEmitter<string>();
@Output() onCloseDropdown= new EventEmitter<string>();


  
  constructor(private el : ElementRef) {};

  ngOnInit() {
    if (this.defaultOption && this.defaultOption in this.options){
      this.selectedOption = this.defaultOption!;
      }
    this.el.nativeElement.style.setProperty('--dropdown-background-color', this.color);
  }

  clickOption($event:any, item:any){
    //two scenarios - handle select/unselect
    const isItemPresent = this.selectedOption === item ? true : false;
    if (!isItemPresent){
      this.selectedOption = item;
      this.onSelect.emit(emittedValue(item));
    } else{
      this.selectedOption = '';
      this.onDeselect.emit(emittedValue(item));
        }
    closeDropdown();
  }
}


function emittedValue(item: any) {
return item;
}

function closeDropdown() {
  console.log("dropdown")
}
