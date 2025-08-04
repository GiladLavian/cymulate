import {
  IconFish,
  IconFishHook,
  IconLayoutDashboard,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Phishing",
    icon: IconFish,
    href: "/phishing",
  },
  {
    id: uniqueId(),
    title: "Create Phishing",
    icon: IconFishHook,
    href: "/create-phishing",
  },
];

export default Menuitems;
