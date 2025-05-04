import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, Sparkles, GraduationCap, Leaf, Paintbrush, Computer, 
  Car, Building2, Home, Heart, Shield, Star, Clock, Users, Calendar, Camera
} from 'lucide-react';
import { Card } from "@/components/ui/card";

const categories = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: <Wrench size={24} />,
    color: 'bg-blue-100 text-blue-800',
    description: 'Professional plumbing services for your home',
    professionals: 156,
    rating: 4.8
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: <Sparkles size={24} />,
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Certified electricians for all your needs',
    professionals: 143,
    rating: 4.7
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: <GraduationCap size={24} />,
    color: 'bg-green-100 text-green-800',
    description: 'Personal trainers and fitness experts',
    professionals: 98,
    rating: 4.9
  },
  {
    id: 'gardening',
    name: 'Gardening',
    icon: <Leaf size={24} />,
    color: 'bg-emerald-100 text-emerald-800',
    description: 'Landscaping and garden maintenance',
    professionals: 87,
    rating: 4.6
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: <Paintbrush size={24} />,
    color: 'bg-orange-100 text-orange-800',
    description: 'Interior and exterior painting services',
    professionals: 112,
    rating: 4.7
  },
  {
    id: 'it',
    name: 'IT Services',
    icon: <Computer size={24} />,
    color: 'bg-indigo-100 text-indigo-800',
    description: 'Computer repair and tech support',
    professionals: 134,
    rating: 4.8
  },
  {
    id: 'auto',
    name: 'Auto Services',
    icon: <Car size={24} />,
    color: 'bg-red-100 text-red-800',
    description: 'Vehicle maintenance and repair',
    professionals: 121,
    rating: 4.6
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: <Building2 size={24} />,
    color: 'bg-cyan-100 text-cyan-800',
    description: 'Property sales and management',
    professionals: 145,
    rating: 4.7
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: <Home size={24} />,
    color: 'bg-purple-100 text-purple-800',
    description: 'Professional cleaning services',
    professionals: 167,
    rating: 4.8
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: <Heart size={24} />,
    color: 'bg-pink-100 text-pink-800',
    description: 'Health and wellness professionals',
    professionals: 89,
    rating: 4.9
  },
  {
    id: 'security',
    name: 'Security',
    icon: <Shield size={24} />,
    color: 'bg-gray-100 text-gray-800',
    description: 'Security and safety services',
    professionals: 76,
    rating: 4.7
  },
  {
    id: 'education',
    name: 'Education',
    icon: <GraduationCap size={24} />,
    color: 'bg-amber-100 text-amber-800',
    description: 'Tutoring and educational services',
    professionals: 103,
    rating: 4.8
  },
  {
    id: 'design',
    name: 'Interior Design',
    icon: <Home size={24} />,
    color: 'bg-rose-100 text-rose-800',
    description: 'Professional interior design services',
    professionals: 92,
    rating: 4.8
  },
  {
    id: 'technology',
    name: 'Smart Home',
    icon: <Computer size={24} />,
    color: 'bg-violet-100 text-violet-800',
    description: 'Smart home and security systems',
    professionals: 78,
    rating: 4.7
  },
  {
    id: 'petcare',
    name: 'Pet Care',
    icon: <Heart size={24} />,
    color: 'bg-fuchsia-100 text-fuchsia-800',
    description: 'Pet care and training services',
    professionals: 85,
    rating: 4.9
  },
  {
    id: 'hvac',
    name: 'HVAC',
    icon: <Home size={24} />,
    color: 'bg-sky-100 text-sky-800',
    description: 'Heating and cooling services',
    professionals: 112,
    rating: 4.7
  },
  {
    id: 'events',
    name: 'Event Planning',
    icon: <Calendar size={24} />,
    color: 'bg-teal-100 text-teal-800',
    description: 'Professional event planning services',
    professionals: 94,
    rating: 4.8
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: <Camera size={24} />,
    color: 'bg-cyan-100 text-cyan-800',
    description: 'Professional photography services',
    professionals: 106,
    rating: 4.9
  }
];

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Service Categories</h1>
          <p className="text-gray-600">Browse through our wide range of professional services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/dashboard?category=${category.id}`} key={category.id}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-sm text-gray-600">{category.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-600">{category.professionals} pros</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 