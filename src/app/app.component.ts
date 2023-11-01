import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  selected: string = 'Apple';
  dropdownConfig : any = {
    backgroundColor: '#ffff13',
  }

  onSelected(val : any){
    console.log(val);
    console.log(this.selected);
  }
}
