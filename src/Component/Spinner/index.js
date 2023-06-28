import React, { useState, useEffect } from 'react';
import './style.css'
function Spinner({className}) {
  const [dots, setDots] = useState(''); // État pour les points du spinner

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => {
        if (dots === '') {
          return `.`;
        } else if (dots === '.') {
          return '..';
        } else if (dots === '..') {
          return '...';
        } else {
          return '';
        }
      });
    }, 500); // Délai de 500 millisecondes (0,5 seconde) entre chaque changement de points

    return () => {
      clearInterval(interval); // Nettoyage de l'intervalle lorsque le composant est démonté
    };
  }, []); // Utilisation d'un tableau de dépendances vide pour exécuter l'effet une seule fois lors du montage

  return (
   <>
   <span className={className}>
    <span className="dot1">{dots.charAt(0)}</span>
    <span className="dot2">{dots.charAt(1)}</span>
    <span className="dot3">{dots.charAt(2)}</span>
    </span>
   </>
  
  );
}

export default Spinner;
