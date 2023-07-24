import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AccountService } from '../account/account.service';
import { of, Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let accountService: AccountService;
  let router: Router;
  let routerEventsSubject: Subject<RouterEvent>;

  beforeEach(() => {
    routerEventsSubject = new Subject<RouterEvent>();

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          useValue: {
            data: of({ title: 'Test Title' }),
            firstChild: null,
          },
        },
        {
          provide: AccountService,
          useClass: AccountService,
        },
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);

    spyOn(accountService, 'logout');

    // Set up the router events subscription with the routerEventsSubject
    spyOnProperty(router, 'events').and.returnValue(routerEventsSubject.asObservable());

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

  it('should set the current page title based on route data', fakeAsync(() => {
    const navigationEndEvent = new NavigationEnd(
      0,
      'http://localhost:4200/reset-password',
      'http://localhost:4200/reset-password'
    );

 

    // Trigger the NavigationEnd event
    routerEventsSubject.next(navigationEndEvent);
    tick(); // Flush the observable to handle async operations


    // Trigger ngOnInit manually
    component.ngOnInit();

    expect(component.getTitle()).toBe('Page Title');
  }));



  it('should set the userName based on localStorage data', () => {
    const mockUser = [{ firstName: 'John', lastName: 'Doe' }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    component.getUserName();

    expect(component.userName).toBe('John Doe');
  });
  
  it('should handle null or undefined userString in getUserName()', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.getUserName();

    expect(component.userName).toBe('');
  });

  it('should call logout method of accountService on logout', () => {
    component.logout();

    expect(accountService.logout).toHaveBeenCalled();
  });

  it('should navigate to reset-password page on reset password', () => {
    const routerSpy = spyOn((component as any).router, 'navigateByUrl');

    component.resetPassword();

    expect(routerSpy).toHaveBeenCalledWith('/reset-password');
  });

});
