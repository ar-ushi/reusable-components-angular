import { Injectable } from '@angular/core';
import { autocompleteAPIConfig } from './autocomplete.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutocompleteService {

  constructor(private http: HttpClient) { }
  
  getFilteredData(config:autocompleteAPIConfig, apiUrl: string, query: string){
    const url = apiUrl.replace('{value}', query);
    const headers = config.headers ? config.headers : new HttpHeaders();
    const requestOptions = {
      headers,
    };
    return (config.apiType === 'http' ? this.requestHttpData(url, requestOptions, config) : this.requestJsonData(url));
  }

  private requestHttpData(url: string, requestOptions: any, config: autocompleteAPIConfig) : Observable<any>{
    if (config.httpMethod === 'get'){
      let res = this.http.get(url, requestOptions!);
      return res;
    } else {
      return this.http[config.httpMethod](url, config.payload, requestOptions)
    }
  }

  private requestJsonData(url: string){
    return this.http.jsonp(url, 'defaultCallback');
  }
}