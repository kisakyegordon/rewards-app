import { calculatePoints, monthKey, aggregate } from "../utils/rewardsUtils";

describe("calculatePoints()", () => {
  it("awards 0 under $50", () => {
    expect(calculatePoints(49)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
  });

  it("awards 1 per $ from 50..100", () => {
    expect(calculatePoints(75)).toBe(25);
    expect(calculatePoints(100)).toBe(50);
  });

  it("awards 2 per $ >100 plus 50 from previous tier", () => {
    expect(calculatePoints(120)).toBe(90); 
    expect(calculatePoints(200)).toBe(250);
  });
});

describe("monthKey()", () => {
  it("returns YYYY-MM", () => {
    expect(monthKey("2025-02-09")).toBe("2025-02");
  });
});

describe("aggregate()", () => {
  const txns = [
    { id: 1, customerId: "XZ9-ALP", customer: "Nova Quill", amount: 120, date: "2025-01-04" },
    { id: 2, customerId: "XZ9-ALP", customer: "Nova Quill", amount: 62,  date: "2025-02-09" },
    { id: 3, customerId: "JK7-PMN", customer: "Rafi Orbit", amount: 205, date: "2025-01-22" },
  ];

  it("groups by customer and month, computes totals", () => {
    const { months, rows } = aggregate(txns);
    expect(months).toEqual(["2025-01", "2025-02"]);
    const nova = rows.find(r => r.customerId === "XZ9-ALP");
    const rafi = rows.find(r => r.customerId === "JK7-PMN");

    expect(nova.total).toBe(90 + 12);
    expect(nova.perMonth.get("2025-01")).toBe(90);
    expect(nova.perMonth.get("2025-02")).toBe(12);

    expect(rafi.total).toBe(260);
    expect(rafi.perMonth.get("2025-01")).toBe(260);
  });
});
