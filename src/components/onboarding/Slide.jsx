import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

/**
 * Composant OnboardingSlide pour afficher une étape d'onboarding
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.item - Données de l'étape d'onboarding
 * @param {React.ReactNode} props.children - Contenu personnalisé (formulaire, etc.)
 * @param {string} props.customClass - Classes Tailwind personnalisées
 */
const OnboardingSlide = ({ 
  item, 
  children, 
  customClass = '' 
}) => {
  // Classes Tailwind pour le fond (avec fallback vers les couleurs legacy)
  const backgroundClass = item.colorClasses?.background || 'bg-gray-50';
  const primaryClass = item.colorClasses?.primary || 'bg-blue-500';
  
  const slideClasses = `
    flex-1 justify-center items-center px-8 pt-12
    ${backgroundClass}
    ${customClass}
  `.trim().replace(/\s+/g, ' ');

  const contentClasses = 'items-center justify-center pt-12';

  const iconContainerClasses = `
    w-30 h-30 rounded-full justify-center items-center mb-10 shadow-lg
    ${primaryClass}
  `.trim().replace(/\s+/g, ' ');

  const titleClasses = 'text-3xl font-bold text-gray-800 text-center mb-3';
  const subtitleClasses = 'text-lg font-semibold text-gray-600 text-center mb-4';
  const descriptionClasses = 'text-base text-gray-700 text-center leading-6 mb-10';

  // Style inline pour la largeur (nécessaire pour le scroll horizontal)
  const slideStyle = {
    width: width,
  };

  // Style inline pour l'icône (fallback si Tailwind ne fonctionne pas)
  const iconContainerStyle = {
    width: 120,
    height: 120,
    backgroundColor: item.legacy?.color || '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  };

  return (
    <View 
      className={slideClasses}
      style={[
        slideStyle,
        { backgroundColor: item.legacy?.backgroundColor || '#F9FAFB' }
      ]}
    >
      <View className={contentClasses}>
        {/* Icône principale */}
        <View 
          className={iconContainerClasses}
          style={iconContainerStyle}
        >
          <Ionicons 
            name={item.icon} 
            size={60} 
            color="white" 
          />
        </View>

        {/* Contenu textuel */}
        <Text className={titleClasses}>
          {item.title}
        </Text>
        
        <Text className={subtitleClasses}>
          {item.subtitle}
        </Text>
        
        <Text className={descriptionClasses}>
          {item.description}
        </Text>

        {/* Contenu personnalisé (formulaire, boutons, etc.) */}
        {children}
      </View>
    </View>
  );
};

export default OnboardingSlide;