export type FileWithExtension = {
    key: string;
    extension: string;
    url: string;
    file: File;  // Adding the actual File object
};

export type FileUploadApiResponse = {
    key: string;
    extension: string;
    url: string;
};

export interface CreateTransactionInputType {
    id?: string,
    role: string | "customer" | "vendor",
    counter_party: string,
    transaction_contract_file: FileWithExtension[] ,
    additional_attachments: File[] ,
    transaction_deadline: Date | undefined,
    transaction_value: { float?: number | undefined, formatted: string | undefined, value: string | undefined },
}