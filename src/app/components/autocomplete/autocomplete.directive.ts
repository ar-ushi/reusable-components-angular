import { Directive, HostListener, Input } from "@angular/core";
import { keyCode } from "./autocomplete.util";

@Directive({
    selector: '[autocomplete]',
  })

  export class AutoCompleteDirective {
    @Input() searchData?: string | Array<any>  //data can be api url (search box) or a list (dropdown)

   @HostListener('keyup', ['event'])
   onKeyUp(event : KeyboardEvent){
    if (event && event.target && this.validateCharKeyCode (parseInt(event.key))){
      this.showFilteredDataList(event);
      console.log((event.target as HTMLInputElement).value);
    }
   }

    private showFilteredDataList(event: KeyboardEvent){       
   }

   validateCharKeyCode(key: number) : boolean{
    var keyValue = Object.values(keyCode)
    return keyValue.every(codeKey => codeKey !== key);
   }

}