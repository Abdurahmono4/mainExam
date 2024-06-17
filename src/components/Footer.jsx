import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 fixed bottom-0">
      <div className="container-class mx-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0"></div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400">&copy; 2023 Your Company</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
