import { useUtils } from '../useComposables/useUtils';
import { mount } from "@vue/test-utils";
import Invoice from '../components/Invoice.vue';

describe('useUtils', () => {
    const{calculateProductTotalValue, calculateInvoiceTotalValue} = useUtils();


test("calculate product total value", () => {  //pased
    const price = calculateProductTotalValue(1.3, 3);
    expect(price).toBe('3.90');
  });
  test("calculate product total value", () => {  //failed
    const price = calculateProductTotalValue(1.3, 3);
    expect(price).toBe('6.90');
  });
  test("calculate invoice total value", () => { //pased
    const productTest = [
        { name: 'P1', quantity: 2, cost: 1.2} , 
        { name: 'P2', quantity: 6, cost: 3.14}
    ]
    const price = calculateInvoiceTotalValue(productTest);
    expect(price).toBe('21.24');
  });
})

