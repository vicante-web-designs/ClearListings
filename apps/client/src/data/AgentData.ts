export const mockAgents = [
  {
    id: "agent-001",
    name: "Chioma Okafor",
    email: "chioma.okafor@realestate.ng",
    role: "Agent" as const,
    password: "hashed_password_123", // In production, this would be properly hashed
    createdAt: "2023-06-15T08:30:00Z"
  },
  {
    id: "agent-002",
    name: "Oluwaseun Adeyemi",
    email: "seun.adeyemi@realestate.ng",
    role: "Agent" as const,
    password: "hashed_password_456",
    createdAt: "2023-08-22T10:45:00Z"
  },
  {
    id: "agent-003",
    name: "Fatima Bello",
    email: "fatima.bello@realestate.ng",
    role: "Agent" as const,
    password: "hashed_password_789",
    createdAt: "2023-09-10T14:20:00Z"
  },
  {
    id: "agent-004",
    name: "Emeka Nwankwo",
    email: "emeka.nwankwo@realestate.ng",
    role: "Agent" as const,
    password: "hashed_password_012",
    createdAt: "2023-11-05T09:00:00Z"
  },
  {
    id: "admin-001",
    name: "Aisha Mohammed",
    email: "aisha.mohammed@realestate.ng",
    role: "Admin" as const,
    password: "hashed_password_admin",
    createdAt: "2023-05-01T07:00:00Z"
  }
];