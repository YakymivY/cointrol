import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBarComponent } from './account-bar.component';

describe('AccountBarComponent', () => {
  let component: AccountBarComponent;
  let fixture: ComponentFixture<AccountBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
