import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Button } from 'src/app/interface/Button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
 
@Input() buttonConfig : Button;
@Output() onClick = new EventEmitter<any>();

onClickButton(event : any){
  this.onClick.emit(event);
}

  constructor() {
    //setting default styles if not provided by parent
    this.buttonConfig= {
      styles : {
        width : '10px',
        height: '20px',
        backgroundColor : 'blue',
        color : 'white',
        fontFamily : 'sans-serif',
        fontSize : '10px'
      }
    }
  }

}
