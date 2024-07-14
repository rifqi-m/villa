import { getVillaOptions, newsEventsChildMenus } from "@/data/navigation";
import ncNanoId from "@/utils/ncNanoId";
import { map } from "lodash";
import NavigationItem from "./NavigationItem";

function Navigation() {
  const { data: options, isLoading, isError } = getVillaOptions();
  const navigationItems = [
    {
      id: ncNanoId(),
      href: "/",
      name: "Home",
      type: "megaMenu",
      isNew: true,
    },
    {
      id: ncNanoId(),
      href: "#",
      name: "VILLAS & SUITES",
      type: "dropdown",
      children: map(options, (item) => ({
        id: ncNanoId(),
        href: `/listing-villa-detail/${item.id}`,
        name: item.title,
        type: "megaMenu",
        isNew: true,
      })),
    },
    {
      id: ncNanoId(),
      href: "/restaurant",
      name: "Restaurant",
    },
    {
      id: ncNanoId(),
      href: "#",
      name: "NEWS & EVENTS",
      type: "dropdown",
      children: newsEventsChildMenus,
    },
    {
      id: ncNanoId(),
      href: "/about",
      name: "About",
    },
    {
      id: ncNanoId(),
      href: "/contact",
      name: "Contact",
    },
    {
      id: ncNanoId(),
      href: "/faq",
      name: "FAQ",
    },
  ];
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:space-x-1 relative">
      {map(navigationItems, (item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
