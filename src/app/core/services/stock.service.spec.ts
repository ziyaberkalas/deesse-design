import { TestBed } from '@angular/core/testing';
import { StockService, stockStatusOf } from './stock.service';

describe('stockStatusOf', () => {
  it('takip edilmeyen ürün "unknown" olur -- rozet çıkmaz, satış engellenmez', () => {
    expect(stockStatusOf(undefined)).toBe('unknown');
  });

  it('0 ve altı "out-of-stock" olur', () => {
    expect(stockStatusOf(0)).toBe('out-of-stock');
  });

  it('tam olarak 1 "last-one" olur', () => {
    expect(stockStatusOf(1)).toBe('last-one');
  });

  it('1 üstü "in-stock" olur (rozet gösterilmez)', () => {
    expect(stockStatusOf(2)).toBe('in-stock');
    expect(stockStatusOf(99)).toBe('in-stock');
  });
});

describe('StockService', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockService);
  });

  it('veri yokken her ürünü takipsiz sayar (güvenli varsayılan)', () => {
    expect(service.stockFor('elegance')).toBeUndefined();
    expect(service.statusFor('elegance')).toBe('unknown');
  });
});
