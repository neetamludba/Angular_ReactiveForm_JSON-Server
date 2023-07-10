import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getUser function', () => {
    expect(service.getUser).toBeTruthy();
  }
  );

  it('should have getAllUsers function', () => {
    expect(service.getAllUsers).toBeTruthy();
  }
  );

  it('should have saveUser function', () => {
    expect(service.saveUser).toBeTruthy();
  }
  );

  it('should have deleteUser function', () => {
    expect(service.deleteUser).toBeTruthy();
  }
  );

  it('should have unDeleteUser function', () => {
    expect(service.unDeleteUser).toBeTruthy();
  }
  );

  it('should have getAllBatches function', () => {
    expect(service.getAllBatches).toBeTruthy();
  }
  );
});
