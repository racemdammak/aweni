import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Home, Briefcase, MessageSquare, User, Star, CheckCircle2, Menu, X, Filter, Grid, List, Clock, Award, ChevronRight, ChevronDown, SlidersHorizontal, Heart, Loader2, Map, Calendar, Phone, Mail, Globe, Building2, Car, Computer, Paintbrush, Leaf, Wrench, Sparkles, Shield, Languages, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useAuth();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    setIsLoading(false);
  }, []);

  // Mock data for all professionals
  const allProfessionals = [
    {
      id: 1,
      name: 'John Smith',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.8,
      reviews: 124,
      category: 'Plumbing',
      price: '$50/hr',
      distance: '1.5 miles',
      responseTime: 'Within 1 hour',
      specialties: ['Plumbing Installation', 'Emergency Repairs', 'Water Heater Services'],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.9,
      reviews: 89,
      category: 'Electrical',
      price: '$60/hr',
      distance: '1.1 miles',
      responseTime: 'Within 2 hours',
      specialties: ['Electrical Work', 'Smart Home Installation', 'Panel Upgrades'],
    },
    {
      id: 3,
      name: 'Michael Chen',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4.7,
      reviews: 156,
      category: 'Fitness',
      price: '$75/hr',
      distance: '2.3 miles',
      responseTime: 'Within 24 hours',
      specialties: ['Fitness Training', 'Nutrition Planning', 'Rehabilitation'],
    },
    {
      id: 4,
      name: 'Emily Wilson',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9,
      reviews: 178,
      category: 'Cleaning',
      price: '$35/hr',
      distance: '1.8 miles',
      responseTime: 'Within 2 hours',
      specialties: ['House Cleaning', 'Deep Cleaning', 'Move-in/Move-out Cleaning'],
    },
    {
      id: 5,
      name: 'David Brown',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.8,
      reviews: 92,
      category: 'Gardening',
      price: '$55/hr',
      distance: '2.1 miles',
      responseTime: 'Within 24 hours',
      specialties: ['Landscape Design', 'Garden Maintenance', 'Tree Care'],
    },
    {
      id: 6,
      name: 'Sophia Martinez',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4.9,
      reviews: 145,
      category: 'Painting',
      price: '$45/hr',
      distance: '1.6 miles',
      responseTime: 'Within 3 hours',
      specialties: ['Interior Painting', 'Wallpaper Installation', 'Ceiling Painting'],
    },
    {
      id: 7,
      name: 'Robert Taylor',
      photo: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 4.7,
      reviews: 112,
      category: 'IT',
      price: '$70/hr',
      distance: '2.5 miles',
      responseTime: 'Within 4 hours',
      specialties: ['Computer Repair', 'Network Setup', 'Software Installation'],
    },
    {
      id: 8,
      name: 'Jessica Davis',
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 4.8,
      reviews: 135,
      category: 'Auto',
      price: '$65/hr',
      distance: '2.2 miles',
      responseTime: 'Within 3 hours',
      specialties: ['Auto Repair', 'Oil Change', 'Tire Service'],
    },
    {
      id: 9,
      name: 'William Anderson',
      photo: 'https://randomuser.me/api/portraits/men/5.jpg',
      rating: 4.9,
      reviews: 165,
      category: 'Real Estate',
      price: '$80/hr',
      distance: '1.9 miles',
      responseTime: 'Within 24 hours',
      specialties: ['Real Estate Photography', 'Virtual Tours', 'Property Staging'],
    },
    {
      id: 10,
      name: 'Lisa Thompson',
      photo: 'https://randomuser.me/api/portraits/women/5.jpg',
      rating: 4.8,
      reviews: 98,
      category: 'Interior Design',
      price: '$85/hr',
      distance: '1.4 miles',
      responseTime: 'Within 2 hours',
      specialties: ['Interior Design', 'Space Planning', 'Color Consultation'],
    },
    {
      id: 11,
      name: 'Daniel Kim',
      photo: 'https://randomuser.me/api/portraits/men/6.jpg',
      rating: 4.9,
      reviews: 142,
      category: 'Smart Home',
      price: '$75/hr',
      distance: '1.7 miles',
      responseTime: 'Within 3 hours',
      specialties: ['Smart Home Installation', 'Security Systems', 'Home Automation'],
    },
    {
      id: 12,
      name: 'Olivia Wilson',
      photo: 'https://randomuser.me/api/portraits/women/6.jpg',
      rating: 4.7,
      reviews: 156,
      category: 'Pet Care',
      price: '$40/hr',
      distance: '1.2 miles',
      responseTime: 'Within 1 hour',
      specialties: ['Pet Care', 'Dog Training', 'Pet Sitting'],
    }
  ];

  // Filter professionals to show only favorited ones
  const favoriteProfessionals = allProfessionals.filter(professional => 
    user?.favorites?.includes(professional.id)
  );

  const handleFavoriteToggle = (id: number) => {
    if (user === null) return;
    toggleFavorite(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="mt-2 text-gray-600">Your saved professionals</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-full h-16 rounded-lg" />
            ))}
          </div>
        ) : (
          favoriteProfessionals.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
              <p className="mt-1 text-gray-500">Start adding professionals to your favorites list</p>
              <Button className="mt-4" variant="outline">
                Browse Professionals
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProfessionals.map((professional) => (
                <Card key={professional.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16 border-2 border-white">
                        <AvatarImage src={professional.photo} />
                        <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{professional.name}</h3>
                          <Badge variant="secondary">{professional.category}</Badge>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{professional.rating}</span>
                            <span className="text-gray-500">({professional.reviews} reviews)</span>
                          </div>
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
                          <Button variant="outline" className="flex-1">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button className="flex-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={() => handleFavoriteToggle(professional.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isFavorite(professional.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )
        )}
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Professional Profile</DialogTitle>
          </DialogHeader>
          {/* Add profile content here */}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Professional</DialogTitle>
          </DialogHeader>
          {/* Add contact form here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Favorites;
