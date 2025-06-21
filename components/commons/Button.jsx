import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Composant Button réutilisable avec support Tailwind et icônes
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Texte du bouton
 * @param {Function} props.onPress - Fonction à exécuter au clic
 * @param {string} props.variant - Variante du bouton ('primary', 'secondary', 'outline')
 * @param {string} props.size - Taille du bouton ('small', 'medium', 'large')
 * @param {string} props.iconName - Nom de l'icône Ionicons (optionnel)
 * @param {string} props.iconPosition - Position de l'icône ('left', 'right')
 * @param {boolean} props.disabled - État désactivé du bouton
 * @param {string} props.customClass - Classes Tailwind personnalisées
 * @param {Object} props.customStyle - Styles inline personnalisés (fallback)
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  iconName,
  iconPosition = 'right',
  disabled = false,
  customClass = '',
  customStyle = {},
  ...props
}) => {
  // Configuration des variantes avec Tailwind
  const variants = {
    primary: 'bg-blue-500 shadow-lg',
    secondary: 'bg-gray-100',
    outline: 'border-2 border-blue-500 bg-transparent',
    success: 'bg-green-500 shadow-lg',
    warning: 'bg-orange-500 shadow-lg',
    danger: 'bg-red-500 shadow-lg',
  };

  // Configuration des tailles
  const sizes = {
    small: {
      container: 'h-10 px-4 rounded-lg',
      text: 'text-sm font-medium',
      icon: 16,
    },
    medium: {
      container: 'h-12 px-6 rounded-xl',
      text: 'text-base font-semibold',
      icon: 20,
    },
    large: {
      container: 'h-14 px-8 rounded-2xl',
      text: 'text-lg font-bold',
      icon: 24,
    },
  };

  // Configuration des couleurs de texte selon la variante
  const textColors = {
    primary: 'text-white',
    secondary: 'text-gray-700',
    outline: 'text-blue-500',
    success: 'text-white',
    warning: 'text-white',
    danger: 'text-white',
  };

  // Classes de base
  const baseClasses = `
    flex-row items-center justify-center
    ${sizes[size].container}
    ${variants[variant]}
    ${disabled ? 'opacity-50' : 'active:scale-95'}
    ${customClass}
  `.trim().replace(/\s+/g, ' ');

  const textClasses = `
    ${sizes[size].text}
    ${textColors[variant]}
    ${iconName ? (iconPosition === 'left' ? 'ml-2' : 'mr-2') : ''}
  `.trim().replace(/\s+/g, ' ');

  const iconColor = variant === 'outline' ? '#3B82F6' : 'white';
  const iconSize = sizes[size].icon;

  return (
    <TouchableOpacity
      className={baseClasses}
      style={customStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
      {...props}
    >
      {iconName && iconPosition === 'left' && (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}
      
      <Text className={textClasses}>{title}</Text>
      
      {iconName && iconPosition === 'right' && (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};

export default Button;