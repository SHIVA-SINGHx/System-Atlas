import { RateLimitService } from '../src/modules/rate-limit/rate-limit.service';

describe('RateLimitService', () => {
  let service: RateLimitService;

  beforeEach(() => {
    service = new RateLimitService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
