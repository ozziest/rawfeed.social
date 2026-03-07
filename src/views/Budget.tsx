import type { BaseProps } from "../types/views";
import { DefaultLayout } from "./layouts/DefaultLayout";

// Edit this section to update your budget. All costs are in USD.

const START_DATE = new Date("2026-01-25");

type BillingCycle = "monthly" | "yearly" | "one-time";
type BudgetCategory =
  | "Infrastructure"
  | "Communication"
  | "Storage"
  | "Monitoring"
  | "Other";

type PricePeriod = {
  /** ISO date "YYYY-MM-DD" — the first day this price took effect */
  from: string;
  cost: number;
};

type BudgetItem = {
  name: string;
  category: BudgetCategory;
  description?: string;
  /** Current price — shown in the table and used for monthly/yearly estimates. */
  cost: number;
  cycle: BillingCycle;
  /**
   * Optional price history for an accurate "Total Since Launch" calculation.
   * List all price changes oldest-first. The last entry's cost should match
   * the top-level `cost` field above.
   *
   * Example — droplet upgraded from $14.40 to $24.00 in June 2026:
   *   priceHistory: [
   *     { from: "2026-01-25", cost: 14.4 },
   *     { from: "2026-06-01", cost: 24.0 },
   *   ]
   */
  priceHistory?: PricePeriod[];
};

const BUDGET_ITEMS: BudgetItem[] = [
  {
    name: "Domain (.social)",
    category: "Infrastructure",
    description: "rawfeed.social annual renewal",
    cost: 32.2,
    cycle: "yearly",
  },
  {
    name: "DigitalOcean",
    category: "Infrastructure",
    description: "Droplet (1 vCPU, 2 GB Memory, 50 GB Disk)",
    cost: 14.4,
    cycle: "monthly",
  },
  {
    name: "Object Storage",
    category: "Storage",
    description: "AWS S3 (Data exports)",
    cost: 0.1,
    cycle: "monthly",
  },
  {
    name: "Container Registry",
    category: "Storage",
    description: "AWS ECR (Docker image)",
    cost: 0.5,
    cycle: "monthly",
  },
  {
    name: "Transactional Email",
    category: "Communication",
    description: "Resend — free tier",
    cost: 0.0,
    cycle: "monthly",
  },
  {
    name: "Error Tracking",
    category: "Monitoring",
    description: "Sentry — free tier",
    cost: 0.0,
    cycle: "monthly",
  },
  {
    name: "CDN / DDoS Protection",
    category: "Other",
    description: "Cloudflare — free tier",
    cost: 0.0,
    cycle: "monthly",
  },
];

function toMonthlyEquivalent(item: BudgetItem): number {
  if (item.cycle === "monthly") return item.cost;
  if (item.cycle === "yearly") return item.cost / 12;
  return 0; // one-time costs are handled separately
}

function toYearlyEquivalent(item: BudgetItem): number {
  if (item.cycle === "monthly") return item.cost * 12;
  if (item.cycle === "yearly") return item.cost;
  return 0;
}

function monthsElapsed(from: Date, to: Date): number {
  return (
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth())
  );
}

/**
 * Returns the effective monthly-equivalent cost for a given calendar month,
 * respecting priceHistory if defined.
 */
function effectiveMonthlyCost(
  item: BudgetItem,
  year: number,
  month: number,
): number {
  if (item.cycle === "one-time") return 0;

  let baseCost = item.cost;

  if (item.priceHistory && item.priceHistory.length > 0) {
    const date = new Date(year, month, 1);
    // Walk through periods; last one that started on/before `date` wins.
    for (const period of item.priceHistory) {
      if (date >= new Date(period.from)) {
        baseCost = period.cost;
      }
    }
  }

  if (item.cycle === "monthly") return baseCost;
  if (item.cycle === "yearly") return baseCost / 12;
  return 0;
}

/**
 * Accurate grand total: walks every month from `from` to `to` and sums the
 * effective cost for each item, honouring any priceHistory changes.
 * One-time costs are added once.
 */
function calculateGrandTotal(
  items: BudgetItem[],
  from: Date,
  to: Date,
): number {
  let total = 0;

  for (const item of items) {
    if (item.cycle === "one-time") {
      total += item.cost;
      continue;
    }

    const cur = new Date(from.getFullYear(), from.getMonth(), 1);
    const end = new Date(to.getFullYear(), to.getMonth(), 1);
    while (cur <= end) {
      total += effectiveMonthlyCost(item, cur.getFullYear(), cur.getMonth());
      cur.setMonth(cur.getMonth() + 1);
    }
  }

  return total;
}

/** Returns the first (oldest) cost from priceHistory, if history spans > 1 price. */
function initialCost(item: BudgetItem): number | null {
  if (!item.priceHistory || item.priceHistory.length < 2) return null;
  return item.priceHistory[0].cost;
}

