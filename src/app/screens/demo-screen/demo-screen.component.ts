import { Component } from '@angular/core';
import { Button } from 'src/app/interface/Button';

@Component({
  selector: 'app-demo-screen',
  templateUrl: './demo-screen.component.html',
  styleUrls: ['./demo-screen.component.scss']
})
export class DemoScreenComponent {

  buttonCon : string = '';
  buttonConfig : Button = {
    styles : {
      width : '150px',
      height: '60px',
      backgroundColor: 'red',
      color : 'white',
      fontFamily : 'sans-serif',
      fontSize: '20px',
      padding : '5px 5px 5px 5px',
      borderRadius: '5px',
      border : 'none'
    },
    label : 'Testing'
  }
  
  buttonClicked(event:Event) {
   this.buttonCon = '<div><p>You just clicked a button!</p></div>'
   return this.buttonCon;
  }
  
}
