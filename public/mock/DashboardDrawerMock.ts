import { Users, ShoppingBag, Gamepad2, Home, } from "lucide-react"
export type MenuDataItem = {
    hrefKey: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuDataItem[];
};

export interface PanelMenuMock {
    text: string;
    icon: any;
    link: string;
    isLogout?: boolean;
    visible: string[];
    isExit?: boolean;
}

export const panelDrawerMock: PanelMenuMock[] = [
  {
    text: "کاربران فعال",
    icon: Users,
    link: "/profile/edit",
    visible: ["admin", "user"],
  },
  {
    text: "محصولات جدید",
    icon: ShoppingBag,
    link: "/profile/agencymanager",
    visible: ["admin", "user"],
  },
  {
    text: "داشبورد",
    icon: Home,
    link: "/",
    visible: ["admin", "user"],
  },
  {
    text: "بازی‌ها",
    icon: Gamepad2,
    link: "/games",
    visible: ["admin"],
  },
];