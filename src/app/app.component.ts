import { Component } from '@angular/core';
import { autocompleteAPIConfig } from './components/autocomplete/autocomplete.util';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  searchAPI= '/api/search/?q={value}';
  transformedData:any;
  searchAPIConfig : autocompleteAPIConfig = {
    apiType : 'http',
    httpMethod : 'get',
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  fruits: any = [
    {
      text: 'Apple',
      subtitle: 'So fresh',
      disabled: 'true'
    },
    {
      text: 'Berries',
      subtitle: 'So yellow',
    },
    {
      text: 'Berry',
    subtitle: 'What a wow',
    },
  ];
  dropdownConfig : any = {
    backgroundColor: '#ffff13',
    allowSearch: true,
    limitSelection: 3,
    multipleSelection: true,
  }

  onSelected(val : any){
    console.log(val);
    console.log(val.subtitle);
  }

  transformData(e: any){
    let data =  [
      {
        text: 'Apple',
        subtitle: 'So fresh',
        disabled: 'true'
      },
      {
        text: 'Berries',
        subtitle: 'So yellow',
      },
      {
        text: 'Berry',
      subtitle: 'What a wow',
      },
    ]; 
    return data;
  }
}