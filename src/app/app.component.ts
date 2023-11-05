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
      text: 'Banana',
      subtitle: 'So yellow',
    },
    {
      text: 'Cherry',
      subtitle: 'What a wow',
    },
  ];
  selected = ['Apple']
  disableDropdown = true;
  dropdownConfig : any = {
    backgroundColor: '#ffff13',
  }

  onSelected(val : any){
    console.log(val);
    console.log(val.subtitle);
  }

  buttonClicked(event:Event) {
    this.disableDropdown = false;
   }
}
