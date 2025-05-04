import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, DollarSign, Home, Briefcase, MessageSquare, User, Star, CheckCircle2, Menu, X, Filter, Grid, List, Clock, Award, ChevronRight, ChevronDown, SlidersHorizontal, Heart, Loader2, Map, Calendar, Phone, Mail, Globe, Building2, Car, Computer, Paintbrush, Leaf, Wrench, Sparkles, Shield, Languages, GraduationCap, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [serviceType, setServiceType] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedProfessionals, setSelectedProfessionals] = useState<number[]>([]);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectedProfessional = (id: number) => {
    setSelectedProfessionals(prev => 
      prev.includes(id) 
        ? prev.filter(proId => proId !== id)
        : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Sparkles size={20} />, color: 'bg-gray-100 text-gray-800' },
    { id: 'plumber', name: 'Plumbing', icon: <Wrench size={20} />, color: 'bg-blue-100 text-blue-800' },
    { id: 'electrician', name: 'Electrical', icon: <Sparkles size={20} />, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'coach', name: 'Fitness', icon: <GraduationCap size={20} />, color: 'bg-green-100 text-green-800' },
    { id: 'cleaner', name: 'Cleaning', icon: <Sparkles size={20} />, color: 'bg-purple-100 text-purple-800' },
    { id: 'gardener', name: 'Gardening', icon: <Leaf size={20} />, color: 'bg-emerald-100 text-emerald-800' },
    { id: 'painter', name: 'Painting', icon: <Paintbrush size={20} />, color: 'bg-orange-100 text-orange-800' },
    { id: 'it', name: 'IT Services', icon: <Computer size={20} />, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'auto', name: 'Auto Services', icon: <Car size={20} />, color: 'bg-red-100 text-red-800' },
    { id: 'realestate', name: 'Real Estate', icon: <Building2 size={20} />, color: 'bg-cyan-100 text-cyan-800' },
  ];

  const professionals = [
    {
      id: 1,
      name: 'John Smith',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.8,
      reviews: 124,
      verified: true,
      specialties: ['Plumbing Installation', 'Emergency Repairs', 'Water Heater Services'],
      price: '$50/hr',
      available: true,
      experience: '10+ years',
      distance: '1.5 miles',
      responseTime: 'Within 1 hour',
      description: 'Professional plumber with over 10 years of experience. Specialized in plumbing installations and emergency repairs. Licensed and insured.',
      category: 'plumber',
      languages: ['English', 'Spanish'],
      certifications: ['Master Plumber License', 'EPA Certified'],
      availability: 'Mon-Fri: 8am-6pm, Sat: 9am-2pm',
      portfolio: ['Before/After photos available', 'Customer testimonials'],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.9,
      reviews: 89,
      verified: true,
      specialties: ['Electrical Work', 'Smart Home Installation', 'Panel Upgrades'],
      price: '$60/hr',
      available: true,
      experience: '8+ years',
      distance: '1.1 miles',
      responseTime: 'Within 2 hours',
      description: 'Licensed electrician specializing in smart home installations and electrical renovations. Expert in modern electrical solutions.',
      category: 'electrician',
      languages: ['English', 'French'],
      certifications: ['Master Electrician License', 'Smart Home Certified'],
      availability: 'Mon-Sat: 7am-7pm',
      portfolio: ['Project gallery', 'Customer reviews'],
    },
    {
      id: 3,
      name: 'Michael Chen',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4.7,
      reviews: 156,
      verified: true,
      specialties: ['Fitness Training', 'Nutrition Planning', 'Rehabilitation'],
      price: '$75/hr',
      available: true,
      experience: '12+ years',
      distance: '2.3 miles',
      responseTime: 'Within 24 hours',
      description: 'Certified personal trainer with expertise in strength training and rehabilitation. Customized workout plans for all fitness levels.',
      category: 'coach',
      languages: ['English', 'Mandarin'],
      certifications: ['NASM Certified', 'CPR/AED Certified'],
      availability: 'Mon-Fri: 6am-8pm, Sat: 7am-3pm',
      portfolio: ['Client transformations', 'Training videos'],
    },
    {
      id: 4,
      name: 'Emma Wilson',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9,
      reviews: 203,
      verified: true,
      specialties: ['Deep Cleaning', 'Organization', 'Eco-friendly Products'],
      price: '$45/hr',
      available: true,
      experience: '6+ years',
      distance: '0.8 miles',
      responseTime: 'Within 4 hours',
      description: 'Professional cleaner with expertise in deep cleaning and organization. Uses eco-friendly products and modern cleaning techniques.',
      category: 'cleaner',
      languages: ['English', 'Spanish'],
      certifications: ['Green Cleaning Certified', 'Organization Specialist'],
      availability: 'Mon-Sun: 8am-6pm',
      portfolio: ['Cleaning before/after', 'Client testimonials'],
    },
    {
      id: 5,
      name: 'David Brown',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.8,
      reviews: 98,
      verified: true,
      specialties: ['Landscape Design', 'Garden Maintenance', 'Tree Care'],
      price: '$55/hr',
      available: true,
      experience: '15+ years',
      distance: '1.7 miles',
      responseTime: 'Within 1 day',
      description: 'Expert gardener with extensive experience in landscape design and maintenance. Specializes in sustainable gardening practices.',
      category: 'gardener',
      languages: ['English'],
      certifications: ['Landscape Design Certified', 'Arborist'],
      availability: 'Mon-Sat: 7am-5pm',
      portfolio: ['Garden transformations', 'Design projects'],
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4.9,
      reviews: 145,
      verified: true,
      specialties: ['Interior Painting', 'Exterior Painting', 'Wallpaper Installation'],
      price: '$65/hr',
      available: true,
      experience: '9+ years',
      distance: '2.1 miles',
      responseTime: 'Within 1 day',
      description: 'Professional painter with expertise in both interior and exterior projects. Uses high-quality materials and precise techniques.',
      category: 'painter',
      languages: ['English', 'Spanish'],
      certifications: ['Painting Contractor License', 'Color Consultant'],
      availability: 'Mon-Fri: 8am-6pm, Sat: 9am-2pm',
      portfolio: ['Painting projects', 'Color consultations'],
    },
    {
      id: 7,
      name: 'Robert Taylor',
      photo: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 4.8,
      reviews: 112,
      verified: true,
      specialties: ['Computer Repair', 'Network Setup', 'Data Recovery'],
      price: '$70/hr',
      available: true,
      experience: '11+ years',
      distance: '1.3 miles',
      responseTime: 'Within 2 hours',
      description: 'IT specialist with extensive experience in computer repair and network solutions. Expert in troubleshooting and system optimization.',
      category: 'it',
      languages: ['English', 'German'],
      certifications: ['CompTIA A+', 'Network+ Certified'],
      availability: 'Mon-Sat: 9am-7pm',
      portfolio: ['Service cases', 'Client reviews'],
    },
    {
      id: 8,
      name: 'Maria Garcia',
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 4.9,
      reviews: 167,
      verified: true,
      specialties: ['Auto Repair', 'Maintenance', 'Diagnostics'],
      price: '$80/hr',
      available: true,
      experience: '13+ years',
      distance: '1.9 miles',
      responseTime: 'Within 3 hours',
      description: 'Certified auto mechanic with expertise in modern vehicle systems. Specializes in diagnostics and preventive maintenance.',
      category: 'auto',
      languages: ['English', 'Spanish'],
      certifications: ['ASE Certified', 'Hybrid/Electric Vehicle Specialist'],
      availability: 'Mon-Fri: 7am-6pm, Sat: 8am-2pm',
      portfolio: ['Repair cases', 'Customer testimonials'],
    },
    {
      id: 9,
      name: 'James Wilson',
      photo: 'https://randomuser.me/api/portraits/men/5.jpg',
      rating: 4.7,
      reviews: 134,
      verified: true,
      specialties: ['Property Sales', 'Market Analysis', 'Investment Properties'],
      price: '3% Commission',
      available: true,
      experience: '14+ years',
      distance: '2.5 miles',
      responseTime: 'Within 1 hour',
      description: 'Experienced real estate agent specializing in residential and investment properties. Expert in market analysis and property valuation.',
      category: 'realestate',
      languages: ['English', 'French'],
      certifications: ['Real Estate Broker License', 'Property Management Certified'],
      availability: 'Mon-Sun: 8am-8pm',
      portfolio: ['Property listings', 'Sales history'],
    },
    {
      id: 10,
      name: 'Sophia Martinez',
      photo: 'https://randomuser.me/api/portraits/women/5.jpg',
      rating: 4.9,
      reviews: 178,
      verified: true,
      specialties: ['Interior Design', 'Space Planning', 'Color Consultation'],
      price: '$85/hr',
      available: true,
      experience: '8+ years',
      distance: '1.2 miles',
      responseTime: 'Within 2 hours',
      description: 'Creative interior designer with expertise in modern and contemporary spaces. Specializes in space optimization and color psychology.',
      category: 'design',
      languages: ['English', 'Spanish'],
      certifications: ['NCIDQ Certified', 'LEED Green Associate'],
      availability: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm',
      portfolio: ['Residential projects', 'Commercial spaces']
    },
    {
      id: 11,
      name: 'Daniel Kim',
      photo: 'https://randomuser.me/api/portraits/men/6.jpg',
      rating: 4.8,
      reviews: 145,
      verified: true,
      specialties: ['Smart Home Installation', 'Security Systems', 'Home Automation'],
      price: '$75/hr',
      available: true,
      experience: '6+ years',
      distance: '2.0 miles',
      responseTime: 'Within 4 hours',
      description: 'Expert in smart home technology and security systems. Certified in major home automation platforms.',
      category: 'technology',
      languages: ['English', 'Korean'],
      certifications: ['Smart Home Pro', 'Security Systems Expert'],
      availability: 'Mon-Sun: 8am-8pm',
      portfolio: ['Smart home installations', 'Security system setups']
    },
    {
      id: 12,
      name: 'Olivia Thompson',
      photo: 'https://randomuser.me/api/portraits/women/6.jpg',
      rating: 4.9,
      reviews: 203,
      verified: true,
      specialties: ['Pet Care', 'Dog Training', 'Pet Sitting'],
      price: '$45/hr',
      available: true,
      experience: '5+ years',
      distance: '0.5 miles',
      responseTime: 'Within 1 hour',
      description: 'Professional pet care specialist with extensive experience in dog training and pet sitting services.',
      category: 'petcare',
      languages: ['English'],
      certifications: ['Certified Dog Trainer', 'Pet First Aid'],
      availability: 'Mon-Sun: 7am-9pm',
      portfolio: ['Training success stories', 'Pet care services']
    },
    {
      id: 13,
      name: 'William Chen',
      photo: 'https://randomuser.me/api/portraits/men/7.jpg',
      rating: 4.7,
      reviews: 98,
      verified: true,
      specialties: ['HVAC Installation', 'System Maintenance', 'Energy Efficiency'],
      price: '$90/hr',
      available: true,
      experience: '12+ years',
      distance: '1.8 miles',
      responseTime: 'Within 3 hours',
      description: 'HVAC specialist with expertise in system installation and energy-efficient solutions.',
      category: 'hvac',
      languages: ['English', 'Mandarin'],
      certifications: ['HVAC Master License', 'Energy Star Certified'],
      availability: 'Mon-Fri: 7am-5pm',
      portfolio: ['Installation projects', 'Energy savings reports']
    },
    {
      id: 14,
      name: 'Ava Rodriguez',
      photo: 'https://randomuser.me/api/portraits/women/7.jpg',
      rating: 4.8,
      reviews: 156,
      verified: true,
      specialties: ['Event Planning', 'Wedding Coordination', 'Corporate Events'],
      price: '$100/hr',
      available: true,
      experience: '7+ years',
      distance: '1.5 miles',
      responseTime: 'Within 24 hours',
      description: 'Professional event planner specializing in weddings and corporate events. Known for attention to detail and creative solutions.',
      category: 'events',
      languages: ['English', 'Spanish'],
      certifications: ['Certified Event Planner', 'Wedding Planning Specialist'],
      availability: 'Mon-Sun: 9am-9pm',
      portfolio: ['Event galleries', 'Client testimonials']
    },
    {
      id: 15,
      name: 'Ethan Wilson',
      photo: 'https://randomuser.me/api/portraits/men/8.jpg',
      rating: 4.9,
      reviews: 189,
      verified: true,
      specialties: ['Photography', 'Portrait Sessions', 'Event Photography'],
      price: '$120/hr',
      available: true,
      experience: '9+ years',
      distance: '1.3 miles',
      responseTime: 'Within 1 day',
      description: 'Professional photographer specializing in portraits and event coverage. Expert in both studio and outdoor photography.',
      category: 'photography',
      languages: ['English'],
      certifications: ['Professional Photographer', 'Adobe Certified Expert'],
      availability: 'Mon-Sun: 8am-8pm',
      portfolio: ['Photo galleries', 'Client reviews']
    }
  ];

  const filteredProfessionals = useMemo(() => {
    return professionals.filter(pro => {
      const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || pro.category === selectedCategory;
      const matchesPrice = parseFloat(pro.price.replace('$', '').replace('/hr', '')) >= priceRange[0] && 
                          parseFloat(pro.price.replace('$', '').replace('/hr', '')) <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });
  }, [professionals, searchQuery, selectedCategory, priceRange, sortBy]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-48 w-full rounded-lg mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      ))}
    </div>
  );

  const ContactDialog = () => (
    <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Professional</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={professionals.find(p => p.id === selectedProfessional)?.photo} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{professionals.find(p => p.id === selectedProfessional)?.name}</h3>
              <p className="text-sm text-gray-500">{professionals.find(p => p.id === selectedProfessional)?.category}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ProfessionalProfileDialog = () => (
    <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Professional Profile</DialogTitle>
        </DialogHeader>
        {selectedProfessional && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={professionals.find(p => p.id === selectedProfessional)?.photo} />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{professionals.find(p => p.id === selectedProfessional)?.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{professionals.find(p => p.id === selectedProfessional)?.rating}</span>
                  <span className="text-gray-500">({professionals.find(p => p.id === selectedProfessional)?.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">
                    {professionals.find(p => p.id === selectedProfessional)?.category}
                  </Badge>
                  {professionals.find(p => p.id === selectedProfessional)?.verified && (
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">About</h4>
                <p className="text-gray-600">{professionals.find(p => p.id === selectedProfessional)?.description}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {professionals.find(p => p.id === selectedProfessional)?.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Availability</h4>
                <p className="text-gray-600">{professionals.find(p => p.id === selectedProfessional)?.availability}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {professionals.find(p => p.id === selectedProfessional)?.languages.map((language, index) => (
                    <Badge key={index} variant="outline">{language}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProfileDialog(false)}>Close</Button>
              <Button onClick={() => {
                setShowProfileDialog(false);
                setShowContactDialog(true);
              }}>Contact</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              <h1 className="text-2xl font-bold text-prohome-blue">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search professionals..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center">
                            <span className={`mr-2 ${category.color} p-1 rounded`}>
                              {category.icon}
                            </span>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000}
                    step={10}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex overflow-x-auto gap-2 pb-4">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex items-center space-x-2 ${selectedCategory === category.id ? category.color : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Professionals Grid/List */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProfessionals.map(professional => (
              <Card key={professional.id} className="overflow-hidden">
                <div className="relative p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-white">
                      <AvatarImage src={professional.photo} />
                      <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{professional.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{professional.rating}</span>
                            <span className="text-gray-500">({professional.reviews} reviews)</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{professional.category}</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{professional.distance} away</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>{professional.price}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{professional.responseTime}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setSelectedProfessional(professional.id);
                            setShowProfileDialog(true);
                          }}
                        >
                          View Profile
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => {
                            setSelectedProfessional(professional.id);
                            setShowContactDialog(true);
                          }}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(professional.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(professional.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                      }`}
                    />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <ContactDialog />
      <ProfessionalProfileDialog />
    </div>
  );
};

export default Dashboard; 