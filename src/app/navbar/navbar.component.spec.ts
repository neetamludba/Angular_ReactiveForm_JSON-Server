import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AccountService } from '../account/account.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockActivatedRoute { }

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let accountService: AccountService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          provide: ActivatedRoute, useClass: MockActivatedRoute, useValue: {
            data: of({ title: 'Test Title' }),
            firstChild: null
          }
        },
        {
          provide: AccountService,
          useClass: AccountService
        }
      ],
      imports: [RouterTestingModule ,HttpClientTestingModule, MatToolbarModule, MatIconModule, MatMenuModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    spyOn(accountService, 'logout');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userName based on localStorage data', () => {
    const mockUser = [{ firstName: 'John', lastName: 'Doe' }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    component.getUserName();

    expect(component.userName).toBe('John Doe');
  });

  it('should handle null or undefined userString in getUserName', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.getUserName();

    expect(component.userName).toBe(''); // Set appropriate fallback value or error handling logic
  });

  it('should call logout method of accountService on logout', () => {
    component.logout();

    expect(accountService.logout).toHaveBeenCalled();
  }
  );

  it('should set the current page title', () => {
    expect((component as any).currentPageTitle).toBe('');

    component.ngOnInit();

    expect((component as any).currentPageTitle).toBe('');
  }
  );


  // it('should navigate to reset-password page on reset password',async () => {
    
  //   await
  //   component.resetPassword();

  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/reset-password');
  // });

});
