export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface ExpenseByCategorySummary {
    expenseByCategoryId: string;
    expenseSummaryId: string;
    category: string;
    amount: string;
    date: Date;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: Date;
}

export interface Product {
    productId: string;
    name: string;
    price: number;
    rating: number;
    stockQuantity: number;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage: number;
    date: Date;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage: number;
    date: Date;
}
