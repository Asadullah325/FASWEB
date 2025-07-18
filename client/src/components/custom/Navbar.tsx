import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import { HandPlatter, Home, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User2, UtensilsCrossed } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"
import { useUserStore } from "@/store/useUserStore"
import { useCartStore } from "@/store/useCartStore"
import { useThemeStore } from "@/store/useThemeStore"

const Navbar = () => {

  const { user, loading, logout } = useUserStore()
  const { cart } = useCartStore()
  const { setTheme } = useThemeStore()


  return (
    <>
      <div className="flex justify-between items-center p-3 shadow-md bg-white dark:bg-gray-800">
        <Link to={"/"} className="flex items-center space-x-2">
          <img src="/Logo.webp" alt="Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold">FESWEB </h1>
        </Link>
        <div className="hidden md:flex space-x-4 items-center pr-10">
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-gray-700 font-bold hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
              Home
            </Link>
            <Link to="/profile" className="text-gray-700 font-bold hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
              Profile
            </Link>
            <Link to="/order/status" className="text-gray-700 font-bold hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
              My Orders
            </Link>
            {
              user?.isAdmin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="cursor-pointer">Dashboard</MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/resturant" className="text-gray-700 font-bold cursor-pointer hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
                        <MenubarItem className="cursor-pointer">Resturant</MenubarItem>
                      </Link>
                      <Link to="/admin/menu" className="text-gray-700 cursor-pointer font-bold hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
                        <MenubarItem className="cursor-pointer">Menu</MenubarItem>
                      </Link>
                      <Link to="/admin/orders" className="text-gray-700 font-bold cursor-pointer hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
                        <MenubarItem className="cursor-pointer"> Resturant Orders</MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>

              )
            }
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/cart" className="relative text-gray-700 font-bold hover:text-gray-900 dark:text-gray-200 hover:dark:text-white">
              <ShoppingCart className="h-6 w-6" />
              {
                cart.length > 0 && (
                  <Button size={"icon"} className="absolute -top-2 -right-2 w-4 h-4 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full">
                    {cart.length}
                  </Button>
                )
              }
            </Link>
            <Avatar>
              <AvatarImage className="cursor-pointer" src={user?.profilePicture} />
              <AvatarFallback className="cursor-pointer">
                {user?.name ? user?.name.split(" ").map(n => n[0]).join("").toUpperCase() : "CN"}
              </AvatarFallback>
            </Avatar>
            {
              loading ? (
                <Button disabled className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 text-xs rounded focus:outline-none focus:shadow-outline" type="button">
                  <Loader2 className="animate-spin" size={20} />
                  Please Wait...
                </Button>
              ) : (
                <Button onClick={logout} className="font-bold cursor-pointer">
                  Logout
                </Button>
              )
            }
          </div>
        </div>
        <div className="md:hidden flex items-center pr-4">
          {/* Mobile Navbar */}
          <NavbarMobile admin={user?.isAdmin || false} />
        </div>
      </div>
    </>
  )
}

export default Navbar

const NavbarMobile = ({ admin }: { admin: boolean }) => {
  const { loading, logout, user } = useUserStore()
  const { cart } = useCartStore()
  const { setTheme } = useThemeStore()

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="flex flex-col" side="left">
          <SheetHeader className="flex flex-row items-center justify-between p-4 mt-6">
            <SheetTitle className="font-bold">FESWEB</SheetTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetHeader>
          <Separator />
          <SheetDescription className="flex flex-col space-y-3 px-4 text-lg">
            <Link to="/" className="text-gray-700 flex items-center gap-2 font-bold hover:text-gray-900">
              <Home className="h-6 w-6" />
              Home
            </Link>
            <Link to="/profile" className="text-gray-700 flex items-center gap-2 font-bold hover:text-gray-900">
              <User2 className="h-6 w-6" />
              Profile
            </Link>
            <Link to="/order/status" className="text-gray-700 flex items-center gap-2 font-bold hover:text-gray-900">
              <HandPlatter className="h-6 w-6" />
              My Orders
            </Link>
            <Link to="/cart" className="relative flex items-center gap-2 text-gray-700 font-bold hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
              Cart
              <Button size={"icon"} className="absolute top-0 -right-2 w-6 h-6 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full">{cart.length}</Button>
            </Link>
            {
              admin && (
                <>
                  <Link to="/admin/menu" className="text-gray-700 flex items-center gap-2 font-bold hover:text-gray-900">
                    <SquareMenu className="h-6 w-6" />
                    Menu
                  </Link>
                  <Link to="/admin/resturant" className="text-gray-700 flex items-center gap-2 font-bold hover:text-gray-900">
                    <UtensilsCrossed className="h-6 w-6" />
                    Resturant
                  </Link>
                  <Link to="/admin/orders" className="text-gray-700 flex items-center gap-2 font-bold hover:text-gray-900">
                    <PackageCheck className="h-6 w-6" />
                    Resturant Orders
                  </Link>
                </>


              )
            }

          </SheetDescription>
          <SheetFooter>
            <div className="flex items-center">
              <Avatar>
                <AvatarImage className="cursor-pointer" src={user?.profilePicture} />
                <AvatarFallback className="cursor-pointer">
                  {user?.name ? user?.name.split(" ").map(n => n[0]).join("").toUpperCase() : "CN"}
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-2 font-bold">{user?.name}</h2>
            </div>
            {
              loading ? (
                <Button disabled className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 text-xs rounded focus:outline-none focus:shadow-outline" type="button">
                  <Loader2 className="animate-spin" size={20} />
                  Please Wait...
                </Button>
              ) : (
                <Button onClick={logout} className="font-bold cursor-pointer">
                  Logout
                </Button>
              )
            }
          </SheetFooter>
        </SheetContent>
      </Sheet>

    </>
  )
}
