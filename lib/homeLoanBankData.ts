export interface HomeLoanBankInfo {
    slug: string;
    name: string;
    description: string;
    interestRate: number;
}

const HOME_LOAN_BANKS: HomeLoanBankInfo[] = [
    { slug: 'sbi', name: 'SBI', description: 'Calculate SBI Home Loan EMI. Get SBI home loan interest rates, eligibility, and repayment schedule.', interestRate: 8.5 },
    { slug: 'hdfc', name: 'HDFC', description: 'Calculate HDFC Home Loan EMI. Get HDFC home loan interest rates, eligibility, and repayment schedule.', interestRate: 8.75 },
    { slug: 'icici', name: 'ICICI', description: 'Calculate ICICI Home Loan EMI. Get ICICI home loan interest rates, eligibility, and repayment schedule.', interestRate: 8.75 },
    { slug: 'axis', name: 'Axis Bank', description: 'Calculate Axis Bank Home Loan EMI. Get Axis Bank home loan interest rates and repayment schedule.', interestRate: 8.75 },
    { slug: 'kotak', name: 'Kotak Mahindra', description: 'Calculate Kotak Mahindra Home Loan EMI. Get Kotak home loan interest rates and repayment schedule.', interestRate: 8.7 },
    { slug: 'pnb', name: 'PNB', description: 'Calculate PNB Home Loan EMI. Get PNB home loan interest rates, eligibility, and repayment schedule.', interestRate: 8.45 },
    { slug: 'bob', name: 'Bank of Baroda', description: 'Calculate Bank of Baroda Home Loan EMI. Get BoB home loan interest rates and repayment schedule.', interestRate: 8.4 },
    { slug: 'lic', name: 'LIC Housing Finance', description: 'Calculate LIC Housing Finance Home Loan EMI. Get LIC HFL home loan interest rates.', interestRate: 8.5 },
    { slug: 'canara', name: 'Canara Bank', description: 'Calculate Canara Bank Home Loan EMI. Get Canara Bank home loan interest rates and repayment schedule.', interestRate: 8.4 },
    { slug: 'bajaj', name: 'Bajaj Housing Finance', description: 'Calculate Bajaj Housing Finance Home Loan EMI. Get Bajaj home loan interest rates.', interestRate: 8.5 },
];

export function getHomeLoanBankBySlug(slug: string): HomeLoanBankInfo | undefined {
    return HOME_LOAN_BANKS.find((b) => b.slug === slug);
}

export function getAllHomeLoanBankSlugs(): string[] {
    return HOME_LOAN_BANKS.map((b) => b.slug);
}
