import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramLoginComponent } from './telegram-login.component';

describe('TelegramLoginComponent', () => {
  let component: TelegramLoginComponent;
  let fixture: ComponentFixture<TelegramLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelegramLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelegramLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
