
import React from 'react';
import { Search, ClipboardCheck, Calendar, Star } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: 'Find Family Services',
      description: 'Search for the service your family needs and browse local, trusted professionals.',
      bgColor: 'bg-prohome-blue',
      image:  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-white" />,
      title: 'Compare Safe Options',
      description: 'Review prices, ratings, and detailed profiles of family-approved professionals.',
      bgColor: 'bg-prohome-green',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      icon: <Calendar className="h-10 w-10 text-white" />,
      title: 'Book Around Your Schedule',
      description: 'Schedule appointments that work with your busy family calendar.',
      bgColor: 'bg-prohome-orange',
      image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      icon: <Star className="h-10 w-10 text-white" />,
      title: 'Share Your Experience',
      description: 'Help other families find quality service by sharing your feedback.',
      bgColor: 'bg-prohome-blue',
      image: 'https://images.unsplash.com/photo-1516146544193-b54a65682f16?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How Aweni Works for Families</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finding and hiring qualified family-friendly professionals has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {step.image && (
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`rounded-full p-5 mb-6 ${step.bgColor}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
