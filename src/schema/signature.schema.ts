export type GetSignatureRequestSchema = {
  projectId: String;
  buyerPub: String;
  amount: String;
  price: String;
};

export type GetSignatureResponseSchema = {
  signature: Array<number>;
  recoveryId: number;
  price: number;
};
