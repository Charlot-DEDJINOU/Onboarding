import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Input from '../commons/Input';
import Button from '../commons/Button';

/**
 * Composant PhoneForm pour la saisie et validation du numéro de téléphone
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.formConfig - Configuration du formulaire depuis les données
 * @param {string} props.buttonVariant - Variante du bouton ('success', 'primary', etc.)
 * @param {Function} props.onSubmit - Callback appelé lors de la soumission réussie
 * @param {Function} props.onError - Callback appelé en cas d'erreur
 * @param {string} props.validationRegex - Regex de validation personnalisée
 * @param {number} props.maxLength - Longueur maximale du numéro
 * @param {string} props.customClass - Classes Tailwind personnalisées
 */
const PhoneForm = ({
  formConfig = {},
  buttonVariant = 'success',
  onSubmit,
  onError,
  validationRegex,
  maxLength = 10,
  customClass = '',
  ...props
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Configuration par défaut
  const defaultConfig = {
    phoneInputPlaceholder: 'Votre numéro de téléphone',
    submitButtonText: 'Préinscription',
    validationMessages: {
      required: 'Numéro requis',
      invalid: 'Format de numéro invalide',
      success: 'Merci ! Votre préinscription avec le numéro {phoneNumber} a été enregistrée avec succès.'
    }
  };

  const config = { ...defaultConfig, ...formConfig };
  const regex = validationRegex || /^01[\\d\\s\\-\\(\\)]{8,}$/;

  // Validation du numéro de téléphone
  const validatePhoneNumber = (phone) => {
    const trimmedPhone = phone.trim();
    
    if (!trimmedPhone) {
      return {
        isValid: false,
        message: config.validationMessages.required
      };
    }

    if (!regex.test(trimmedPhone)) {
      return {
        isValid: false,
        message: config.validationMessages.invalid
      };
    }

    if (trimmedPhone.length > maxLength) {
      return {
        isValid: false,
        message: config.validationMessages.invalid
      };
    }

    return {
      isValid: true,
      message: config.validationMessages.success.replace('{phoneNumber}', trimmedPhone)
    };
  };

  // Gestion de la soumission
  const handleSubmit = () => {
    const validation = validatePhoneNumber(phoneNumber);
    
    if (!validation.isValid) {
      setError(validation.message);
      if (onError) {
        onError(validation.message, phoneNumber);
      } else {
        Alert.alert('Erreur', validation.message);
      }
      return;
    }

    // Réinitialiser l'erreur
    setError('');

    // Callback de succès personnalisé ou alert par défaut
    if (onSubmit) {
      onSubmit(phoneNumber.trim(), validation.message);
    } else {
      Alert.alert(
        'Confirmation',
        validation.message,
        [
          {
            text: 'OK',
            onPress: () => setPhoneNumber(''),
          },
        ]
      );
    }
  };

  // Gestion du changement de texte
  const handleTextChange = (text) => {
    setPhoneNumber(text);
    // Réinitialiser l'erreur lors de la saisie
    if (error) {
      setError('');
    }
  };

  const containerClasses = `
    w-full items-center
    ${customClass}
  `.trim().replace(/\s+/g, ' ');

  return (
    <View className={containerClasses} {...props}>
      {/* Champ de saisie du téléphone */}
      <Input
        placeholder={config.phoneInputPlaceholder}
        value={phoneNumber}
        onChangeText={handleTextChange}
        size="large"
        iconName="call-outline"
        iconPosition="left"
        keyboardType="phone-pad"
        maxLength={maxLength}
        hasError={!!error}
        errorMessage={error}
        customClass="w-80"
      />

      {/* Bouton de soumission */}
      <Button
        title={config.submitButtonText}
        onPress={handleSubmit}
        variant={buttonVariant}
        size="large"
        iconName="checkmark-circle-outline"
        customClass='w-80 mt-5'
      />
    </View>
  );
};

export default PhoneForm;