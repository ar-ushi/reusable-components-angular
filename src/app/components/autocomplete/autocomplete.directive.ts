import { Directive, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";
import { autocompleteAPIConfig, keyCode } from "./autocomplete.util";
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { AutocompleteService } from "./autocomplete.service";
import { CacheService } from "src/app/common-behaviors/cache/cache.service";


@Directive({
    selector: '[autocomplete]',
  })

  export class AutoCompleteDirective implements OnInit{
    @Input() searchData?: string | Array<any>  //data can be api url (search box) or a list (dropdown)
    @Output() filteredDataList = new EventEmitter<Array<any>>;
    @Input() minlength : number = 1;
    @Input() debounce : number = 500;
    @Input() cachecapacity?: number; //if cache capacity passed in assume caching allowed
    @Input() urlconfig: autocompleteAPIConfig = {
      apiType: 'http',
      httpMethod : 'get', 
    }
    constructor(private UixAutoCompleteService : AutocompleteService, private cacheService: CacheService<any>){};

    ngOnInit(){
      if (this.cachecapacity){
        this.cacheService.setCapacity(this.cachecapacity);
      }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
      if (event && event.target) {
        this.showFilteredDataList(of(event));
      }
    }
    
    private showFilteredDataList(event: Observable<KeyboardEvent>) {
      event.pipe(
        filter((e: KeyboardEvent) => this.validateCharKeyCode(e.key)),
        map((e: KeyboardEvent) => this.extractSearchTerm(e)),
        filter((searchTerm: string) => searchTerm.length >= this.minlength),
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap((searchTerm : string) => {
          if (this.cachecapacity){
            const cachedResult = this.cacheService.get(searchTerm); //checking if result already cached;
            if (cachedResult){
              return of(cachedResult);
            }
          }
          return this.fetchFilteredData(searchTerm);
          //data not found in cache/cache not enabled - proceed with api request
          })
      ).subscribe((filteredList) => {
        this.filteredDataList.emit(filteredList!);
      });
    }
    
  extractSearchTerm(e : KeyboardEvent){
    return (e.target as HTMLInputElement).value;
  }

  fetchFilteredData(query: string){
    let filteredData;
      if (Array.isArray(this.searchData)){
        filteredData = of(this.filterStaticData(query))
      } else if (query === "" && Array.isArray(this.searchData)){
        filteredData = of(this.searchData);
      } else{
        filteredData =  this.filterDynamicData(query)
      }
    if (this.cachecapacity){
      this.cacheService.save(query, filteredData);
    }
    return filteredData;
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

  filterDynamicData(query: string){
    return this.UixAutoCompleteService.getFilteredData(this.urlconfig, (this.searchData as string), query);
  }

   validateCharKeyCode(key: string) : boolean{
    var keyValue = Object.values(keyCode)
    return keyValue.every(codeKey => codeKey !== key);
   }
}