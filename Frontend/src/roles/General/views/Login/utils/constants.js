import { Shield, Store, Users } from "lucide-react";

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
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    description: "Manage the platform",
  },
];

export const INITIAL_FORM_DATA = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
  address: "",
};
