/**
 * Get initials from a name
 * @param {string} name - The user's name
 * @returns {string} - Initials (up to 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

/**
 * Get role information from user object
 * @param {object} user - The user object
 * @returns {object} - Role information {role, isAdmin, isSeller, isCustomer}
 */
export const getRoleInfo = (user) => {
  const role = user?.role ?? null;
  return {
    role,
    isAdmin: role === "admin",
    isSeller: role === "seller",
    isCustomer: role === "customer",
  };
};

/**
 * Get dashboard route based on user role
 * @param {string} role - The user's role
 * @returns {string} - Dashboard route
 */
export const getDashboardRoute = (role) => {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "seller":
      return "/dashboard/seller";
    case "customer":
    default:
      return "/dashboard/user";
  }
};
