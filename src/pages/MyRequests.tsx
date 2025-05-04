import React from 'react';
import { 
  Clock, CheckCircle2, XCircle, AlertCircle, 
  MessageSquare, Phone, Calendar, MapPin, DollarSign 
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const requests = [
  {
    id: 1,
    professional: {
      name: 'John Smith',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      category: 'Plumbing'
    },
    service: 'Emergency Pipe Repair',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'pending',
    price: '$120',
    location: '123 Main St, City',
    description: 'Water pipe burst in the kitchen, need immediate repair'
  },
  {
    id: 2,
    professional: {
      name: 'Sarah Johnson',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
      category: 'Electrical'
    },
    service: 'Lighting Installation',
    date: '2024-03-14',
    time: '2:00 PM',
    status: 'completed',
    price: '$85',
    location: '123 Main St, City',
    description: 'Install new LED lights in living room'
  },
  {
    id: 3,
    professional: {
      name: 'Michael Chen',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      category: 'Fitness'
    },
    service: 'Personal Training Session',
    date: '2024-03-16',
    time: '9:00 AM',
    status: 'scheduled',
    price: '$75',
    location: 'Home Gym',
    description: 'One-hour personal training session'
  },
  {
    id: 4,
    professional: {
      name: 'Emma Wilson',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      category: 'Cleaning'
    },
    service: 'Deep Cleaning',
    date: '2024-03-13',
    time: '11:00 AM',
    status: 'cancelled',
    price: '$150',
    location: '123 Main St, City',
    description: 'Full house deep cleaning service'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusIcons = {
  pending: <Clock className="text-yellow-500" size={16} />,
  completed: <CheckCircle2 className="text-green-500" size={16} />,
  scheduled: <AlertCircle className="text-blue-500" size={16} />,
  cancelled: <XCircle className="text-red-500" size={16} />
};

const MyRequests: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Requests</h1>
          <p className="text-gray-600">Track and manage your service requests</p>
        </div>

        <div className="space-y-6">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={request.professional.photo} alt={request.professional.name} />
                    <AvatarFallback>{request.professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-800">{request.professional.name}</h3>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {request.professional.category}
                      </Badge>
                    </div>
                    <h4 className="text-md font-medium text-gray-700 mt-1">{request.service}</h4>
                    <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-600">{request.date} at {request.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-600">{request.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-600">{request.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-4">
                  <Badge className={`${statusColors[request.status]} flex items-center space-x-1`}>
                    {statusIcons[request.status]}
                    <span className="capitalize">{request.status}</span>
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue">
                      <MessageSquare className="mr-2" size={16} />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white text-prohome-blue border-prohome-blue hover:bg-prohome-blue/10 hover:text-prohome-blue">
                      <Phone className="mr-2" size={16} />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRequests; 