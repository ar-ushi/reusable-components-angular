import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
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

}
