
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string; // Background color class
  image?: string; // Optional image URL
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, description, color, image }) => {
  return (
    <Card className="service-card overflow-hidden border-none shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col items-center text-center">
          {image && (
            <div className="w-full h-40 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className={`w-full py-6 ${color}`}>
            <div className="mx-auto flex justify-center">
              {icon}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
