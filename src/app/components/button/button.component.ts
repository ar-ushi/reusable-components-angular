import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import { ButtonStyles} from './button.util';
import { CommonModule } from '@angular/common';
import { Colors, createColorObject } from 'src/app/common-behaviors/colors';
import { BaseClass } from 'src/app/common-behaviors/base';
import { Size } from 'src/app/common-behaviors/size';

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
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})


export class ButtonComponent implements AfterViewInit{

@Input() buttonConfig : ButtonStyles = {
  width : '150px',
  height: '20px',
  fontFamily : 'sans-serif',
  fontSize : '10px',
  border: 'none',
  cursor : 'pointer'
};
@Input() size? : 'xs' | 's' | 'l' | 'xl'
@Input() color?: string;
@Input() bgcolor?: string;
@Input() fill :  'clear' | 'outline' | 'solid' = 'solid'
@Output() onClick = new EventEmitter<any>();
private styles : BaseClass;
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
  this.size && this.buttonClasses.push(`btn--size-${this.size}`);

  return this.buttonClasses
}

constructor(public _elementRef : ElementRef){  
 this.styles  = new BaseClass( new Colors(_elementRef), new Size(_elementRef));
}

ngAfterViewInit(){
  this.styles.colors.addColors(createColorObject(this.bgcolor!, this.color!, this.fill));
  this.styles.size?.addSize(this.size!);
}
}


