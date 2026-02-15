export type SignInFormData = {
  email: string;
  password: string;
  role: "admin" | "technician";
};

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "technician";
};
