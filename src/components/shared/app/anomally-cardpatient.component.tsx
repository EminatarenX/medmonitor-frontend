import React from 'react';

const AnomalyProbabilityCard = ({ probability }: {probability: number}) => {
  const getProbabilityColor = (prob: number) => {
    if (prob < 0.3) return 'bg-green-500';
    if (prob < 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProbabilityText = (prob: number) => {
    if (prob < 0.3) return 'Baja probabilidad de anomalía';
    if (prob < 0.7) return 'Probabilidad moderada de anomalía';
    return 'Alta probabilidad de anomalía';
  };

  const getRecommendation = (prob: number) => {
    if (prob < 0.3) return 'Continúe con los chequeos regulares.';
    if (prob < 0.7) return 'Se recomienda un seguimiento más cercano.';
    return 'Se requiere atención inmediata y pruebas adicionales.';
  };

  return (
    <div className="bg-neutral-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Probabilidad de Anomalía</h2>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getProbabilityColor(probability)}`}>
          <span className="text-2xl font-bold text-white">{(probability * 100).toFixed(0)}%</span>
        </div>
      </div>
      
      <p className="text-lg text-white mb-4">{getProbabilityText(probability)}</p>
      
      <p className="text-neutral-300 mb-6">{getRecommendation(probability)}</p>
      
      <div className="bg-neutral-700 rounded-lg p-4 flex items-center">
        <img src="/2.svg" alt="Ícono de recomendación" className="w-12 h-12 mr-4" />
        <p className="text-white">
          {probability < 0.5 
            ? "Los datos sugieren una situación estable. Mantenga las prácticas de salud actuales."
            : "Los datos indican la necesidad de una evaluación más profunda. Considere programar pruebas adicionales."}
        </p>
      </div>
    </div>
  );
};

export default AnomalyProbabilityCard;