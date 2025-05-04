import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-prohome-blue">
              Aweni
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="font-medium text-gray-600 hover:text-prohome-blue transition-colors">
              Home
            </Link>
            <a href="#services" className="font-medium text-gray-600 hover:text-prohome-blue transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="font-medium text-gray-600 hover:text-prohome-blue transition-colors">
              How It Works
            </a>
            <a href="#professionals" className="font-medium text-gray-600 hover:text-prohome-blue transition-colors">
              Find Pros
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-prohome-orange text-white border-prohome-orange hover:bg-prohome-orange/90 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/auth')}>Join Now</Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-prohome-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a href="#services" className="text-gray-700 hover:text-prohome-blue" onClick={() => setIsMobileMenuOpen(false)}>
                Services
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-prohome-blue" onClick={() => setIsMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#professionals" className="text-gray-700 hover:text-prohome-blue" onClick={() => setIsMobileMenuOpen(false)}>
                Find Pros
              </a>
              <div className="pt-4 flex flex-col space-y-3">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <span className="text-gray-600 px-2">Welcome, {user?.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start flex items-center space-x-2 bg-prohome-orange text-white border-prohome-orange hover:bg-prohome-orange/90 transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <Button className="justify-start" onClick={() => navigate('/auth')}>Join Now</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
