// src/Layout/MainLayout.jsx
import { Navbar } from "../UI/Navigation/Navbar";
import { Footer } from "../UI/Navigation/Footer";
export const MainLayout = ({ children }) => {
    return (
      <div className="md:w-[80%] md:m-auto" >
        <Navbar />
        <main>{children}</main>
     
        <Footer/>
      </div>
    );
  };