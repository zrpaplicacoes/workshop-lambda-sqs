import { toResponse } from '../src';

describe('lambda toResponse', () => {
  it('should assign status code 200 by default', () => {
    const contents = { key: "value" };
    const response = toResponse(contents);
    
    expect(response.statusCode).toEqual(200);
  });
});
