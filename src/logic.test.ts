// Self-check for the business rules. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { adjustBalance, computeStats, handover, intakePreview, pushToCart, readyByDay, recordIntake, seedState, TODAY } from './logic.ts';

test('seed matches the Stitch dashboard figures', () => {
  const s = computeStats(seedState().orders);
  assert.equal(s.intake.n, 42);
  assert.equal(s.delivered.n, 28);
  assert.deepEqual(readyByDay(seedState().orders).map(([d, l]) => [d, l.length]), [[22, 4], [23, 6], [24, 14]]);
});

test('intake preview: within allowance, low, and billable excess', () => {
  assert.equal(intakePreview(18.2, 4.5, 45).after, 13.7);
  assert.equal(intakePreview(18.2, 4.5, 45).tone, 'ok');
  assert.equal(intakePreview(6, 2, 45).tone, 'low');
  const over = intakePreview(1.2, 4, 45);
  assert.equal(over.tone, 'over');
  assert.equal(over.excessKg, 2.8);
  assert.equal(over.excessCharge, 126);
  assert.equal(intakePreview(-2, 3, 45).excessKg, 3); // already negative: whole weight is excess
});

test('recordIntake creates the order and the ledger debit together', () => {
  const s0 = seedState();
  const { state, order } = recordIntake(s0, { customerId: 'CUST-0419', weightKg: 4.5, bags: 1, express: false, services: ['Wash & Fold'], by: 'test' });
  assert.equal(order.id, `43${TODAY}10`);
  assert.equal(state.customers.find((c) => c.id === 'CUST-0419')!.balanceKg, 13.7);
  const last = state.ledger.at(-1)!;
  assert.equal(last.deltaKg, -4.5);
  assert.equal(last.balanceAfter, 13.7);
  assert.equal(state.orders.length, s0.orders.length + 1);
  assert.throws(() => recordIntake(s0, { customerId: 'CUST-0419', weightKg: 0, bags: 1, express: false, services: [], by: 't' }));
});

test('cart push then handover; washing orders cannot be handed over', () => {
  const s0 = seedState();
  const ready = s0.orders.filter((o) => o.status === 'ready').slice(0, 2).map((o) => o.id);
  const washing = s0.orders.find((o) => o.status === 'washing')!.id;
  const { state: s1, moved } = pushToCart(s0, ready);
  assert.equal(moved.length, 2);
  const { state: s2, done } = handover(s1, [...ready, washing], 'test');
  assert.equal(done.length, 2);
  assert.equal(s2.orders.find((o) => o.id === washing)!.status, 'washing');
});

test('adjustments need a reason', () => {
  assert.throws(() => adjustBalance(seedState(), 'CUST-0419', 2, ' ', 'owner'));
  const s = adjustBalance(seedState(), 'CUST-0419', 3, 'Tare correction', 'owner');
  assert.equal(s.customers[0].balanceKg, 21.2);
});
