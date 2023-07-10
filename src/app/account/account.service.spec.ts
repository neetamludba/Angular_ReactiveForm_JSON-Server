import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have login function', () => {
    expect(service.login).toBeTruthy();
  }
  );

  it('should have resetPassword function', () => {
    expect(service.resetPassword).toBeTruthy();
  }
  );

  it('should have logout function', () => {
    expect(service.logout).toBeTruthy();
  }
  );

  
});
