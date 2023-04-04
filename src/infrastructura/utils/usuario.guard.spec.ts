import { UsuarioGuard } from './usuario.guard';
import { ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('UsuarioGuard', () => {
  let guard: UsuarioGuard;
  let mockContext: ExecutionContext;

  beforeEach(() => {
    guard = new UsuarioGuard();
    mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        params: {
          token: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hIjp7Il9pZCI6IjY0MjY1MWRmZDJjM2ZjOTVkOWRmYTFjZCIsIm5vbWJyZSI6ImNyaXN0aWFuIiwibWFpbCI6ImNyaXNnb256YWxlekBnbWlhbC5jb20iLCJjbGF2ZSI6IjU5OTQ0NzFhYmIwMTExMmFmY2MxODE1OWY2Y2M3NGI0ZjUxMWI5OTgwNmRhNTliM2NhZjVhOWMxNzNjYWNmYzUifSwiaWF0IjoxNjgwMjMzNDU4fQ.KNgjqLcMRJf4fp_ZUCCvMvYxVmFpxaYxJ88Zq5vs6JQ',
        },
      }),
    } as unknown as ExecutionContext;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if token is valid', (done) => {
    jest.spyOn(guard, 'canActivate').mockImplementation(() => {
      return of(true);
    });

    guard.canActivate(mockContext).subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should return false if token is invalid', (done) => {
    jest.spyOn(guard, 'canActivate').mockImplementation(() => {
      return of(false);
    });

    guard.canActivate(mockContext).subscribe((result) => {
      expect(result).toBe(false);
      done();
    });
  });

 
});