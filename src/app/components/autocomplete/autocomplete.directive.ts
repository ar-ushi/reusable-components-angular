import { Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import { keyCode } from "./autocomplete.util";
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Observable, of } from "rxjs";


@Directive({
    selector: '[autocomplete]',
    standalone: true,
  })

  export class AutoCompleteDirective {
    @Input() searchData?: string | Array<any>  //data can be api url (search box) or a list (dropdown)
    @Output() filteredDataList = new EventEmitter<Array<any>>;
    @Input() debounce = 300;
    searchTerm : any;

    @HostListener('keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
      this.searchTerm = ((event.target as HTMLInputElement).value);
      if (event && event.target && this.validateCharKeyCode(event.key)) {
        this.showFilteredDataList(of(event));
      }
    }
    
    private showFilteredDataList(event: Observable<KeyboardEvent>) {
      event.pipe(
        filter((e: KeyboardEvent) => this.validateCharKeyCode(e.key)),
        map((e: KeyboardEvent) => this.extractSearchTerm(e)),
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap((searchTerm : string) => {
          if (Array.isArray(this.searchData)){
          const filteredData = this.filterStaticData(searchTerm);
            return of(filteredData);
          } else {
            if (searchTerm === "" && Array.isArray(this.searchData)){
              return of(this.searchData);
            }
            return of([]);
          }
          })
      ).subscribe((filteredList) => {
        this.filteredDataList.emit(filteredList!);
      });
    }
    
  extractSearchTerm(e : KeyboardEvent){
    return (e.target as HTMLInputElement).value;
  }
  /* Used for Components which has a finite, manageable list of data already being called to the UI in an API call - e.g : Dropdown */ 
  filterStaticData(query : string){
    query = query.toLowerCase();
    if (Array.isArray(this.searchData)){
    const filteredList = this.searchData!.filter((str: any) => {
      const textToCompare = (str.text || str).toString().toLowerCase();
      return textToCompare.startsWith(query);
    });
    return filteredList;
  };
  return;
  }

   validateCharKeyCode(key: string) : boolean{
    var keyValue = Object.values(keyCode)
    return keyValue.every(codeKey => codeKey !== key);
   }
}