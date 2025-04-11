import { TestBed } from '@angular/core/testing';

import { JsonCurdService } from './json-curd.service';

describe('JsonCurdService', () => {
  let service: JsonCurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonCurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
