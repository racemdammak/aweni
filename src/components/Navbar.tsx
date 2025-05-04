import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User, Menu, X, LogOut, Bell, MessageSquare, Calendar, Heart, Settings, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search professionals..."
                  className="pl-10 w-64"
                />
              </div>

              {/* Navigation Links */}
              <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-prohome-blue">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/bookings" className="flex items-center space-x-2 text-gray-600 hover:text-prohome-blue">
                <Calendar className="h-4 w-4" />
                <span>Bookings</span>
              </Link>
              <Link to="/messages" className="flex items-center space-x-2 text-gray-600 hover:text-prohome-blue">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              <Link to="/favorites" className="flex items-center space-x-2 text-gray-600 hover:text-prohome-blue">
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Link>
            </div>
          ) : (
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
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* Settings */}
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photo} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-gray-500">{user?.accountType}</span>
                  </div>
                </div>

                {/* Logout */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
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
              {isAuthenticated ? (
                <>
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search professionals..."
                      className="pl-10"
                    />
                  </div>

                  {/* Navigation Links */}
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-prohome-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/bookings"
                    className="flex items-center space-x-2 text-gray-700 hover:text-prohome-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Bookings</span>
                  </Link>
                  <Link
                    to="/messages"
                    className="flex items-center space-x-2 text-gray-700 hover:text-prohome-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                  <Link
                    to="/favorites"
                    className="flex items-center space-x-2 text-gray-700 hover:text-prohome-blue"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </Link>

                  {/* User Section */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.photo} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-sm text-gray-500">{user?.accountType}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/settings');
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start mt-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
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
                  <Button className="w-full" onClick={() => navigate('/auth')}>Join Now</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
