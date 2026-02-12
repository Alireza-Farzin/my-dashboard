import { SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";

export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: "male" | "female";
  age: number;
  image?: string;
}

export const genderOptions: SelectOption[] = [
  { id: 1, label: "آقا", value: "male" },
  { id: 2, label: "خانم", value: "female" },
];
