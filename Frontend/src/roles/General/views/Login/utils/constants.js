import { Store, Users } from "lucide-react";

export const ROLES = [
  {
    id: "customer",
    name: "Customer",
    icon: Users,
    description: "Browse and buy car parts",
  },
  {
    id: "seller",
    name: "Seller",
    icon: Store,
    description: "Sell your car parts",
  },
  // Admin role removed - admin is created automatically on server startup
];

export const INITIAL_FORM_DATA = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
  address: "",
};
