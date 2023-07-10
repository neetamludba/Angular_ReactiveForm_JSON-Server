import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation.component';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatListItem, MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [BrowserAnimationsModule, MatSidenavModule, MatToolbarModule, MatListModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should have a sidenav with class "sidenav"', () => {
    const sidenav = fixture.debugElement.query(By.css('.sidenav'));
    expect(sidenav).toBeTruthy();
  });

  it('should have a toolbar with the text "Menu"', () => {
    const toolbar = fixture.debugElement.query(By.directive(MatToolbar));
    expect(toolbar.nativeElement.textContent).toContain('Menu');
  });


  it('should have a sidenav content with the text "Portia Lab"', () => {
    const sidenavContent = fixture.debugElement.query(By.directive(MatSidenavContent));
    const toolbar = sidenavContent.query(By.directive(MatToolbar));
    expect(toolbar.nativeElement.textContent).toContain('Portia Lab');
  });

  it('should have four list items in the sidenav content', () => {
    const sidenavContent = fixture.debugElement.query(By.directive(MatSidenavContent));
    const listItems = sidenavContent.queryAll(By.directive(MatListItem));
    expect(listItems.length).toBe(4);
  });
});

