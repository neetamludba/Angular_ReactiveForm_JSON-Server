import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestService', () => {
  let service: TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAllCategories function', () => {
    expect(service.getAllCategories).toBeTruthy();
  }
  );

  it('should have getMatchedTestQuestions function', () => {
    expect(service.getMatchedTestQuestions).toBeTruthy();
  }
  );

  it('should have getTest function', () => {
    expect(service.getTest).toBeTruthy();
  }
  );

  it('should have getAllTest function', () => {
    expect(service.getAllTest).toBeTruthy();
  }
  );

  it('should have saveTest function', () => {
    expect(service.saveTest).toBeTruthy();
  }
  );

  it('should have deleteTest function', () => {
    expect(service.deleteTest).toBeTruthy();
  }
  );

  it('should have unDeleteTest function', () => {
    expect(service.unDeleteTest).toBeTruthy();
  }
  );

  it('should have getTestID function', () => {
    expect(service.getTestID).toBeTruthy();
  }
  );
});
