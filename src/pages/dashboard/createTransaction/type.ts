export interface CreateTransactionInputType {
    id?: string,
    role: string | "customer" | "vendor",
    counter_party: string,
    transaction_contract_file: File | null,
    additional_attachments: File[] | null,
    transaction_deadline: Date | undefined,
    transaction_value: { float?: number | undefined, formatted: string | undefined, value: string | undefined },
}