import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Composant Input réutilisable avec validation et styles Tailwind
 * @param {Object} props - Propriétés du composant
 * @param {string} props.placeholder - Texte de placeholder
 * @param {string} props.value - Valeur actuelle de l'input
 * @param {Function} props.onChangeText - Fonction de changement de texte
 * @param {string} props.variant - Variante de style ('default', 'rounded', 'outline')
 * @param {string} props.size - Taille de l'input ('small', 'medium', 'large')
 * @param {string} props.iconName - Nom de l'icône Ionicons (optionnel)
 * @param {string} props.iconPosition - Position de l'icône ('left', 'right')
 * @param {string} props.label - Label de l'input (optionnel)
 * @param {string} props.errorMessage - Message d'erreur (optionnel)
 * @param {boolean} props.hasError - État d'erreur
 * @param {string} props.customClass - Classes Tailwind personnalisées
 * @param {Object} props.customStyle - Styles inline personnalisés (fallback)
 */
const Input = ({
  placeholder,
  value,
  onChangeText,
  variant = 'default',
  size = 'medium',
  iconName,
  iconPosition = 'left',
  label,
  errorMessage,
  hasError = false,
  customClass = '',
  customStyle = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Configuration des variantes avec Tailwind
  const variants = {
    default: 'border-2 border-gray-200 bg-white',
    rounded: 'border-2 border-gray-200 bg-white rounded-full',
    outline: 'border-2 border-blue-300 bg-transparent',
    filled: 'bg-gray-100 border-0',
  };

  // Configuration des tailles
  const sizes = {
    small: {
      container: 'h-10 px-3 rounded-lg',
      text: 'text-sm',
      icon: 16,
      label: 'text-sm font-medium mb-1',
    },
    medium: {
      container: 'h-12 px-4 rounded-xl',
      text: 'text-base',
      icon: 20,
      label: 'text-base font-medium mb-2',
    },
    large: {
      container: 'h-14 px-5 rounded-2xl',
      text: 'text-lg',
      icon: 24,
      label: 'text-lg font-medium mb-2',
    },
  };

  // États de couleur
  const getStateClasses = () => {
    if (hasError) {
      return 'border-red-500 bg-red-50';
    }
    if (isFocused) {
      return 'border-blue-500 bg-blue-50';
    }
    return variants[variant];
  };

  // Classes de base pour le conteneur
  const containerClasses = `
    flex-row items-center
    ${sizes[size].container}
    ${getStateClasses()}
    ${customClass}
  `.trim().replace(/\s+/g, ' ');

  // Classes pour le TextInput
  const inputClasses = `
    flex-1
    ${sizes[size].text}
    text-gray-800
    ${iconName ? (iconPosition === 'left' ? 'ml-2' : 'mr-2') : ''}
  `.trim().replace(/\s+/g, ' ');

  // Classes pour le label
  const labelClasses = `
    ${sizes[size].label}
    ${hasError ? 'text-red-600' : 'text-gray-700'}
  `.trim().replace(/\s+/g, ' ');

  // Classes pour le message d'erreur
  const errorClasses = 'text-sm text-red-600 mt-1 ml-1';

  // Couleur de l'icône selon l'état
  const getIconColor = () => {
    if (hasError) return '#EF4444';
    if (isFocused) return '#3B82F6';
    return '#6B7280';
  };

  return (
    <View className="w-full">
      {/* Label */}
      {label && (
        <Text className={labelClasses}>{label}</Text>
      )}

      {/* Conteneur de l'input */}
      <View className={containerClasses} style={customStyle}>
        {/* Icône à gauche */}
        {iconName && iconPosition === 'left' && (
          <Ionicons 
            name={iconName} 
            size={sizes[size].icon} 
            color={getIconColor()} 
          />
        )}

        {/* TextInput */}
        <TextInput
          className={inputClasses}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Icône à droite */}
        {iconName && iconPosition === 'right' && (
          <Ionicons 
            name={iconName} 
            size={sizes[size].icon} 
            color={getIconColor()} 
          />
        )}
      </View>

      {/* Message d'erreur */}
      {hasError && errorMessage && (
        <Text className={errorClasses}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;