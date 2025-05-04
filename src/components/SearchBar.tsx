
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { service, location });
    // In a real app, this would navigate to search results
  };

  return (
    <form onSubmit={handleSubmit} className={`${className || ''} flex flex-col md:flex-row gap-3`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10 h-12 bg-white"
          placeholder="What service do you need?"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10 h-12 bg-white"
          placeholder="Your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Button type="submit" className="h-12 px-6 bg-prohome-orange hover:bg-prohome-orange/90">
        Find Pros
      </Button>
    </form>
  );
};

export default SearchBar;
