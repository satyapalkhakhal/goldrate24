export interface BankInfo {
    slug: string;
    name: string;
    description: string;
}

const BANKS: BankInfo[] = [
    { slug: 'sbi', name: 'SBI', description: 'Calculate SBI Mutual Fund SIP returns. Plan your SBI SIP investment with our free online calculator.' },
    { slug: 'hdfc', name: 'HDFC', description: 'Calculate HDFC Mutual Fund SIP returns. Plan your HDFC SIP investment with our free online calculator.' },
    { slug: 'icici', name: 'ICICI Prudential', description: 'Calculate ICICI Prudential Mutual Fund SIP returns. Plan your ICICI SIP investment with our free calculator.' },
    { slug: 'axis', name: 'Axis', description: 'Calculate Axis Mutual Fund SIP returns. Plan your Axis SIP investment with our free online calculator.' },
    { slug: 'kotak', name: 'Kotak', description: 'Calculate Kotak Mutual Fund SIP returns. Plan your Kotak SIP investment with our free online calculator.' },
    { slug: 'nippon', name: 'Nippon India', description: 'Calculate Nippon India Mutual Fund SIP returns. Plan your SIP investment with our free calculator.' },
    { slug: 'tata', name: 'Tata', description: 'Calculate Tata Mutual Fund SIP returns. Plan your Tata SIP investment with our free online calculator.' },
    { slug: 'dsp', name: 'DSP', description: 'Calculate DSP Mutual Fund SIP returns. Plan your DSP SIP investment with our free online calculator.' },
    { slug: 'groww', name: 'Groww', description: 'Calculate Groww SIP returns. Plan your Groww SIP investment with our free online calculator.' },
    { slug: 'zerodha', name: 'Zerodha', description: 'Calculate Zerodha SIP returns. Plan your Zerodha SIP investment with our free online calculator.' },
];

export function getBankBySlug(slug: string): BankInfo | undefined {
    return BANKS.find((b) => b.slug === slug);
}

export function getAllBankSlugs(): string[] {
    return BANKS.map((b) => b.slug);
}
