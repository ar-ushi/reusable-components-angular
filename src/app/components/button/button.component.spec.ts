import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle click and emit event', () => {
    const spy = spyOn(component.onClick, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');

    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });  
  it('should handle keydown and emit event', () => {
    const spy = spyOn(component.onClick, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    buttonElement.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });
  it('should override default styles with config input', () => {
    const buttonConfig = {
      width: '200px',
      height: '30px',
      fontSize: '15px',
      border: '1px solid black',
      cursor: 'pointer',
    };

    component.config = buttonConfig;
    fixture.detectChanges();

    expect(component.buttonConfig).toEqual(jasmine.objectContaining(buttonConfig));
  });
});
