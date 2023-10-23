import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { Button, buttonColor } from 'src/app/interface/Button';

enum block{
  expand = "expand",
  full = "full",
  default = "default"
}

enum size{
  xs = "xs",
  s = "s",
  default = "default",
  l = "l",
  xl = "xl"
}

enum buttonFill{
  default ='default',
  clear = 'clear',
  outline = 'outline',
  solid = 'solid'
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})


export class ButtonComponent {

@Input() buttonConfig : Button = {};
@Input() expand? : string = '';
@Input() size? : string = '';
@Input() color? : buttonColor = {};
@Input() fill? : string = 'default';
@Output() onClick = new EventEmitter<any>();
buttonClasses : any[] = [];

onClickButton(event : any){
  if (event.type === 'click' || event.type === 'keydown' && event.key ==  'Enter'){
  this.onClick.emit(event);
  }
}

get buttonStyles() {
  if (this.expand == block.expand){
    this.buttonClasses.push(this.expand);
  }
  this.size && this.buttonClasses.push(`btn--size-${this.size}`);

  return this.buttonClasses
}

  ngonInit() {
    //setting default styles if not provided by parent
    if (!this.buttonConfig.styles){
    this.buttonConfig.styles = {
        width : '150px',
        height: '20px',
        fontFamily : 'sans-serif',
        fontSize : '10px',
        border: 'none'
      }
  }
  }

  ngOnChanges() {
      (this.buttonConfig.styles as any)=  (this.fill && this.fill == buttonFill.clear) ? {
        ...this.buttonConfig.styles,
        border: 'none',
        backgroundColor: 'white',
        color : this.color?.bgColor
      } : (this.fill && this.fill == buttonFill.outline) ? {
        ...this.buttonConfig.styles,
        border : `2px solid ${this.color?.bgColor}`,
        backgroundColor : 'white',
        color : this.color?.bgColor
      } :  {
        ...this.buttonConfig.styles,
        backgroundColor: this.color?.bgColor,
        color : this.color?.txtColor,
      }
  }
}
