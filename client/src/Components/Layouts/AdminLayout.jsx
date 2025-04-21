import { AdminNav } from "../UI/Navigation/AdminNavbar";
import { SideBar } from "../UI/Sidebar";

export const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNav />
      
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};