export interface CreateTransactionInputType {
    role: string | "customer" | "vendor",
    counter_party: string,
    transaction_contract_file: File | null,
    additional_attachments: File[] | null,
    transaction_deadline: Date | null,
    transaction_value: string,
}