
import React from 'react';
import ServiceCard from './ServiceCard';
import { Wrench, Paintbrush, Droplets, Lightbulb, Ruler, Leaf } from 'lucide-react';

const FeaturedServices: React.FC = () => {
  const services = [
    {
      title: 'Family Plumbing',
      icon: <Wrench className="h-10 w-10 text-prohome-blue" />,
      description: 'Safe and reliable plumbing services for your family home, from leaks to installations.',
      color: 'bg-prohome-light-blue',
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: 'Home Painting',
      icon: <Paintbrush className="h-10 w-10 text-prohome-blue" />,
      description: 'Transform your family spaces with our professional painting services.',
      color: 'bg-prohome-light-blue',
      image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: 'Bathroom Remodel',
      icon: <Droplets className="h-10 w-10 text-prohome-green" />,
      description: 'Create a safe, beautiful bathroom space for your entire family.',
      color: 'bg-prohome-light-green',
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: 'Child-Safe Electrical',
      icon: <Lightbulb className="h-10 w-10 text-prohome-green" />,
      description: 'Licensed electricians focused on safety for your family and home.',
      color: 'bg-prohome-light-green',
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: 'Family Room Remodeling',
      icon: <Ruler className="h-10 w-10 text-prohome-orange" />,
      description: 'Create perfect spaces for family gatherings and everyday living.',
      color: 'bg-prohome-light-orange',
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: 'Kid-Friendly Yards',
      icon: <Leaf className="h-10 w-10 text-prohome-orange" />,
      description: 'Safe, beautiful outdoor spaces where children can play and families can gather.',
      color: 'bg-prohome-light-orange',
      image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Family-Friendly Home Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated professionals for all your family's home service needs. All service providers are verified, background-checked, and family-approved.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              color={service.color}
              image={service.image}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#all-services" className="text-prohome-blue hover:text-prohome-blue/80 font-medium">
            View all family services →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
