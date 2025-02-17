import * as React from "react"
import {
  SquareTerminal,
  Store,
  UsersRound,
  ShoppingBasket
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavMain from "./NavMain"
import NavUser from "./NavUser"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import logo from "@/assets/logo.png"

// This is sample data.
const data = {
  sellerNav: [
    {
      title: "Product Management",
      url: "#",
      icon: ShoppingBasket,
      isActive: false,
      items: [
        {
          title: "Sub Categories",
          url: "/seller/subcategories",
        },
        {
          title: "List Products",
          url: "/seller/listproducts",
        },
        {
          title: "Add Products",
          url: "/seller/addproducts",
        },
      ],
    },
  ],
  adminNav: [
    {
      title: "User Management",
      url: "#",
      icon: UsersRound,
      isActive: false,
      items: [
        {
          title: "Sellers",
          url: "/admin/sellersList",
        },
        {
          title: "Customers",
          url: "/admin/customerList",
        },

      ],
    },
    {
      title: "Product Management",
      url: "#",
      icon: ShoppingBasket,
      isActive: false,
      items: [
        {
          title: "Categories",
          url: "/admin/categoriesList",
        },
        {
          title: "Product List",
          url: "/admin/productsList",
        },

      ],
    },

  ],
}

const AppSidebar = ({ ...props }) => {
  const { saAuth } = useSelector((state) => state.saAuth)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-4">
        <Link to="/dashboard" className="flex items-center gap-2 self-center font-medium">
          <img src={logo} alt="logo" width={150} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {
          saAuth.role === "admin" ?
            <NavMain items={data.adminNav} /> :
            <NavMain items={data.sellerNav} />
        }
      </SidebarContent>
      <SidebarFooter>
        {
          saAuth ?
            <NavUser user={saAuth} /> :
            <Link to="/auth/sa/login">
              <Button className="w-full">Login</Button>
            </Link>
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar