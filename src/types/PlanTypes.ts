interface FreeTrial {
  frequency: number;
  frequency_type: "days" | "months";
}

export interface Plan {
  id: string;
  reason: string;
  auto_recurring: {
    transaction_amount: number;
    frequency: number;
    frequency_type: "days" | "months";
    free_trial?: FreeTrial;
  };
  repetitions?: number;
  status: "active" | "inactive";
  subscribers: number;
  mrr: number;
  date_created: string;
}
