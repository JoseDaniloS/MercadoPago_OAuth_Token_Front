export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string; // setor de atuação
}

export interface MercadoPagoIntegration {
  isConnected: boolean;
  access_token: string;
  refresh_token?: string;
  merchant_id?: string;
  public_key?: string;
}

export interface UserPreferences {
  notifications: boolean;
  theme: "light" | "dark";
}

export interface AuthUserDynamo {
  id: string;
  name: string;
  email: string;

  company: Company;

  mp: MercadoPagoIntegration;

  preferences?: UserPreferences;
}

export interface AuthContextData {
  user: AuthUserDynamo | null;
  isLoading: boolean;
  updateUser?: (data: Partial<AuthUserDynamo>) => void;
}