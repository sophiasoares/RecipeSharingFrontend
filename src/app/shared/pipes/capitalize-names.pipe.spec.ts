import { CapitalizeNamesPipe } from './capitalize-names.pipe';

describe('CapitalizeNamesPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeNamesPipe();
    expect(pipe).toBeTruthy();
  });
});
