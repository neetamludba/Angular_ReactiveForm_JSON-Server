import { TestBed } from '@angular/core/testing';

import { BatchService } from './batch.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BatchService', () => {
  let service: BatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAllBatches function', () => {
    expect(service.getAllBatches).toBeTruthy();
  }
  );

  it('should have getbatch function', () => {
    expect(service.getbatch).toBeTruthy();
  }
  );

  it('should have saveBatch function', () => {
    expect(service.saveBatch).toBeTruthy();
  }
  );

  it('should have deleteBatch function', () => {
    expect(service.deleteBatch).toBeTruthy();
  }
  );

  it('should have unDeleteBatch function', () => {
    expect(service.unDeleteBatch).toBeTruthy();
  }
  );


});
