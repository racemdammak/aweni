import React from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  CreditCard, Bell, Lock, HelpCircle, LogOut 
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const MyProfile: React.FC = () => {
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: 'January 2023',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    membership: 'Premium',
    requests: 12,
    reviews: 8,
    rating: 4.8
  };

  const menuItems = [
    { icon: <User size={20} />, label: 'Personal Information', href: '#' },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', href: '#' },
    { icon: <Bell size={20} />, label: 'Notifications', href: '#' },
    { icon: <Lock size={20} />, label: 'Security', href: '#' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', href: '#' },
    { icon: <LogOut size={20} />, label: 'Logout', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.photo} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <Badge variant="secondary" className="mt-2 bg-prohome-blue/10 text-prohome-blue">
                  {user.membership} Member
                </Badge>
                <div className="grid grid-cols-3 gap-4 mt-6 w-full">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{user.requests}</div>
                    <div className="text-sm text-gray-600">Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{user.reviews}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{user.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-gray-800">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="text-gray-800">{user.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="text-gray-800">{user.location}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">Member Since</div>
                    <div className="text-gray-800">{user.joinDate}</div>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full bg-prohome-blue hover:bg-prohome-blue/90">
                Edit Profile
              </Button>
            </Card>
          </div>

          {/* Settings Menu */}
          <div className="md:col-span-3">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start space-x-3 text-gray-700 hover:bg-gray-100"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile; 