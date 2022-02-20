import Header from "./Header"

const Layout = ({children}:any) => {
  return (
    <div>
        <Header />
        {children}
        <footer className="flex items-center justify-center w-full border-t-2 border-purple-800 h-14 bg-purple-600 static bottom-0 z-50">
          <p className="text-lg font-medium text-white">PetConnect &reg;</p>
        </footer>
    </div>
  )
}

export default Layout