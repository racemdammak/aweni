
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle, Phone } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ProviderCardProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  verified: boolean;
  badges: string[];
  services: string[];
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  name,
  image,
  rating,
  reviewCount,
  location,
  verified,
  badges,
  services
}) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} fill="#F97316" className="h-4 w-4 text-prohome-orange" />);
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-prohome-orange">
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" fill="#F97316" />
          <path d="M12 2v15.8l3.2 3.2L17 14.1l5-4.8-7-1L12 2z" fill="none" />
        </svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Provider Image */}
          <div className="md:w-1/4 bg-gray-100 h-48 md:h-auto">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Provider Info */}
          <div className="p-6 md:w-3/4 flex flex-col">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars()}
                  </div>
                  <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" /> {location}
                </div>
                
                {verified && (
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <CheckCircle className="h-4 w-4 mr-1" /> Verified Professional
                  </div>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                <Button className="mb-2 w-full">Request Quote</Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" /> Contact
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-3">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="bg-prohome-light-blue text-prohome-blue border-prohome-blue">
                    {badge}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Services:</span> {services.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
