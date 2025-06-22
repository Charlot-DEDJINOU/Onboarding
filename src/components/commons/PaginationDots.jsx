import React from 'react';
import { View } from 'react-native';

/**
 * Composant PaginationDots pour afficher les indicateurs de pagination
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.data - Tableau de données pour déterminer le nombre de points
 * @param {number} props.currentIndex - Index actuel de la pagination
 * @param {string} props.activeDotClass - Classes Tailwind pour le point actif
 * @param {string} props.inactiveDotClass - Classes Tailwind pour les points inactifs
 * @param {string} props.containerClass - Classes Tailwind pour le conteneur
 * @param {string} props.dotSize - Taille des points ('small', 'medium', 'large')
 * @param {Function} props.getActiveColor - Fonction pour obtenir la couleur active dynamique
 */
const PaginationDots = ({
  data = [],
  currentIndex = 0,
  activeDotClass = '',
  inactiveDotClass = 'bg-gray-300',
  containerClass = '',
  dotSize = 'medium',
  getActiveColor,
  ...props
}) => {
  // Configuration des tailles
  const sizes = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  };

  // Classes de base pour le conteneur
  const baseContainerClasses = `
    flex-row justify-center items-center py-5
    ${containerClass}
  `.trim().replace(/\s+/g, ' ');

  // Classes de base pour les points
  const baseDotClasses = `
    ${sizes[dotSize]} rounded-full mx-1 transition-all duration-300
  `.trim().replace(/\s+/g, ' ');

  return (
    <View className={baseContainerClasses} {...props}>
      {data.map((_, index) => {
        const isActive = index === currentIndex;
        
        // Déterminer la couleur active
        let activeColorClass = activeDotClass;
        if (getActiveColor && typeof getActiveColor === 'function') {
          activeColorClass = getActiveColor(index, currentIndex);
        }

        // Classes pour chaque point
        const dotClasses = `
          ${baseDotClasses}
          ${isActive ? activeColorClass : inactiveDotClass}
          ${isActive ? 'scale-125' : 'scale-100'}
        `.trim().replace(/\s+/g, ' ');

        // Style inline comme fallback
        const dotStyle = isActive 
          ? { 
              transform: [{ scale: 1.2 }],
              backgroundColor: data[currentIndex]?.legacy?.color || '#3B82F6'
            }
          : { 
              transform: [{ scale: 1 }],
              backgroundColor: '#E5E7EB'
            };

        return (
          <View
            key={index}
            className={dotClasses}
            style={dotStyle}
          />
        );
      })}
    </View>
  );
};

export default PaginationDots;