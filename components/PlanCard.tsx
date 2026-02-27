import React from 'react';
import { Plan } from '../types';
import { Check, Zap, Tv, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const isRecommended = plan.recommended;

  return (
    <div className={`relative group flex flex-col h-full bg-white rounded-3xl transition-all duration-300 ${
      isRecommended 
        ? 'border-2 border-brand-orange shadow-xl shadow-orange-500/10 scale-105 z-10' 
        : 'border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
    }`}>
      {isRecommended && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-orange to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
          <Star size={12} fill="currentColor" /> Most Popular
        </div>
      )}
      
      <div className="p-8 flex-grow">
        <h3 className={`text-lg font-bold mb-2 uppercase tracking-wide ${isRecommended ? 'text-brand-orange' : 'text-gray-500'}`}>
          {plan.name}
        </h3>
        <div className="flex items-baseline mb-6">
          <span className="text-5xl font-extrabold text-gray-900">₹{plan.price}</span>
          <span className="text-gray-500 ml-2 font-medium">/month</span>
        </div>
        
        <div className={`flex items-center gap-2 mb-8 px-4 py-3 rounded-xl w-full ${
          isRecommended ? 'bg-orange-50 text-orange-700' : 'bg-gray-50 text-gray-700'
        }`}>
            <Zap size={20} className={isRecommended ? 'fill-brand-orange text-brand-orange' : ''} />
            <span className="font-bold text-lg">{plan.speed} Speed</span>
        </div>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <div className="p-1 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-gray-600 font-medium">{plan.data} Data</span>
          </li>
          <li className="flex items-start">
            <div className="p-1 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-gray-600 font-medium">Free Dual-Band Router</span>
          </li>
           {plan.ottBenefits.length > 0 && (
             <li className="flex items-start">
                <div className="p-1 rounded-full bg-orange-100 text-brand-orange mr-3 flex-shrink-0 mt-0.5">
                  <Tv size={14} strokeWidth={3} />
                </div>
                <div className="text-gray-600 text-sm">
                  <span className="font-bold text-gray-800">Includes:</span> {plan.ottBenefits.join(', ')}
                </div>
             </li>
           )}
        </ul>
      </div>

      <div className="p-8 pt-0 mt-auto">
        <Link 
          to={`/book?plan=${plan.id}`}
          className={`block w-full py-4 px-6 rounded-xl text-center font-bold transition-all duration-300 ${
            isRecommended 
              ? 'bg-gradient-to-r from-brand-orange to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02]' 
              : 'bg-white text-gray-900 border-2 border-gray-100 hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50'
          }`}
        >
          {isRecommended ? 'Get Best Value' : 'Choose Plan'}
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;