export interface CreateTransactionInputType {
    id?: string,
    role: string | "customer" | "vendor",
    counter_party: string,
    transaction_contract_file: File[] ,
    additional_attachments: File[] ,
    transaction_deadline: Date | undefined,
    transaction_value: { float?: number | undefined, formatted: string | undefined, value: string | undefined },
}