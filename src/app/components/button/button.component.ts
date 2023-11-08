import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ButtonStyles, buttonColor } from './button.util';
import { CommonModule } from '@angular/common';

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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})


export class ButtonComponent {

@Input() buttonConfig : ButtonStyles = {
  width : '150px',
  height: '20px',
  fontFamily : 'sans-serif',
  fontSize : '10px',
  border: 'none',
  cursor : 'pointer'
};
@Input() expand? : string = '';
@Input() size? : string = '';
@Input() btncolor? : buttonColor = {};
@Input() fill? : 'default' | 'clear' | 'outline' | 'solid' = 'default';
@Output() onClick = new EventEmitter<any>();
buttonClasses : any[] = [];

onClickButton(event : any){
  if (event.type === 'click' || event.type === 'keydown' && event.key ==  'Enter'){
  this.onClick.emit(event);
  }
}

@Input()
public set config(obj : ButtonStyles){
  //only override defaults for value sent by parent
  this.buttonConfig= {...this.buttonConfig, ...obj};
}
get buttonStyles() {
  if (this.expand == block.expand){
    this.buttonClasses.push(this.expand);
  }
  this.size && this.buttonClasses.push(`btn--size-${this.size}`);

  return this.buttonClasses
}


  ngOnChanges() {
      (this.buttonConfig as any)=  (this.fill && this.fill == buttonFill.clear) ? {
        ...this.buttonConfig,
        border: 'none',
        backgroundColor: 'white',
        color : this.btncolor?.bgColor
      } : (this.fill && this.fill == buttonFill.outline) ? {
        ...this.buttonConfig,
        border : `2px solid ${this.btncolor?.bgColor}`,
        backgroundColor : 'white',
        color : this.btncolor?.bgColor
      } :  {
        ...this.buttonConfig,
        backgroundColor: this.btncolor?.bgColor,
        color : this.btncolor?.txtColor,
      }
  }
}