function formatUSD(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function cycleBadge(cycle: BillingCycle) {
  const styles: Record<BillingCycle, string> = {
    monthly: "bg-blue-100 text-blue-700",
    yearly: "bg-purple-100 text-purple-700",
    "one-time": "bg-gray-100 text-gray-600",
  };
  return (
    <span
      class={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${styles[cycle]}`}
    >
      {cycle}
    </span>
  );
}

const CATEGORY_COLORS: Record<BudgetCategory, string> = {
  Infrastructure: "bg-gray-800",
  Communication: "bg-emerald-700",
  Storage: "bg-sky-700",
  Monitoring: "bg-amber-600",
  Other: "bg-slate-500",
};

function categoryBadge(category: BudgetCategory) {
  return (
    <span
      class={`inline-block text-xs font-medium text-white px-2 py-0.5 rounded-full ${CATEGORY_COLORS[category]}`}
    >
      {category}
    </span>
  );
}

type Props = BaseProps;

export function BudgetPage(props: Props) {
  const now = new Date();

  const monthlyTotal = BUDGET_ITEMS.reduce(
    (sum, item) => sum + toMonthlyEquivalent(item),
    0,
  );
  const yearlyTotal = BUDGET_ITEMS.reduce(
    (sum, item) => sum + toYearlyEquivalent(item),
    0,
  );

  const elapsed = Math.max(monthsElapsed(START_DATE, now), 1);
  const grandTotal = calculateGrandTotal(BUDGET_ITEMS, START_DATE, now);

  return (
    <DefaultLayout {...props} title="Budget — Rawfeed">
      <main class="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div class="mb-5">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Budget &amp; Transparency
          </h1>
          <p class="text-gray-600 text-sm leading-relaxed">
            Rawfeed is a non-profit, open-source project run by a single person
            who believes the web should stay open and humane.{" "}
            <strong>We don't sell your data. We don't profile you.</strong>{" "}
            There are no investors to please and no growth targets to hit. It's
            just a platform that tries to do right by its users.
          </p>
          <p class="text-gray-600 text-sm leading-relaxed mt-3">
            Running a server costs real money, though. This page shows exactly
            where every dollar goes. Tracking costs since{" "}
            <strong safe>{formatDate(START_DATE)}</strong>.
          </p>
        </div>

        {/* Funding notice */}
        <div class="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 mb-5 flex gap-4 items-start">
          <span class="text-2xl mt-0.5" aria-hidden="true">
            💛
          </span>
          <div>
            <p class="text-sm font-semibold text-gray-800 mb-1">
              How is Rawfeed funded?
            </p>
            <p class="text-sm text-gray-600 leading-relaxed">
              Right now, entirely out of pocket. No ads, no data deals, no
              subscriptions. If that ever changes — say, a small
              non-personalised banner ad to help cover costs — you'll read about
              it here first, honestly and in plain language. Your trust matters
              more than any revenue model.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Per Month
            </p>
            <p class="text-2xl font-bold text-gray-900" safe>
              {formatUSD(monthlyTotal)}
            </p>
            <p class="text-xs text-gray-400 mt-1">estimated monthly spend</p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Per Year
            </p>
            <p class="text-2xl font-bold text-gray-900" safe>
              {formatUSD(yearlyTotal)}
            </p>
            <p class="text-xs text-gray-400 mt-1">estimated annual spend</p>
          </div>

          <div class="bg-black rounded-lg shadow-sm p-5">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Total Since Launch
            </p>
            <p class="text-2xl font-bold text-white" safe>
              {formatUSD(grandTotal)}
            </p>
            <p class="text-xs text-gray-400 mt-1">
              over {elapsed} month{elapsed !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100">
            <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Services &amp; Costs
            </h2>
          </div>

          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50 text-left">
                <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-full">
                  Service
                </th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Cycle
                </th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right whitespace-nowrap">
                  Cost
                </th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right whitespace-nowrap">
                  / month
                </th>
                <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right whitespace-nowrap">
                  / year
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              {BUDGET_ITEMS.map((item) => (
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-4">
                    <div class="flex flex-col gap-1">
                      <span class="font-medium text-gray-900" safe>
                        {item.name}
                      </span>
                      {item.description ? (
                        <span class="text-gray-400 text-xs" safe>
                          {item.description}
                        </span>
                      ) : undefined}
                      <div class="mt-0.5">{categoryBadge(item.category)}</div>
                    </div>
                  </td>
                  <td class="px-5 py-4 align-top">{cycleBadge(item.cycle)}</td>
                  <td class="px-5 py-4 text-right align-top font-mono text-gray-700">
                    {item.cost === 0 ? (
                      <span class="text-emerald-600 font-semibold text-xs">
                        FREE
                      </span>
                    ) : (
                      <div class="flex flex-col items-end gap-0.5">
                        <span safe>{formatUSD(item.cost)}</span>
                        {initialCost(item) !== null && (
                          <span class="text-gray-400 text-xs font-normal">
                            started at{" "}
                            <span safe>
                              {formatUSD(initialCost(item) as number)}
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td
                    class="px-5 py-4 text-right align-top font-mono text-gray-500 text-xs"
                    safe
                  >
                    {item.cycle === "one-time"
                      ? "—"
                      : toMonthlyEquivalent(item) === 0
                        ? "—"
                        : formatUSD(toMonthlyEquivalent(item))}
                  </td>
                  <td
                    class="px-5 py-4 text-right align-top font-mono text-gray-500 text-xs"
                    safe
                  >
                    {item.cycle === "one-time"
                      ? "—"
                      : toYearlyEquivalent(item) === 0
                        ? "—"
                        : formatUSD(toYearlyEquivalent(item))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr class="bg-gray-50 border-t border-gray-200">
                <td
                  colspan="2"
                  class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  Total
                </td>
                <td class="px-5 py-3 text-right font-mono font-bold text-gray-900">
                  &nbsp;
                </td>
                <td
                  class="px-5 py-3 text-right font-mono font-bold text-gray-900"
                  safe
                >
                  {formatUSD(monthlyTotal)}
                </td>
                <td
                  class="px-5 py-3 text-right font-mono font-bold text-gray-900"
                  safe
                >
                  {formatUSD(yearlyTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer note */}
        <p class="mt-6 text-xs text-gray-400 text-center">
          Last updated <span safe>{formatDate(now)}</span>. All prices in USD.
          Free-tier services may incur costs as usage grows — any change will be
          reflected here.
        </p>
      </main>
    </DefaultLayout>
  );
}
