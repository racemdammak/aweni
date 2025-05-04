import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, DollarSign, Home, Briefcase, MessageSquare, User, Star, CheckCircle2, Menu, X, Filter, Grid, List, Clock, Award, ChevronRight, ChevronDown, SlidersHorizontal, Heart, Loader2, Map, Calendar, Phone, Mail, Globe, Building2, Car, Computer, Paintbrush, Leaf, Wrench, Sparkles, Shield, Languages, GraduationCap } from 'lucide-react';
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
                          pro.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pro.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLocation = !location || pro.distance.includes(location);
      const matchesCategory = selectedCategory === 'all' || pro.category === selectedCategory;
      const matchesServiceType = serviceType === 'all' || 
                               (serviceType === 'home' && pro.category !== 'it') ||
                               (serviceType === 'remote' && pro.category === 'it') ||
                               (serviceType === 'agency' && pro.category === 'realestate');
      
      const price = parseInt(pro.price.replace(/[^0-9]/g, ''));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesLocation && matchesCategory && matchesServiceType && matchesPrice;
    });
  }, [searchQuery, location, selectedCategory, serviceType, priceRange]);

  const sortedProfessionals = useMemo(() => {
    return [...filteredProfessionals].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-asc':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'price-desc':
          return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });
  }, [filteredProfessionals, sortBy]);

  const selectedProfessionalData = useMemo(() => {
    return professionals.find(pro => pro.id === selectedProfessional);
  }, [selectedProfessional]);

  const sortOptions = [
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'distance', label: 'Nearest First' },
  ];

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ContactDialog = () => {
    const selectedPros = professionals.filter(pro => selectedProfessionals.includes(pro.id));
    
    return (
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Contact Selected Professionals</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              {selectedPros.map((pro) => (
                <div key={pro.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={pro.photo} alt={pro.name} />
                        <AvatarFallback className="bg-prohome-blue/10 text-prohome-blue">
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-800">{pro.name}</h3>
                        <p className="text-sm text-gray-600">{pro.category}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSelectedProfessional(pro.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="text-prohome-blue" size={16} />
                      <span className="text-gray-700">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="text-prohome-blue" size={16} />
                      <span className="text-gray-700">{pro.name.toLowerCase().replace(' ', '.')}@example.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-prohome-blue" size={16} />
                      <span className="text-gray-700">{pro.distance} away</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="text-prohome-blue" size={16} />
                      <span className="text-gray-700">{pro.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowContactDialog(false)}
                className="bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
              >
                Close
              </Button>
              <Button
                className="bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
                onClick={() => {
                  // Here you would implement the actual contact functionality
                  alert('Contact request sent to selected professionals!');
                  setShowContactDialog(false);
                }}
              >
                Send Contact Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ProfessionalProfileDialog = () => {
    if (!selectedProfessionalData) return null;

    return (
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">{selectedProfessionalData.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage src={selectedProfessionalData.photo} alt={selectedProfessionalData.name} />
                <AvatarFallback className="bg-prohome-blue/10 text-prohome-blue">
                  {selectedProfessionalData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="text-yellow-400" size={20} />
                  <span className="font-semibold text-gray-800">{selectedProfessionalData.rating}</span>
                  <span className="text-gray-600">({selectedProfessionalData.reviews} reviews)</span>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {selectedProfessionalData.available ? 'Available Now' : 'Not Available'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger 
                    value="overview" 
                    className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-prohome-blue"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="portfolio" 
                    className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-prohome-blue"
                  >
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-prohome-blue"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">About</h3>
                    <p className="text-gray-600">{selectedProfessionalData.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProfessionalData.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Details</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Award className="text-prohome-orange" size={16} />
                        <span className="text-gray-700">{selectedProfessionalData.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-gray-400" size={16} />
                        <span className="text-gray-700">{selectedProfessionalData.distance} away</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-gray-400" size={16} />
                        <span className="text-gray-700">Response: {selectedProfessionalData.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="text-gray-400" size={16} />
                        <span className="text-gray-700">{selectedProfessionalData.price}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="portfolio" className="space-y-4">
                  <div className="space-y-4">
                    {selectedProfessionalData.portfolio.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800">{item}</h4>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="space-y-4">
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Star className="text-yellow-400" size={16} />
                        <span className="font-semibold text-gray-800">5.0</span>
                      </div>
                      <p className="mt-2 text-gray-600">"Excellent service! Very professional and efficient."</p>
                      <p className="text-sm text-gray-500 mt-2">- John D.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-6 flex space-x-4">
                <Button 
                  className="flex-1 bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
                  onClick={() => {
                    toggleSelectedProfessional(selectedProfessionalData.id);
                    setShowProfileDialog(false);
                    setShowContactDialog(true);
                  }}
                >
                  <Phone className="mr-2" size={16} />
                  Contact Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
                  onClick={() => {
                    toggleSelectedProfessional(selectedProfessionalData.id);
                    setShowProfileDialog(false);
                    setShowContactDialog(true);
                  }}
                >
                  <MessageSquare className="mr-2" size={16} />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-prohome-blue">
                Aweni
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-prohome-blue">
                  Home
                </Link>
                <Link to="/categories" className="text-gray-700 hover:text-prohome-blue">
                  Categories
                </Link>
                <Link to="/my-requests" className="text-gray-700 hover:text-prohome-blue">
                  My Requests
                </Link>
                <Link to="/my-profile" className="text-gray-700 hover:text-prohome-blue">
                  My Profile
                </Link>
              </div>
            </div>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-prohome-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/categories"
                  className="text-gray-700 hover:text-prohome-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  to="/my-requests"
                  className="text-gray-700 hover:text-prohome-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Requests
                </Link>
                <Link
                  to="/my-profile"
                  className="text-gray-700 hover:text-prohome-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-prohome-blue to-prohome-blue/90 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Professional</h1>
          <p className="text-lg mb-6 text-white/90">Thousands of qualified professionals at your service</p>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-prohome-blue/30 focus:ring-prohome-blue/20"
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
            >
              <SlidersHorizontal size={16} />
              <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Select */}
              <div>
                <Label className="text-gray-700">Category</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant="outline"
                      className={`${category.color} cursor-pointer hover:opacity-80 ${
                        selectedCategory === category.id ? 'ring-2 ring-prohome-blue' : ''
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.icon}
                      <span className="ml-1">{category.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Location Input */}
              <div>
                <Label className="text-gray-700">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    placeholder="City or ZIP code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-prohome-blue/30 focus:ring-prohome-blue/20"
                  />
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <Label className="text-gray-700">Price Range</Label>
                <div className="mt-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000}
                    step={10}
                    className="[&_[role=slider]]:bg-prohome-blue [&_[role=slider]]:border-prohome-blue"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Service Type Radio Group */}
              <div>
                <Label className="text-gray-700">Service Type</Label>
                <RadioGroup
                  value={serviceType}
                  onValueChange={setServiceType}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" className="border-gray-300 data-[state=checked]:bg-prohome-blue data-[state=checked]:border-prohome-blue" />
                    <Label htmlFor="all" className="text-gray-700">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" className="border-gray-300 data-[state=checked]:bg-prohome-blue data-[state=checked]:border-prohome-blue" />
                    <Label htmlFor="home" className="text-gray-700">At Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remote" id="remote" className="border-gray-300 data-[state=checked]:bg-prohome-blue data-[state=checked]:border-prohome-blue" />
                    <Label htmlFor="remote" className="text-gray-700">Remote</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agency" id="agency" className="border-gray-300 data-[state=checked]:bg-prohome-blue data-[state=checked]:border-prohome-blue" />
                    <Label htmlFor="agency" className="text-gray-700">At Agency</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {sortedProfessionals.length} Professionals Found
          </h2>
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white border-prohome-blue text-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-prohome-blue">
                {sortOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue focus:bg-prohome-blue/10 focus:text-prohome-blue"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="hover:scale-105 transition-transform bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
              >
                <Grid size={20} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="hover:scale-105 transition-transform bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
              >
                <List size={20} />
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
            {sortedProfessionals.map((pro) => (
              <Card key={pro.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={pro.photo} alt={pro.name} />
                        <AvatarFallback className="bg-prohome-blue/10 text-prohome-blue">
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {pro.available && (
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                          <Clock className="text-white" size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-800">{pro.name}</h3>
                          {pro.verified && (
                            <CheckCircle2 className="text-prohome-blue" size={16} />
                          )}
                        </div>
                        <button
                          onClick={() => toggleFavorite(pro.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Heart
                            size={20}
                            className={favorites.includes(pro.id) ? 'text-red-500 fill-red-500' : ''}
                          />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <Star className="text-yellow-400" size={16} />
                        <span>{pro.rating}</span>
                        <span>({pro.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Award className="text-prohome-orange" size={16} />
                        <span>{pro.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="text-gray-400" size={16} />
                        <span>{pro.distance} away</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {pro.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {pro.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="text-gray-400" size={16} />
                          <span>Response: {pro.responseTime}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedProfessional(pro.id);
                            setShowProfileDialog(true);
                          }}
                          className="bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add selected professionals count badge */}
      {selectedProfessionals.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Button
            className="bg-prohome-orange text-white hover:bg-prohome-orange/90"
            onClick={() => setShowContactDialog(true)}
          >
            <MessageSquare className="mr-2" size={16} />
            Contact {selectedProfessionals.length} Professional{selectedProfessionals.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}

      <ProfessionalProfileDialog />
      <ContactDialog />
    </div>
  );
};

export default Dashboard; 