import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';

// Import des composants réutilisables
import OnboardingSlide from '../components/onboarding/Slide';
import PhoneForm from '../components/onboarding/PhoneForm';
import PaginationDots from '../components/commons/PaginationDots';
import Button from '../components/commons/Button';

// Import des données
import onboardingDataJson from '../data/Onboarding.json';
import { ToastSuccess, ToastWarning } from '../utils/Toast';

const { width } = Dimensions.get('window');

/**
 * Écran d'onboarding principal utilisant des composants modulaires
 */
const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Récupération des données et paramètres
  const { onboardingSteps, settings } = onboardingDataJson;
  const animationDuration = settings.animationDuration || 300;

  // Animation de transition entre les écrans
  const animateTransition = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Navigation vers l'écran suivant
  const goToNext = () => {
    if (currentIndex < onboardingSteps.length - 1) {
      const nextIndex = currentIndex + 1;
      navigateToIndex(nextIndex);
    }
  };

  // Navigation vers l'écran précédent
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      navigateToIndex(prevIndex);
    }
  };

  // Navigation vers un index spécifique
  const navigateToIndex = (index) => {
    setCurrentIndex(index);
    animateTransition();
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  // Gestion du scroll manuel
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex && index >= 0 && index < onboardingSteps.length) {
      setCurrentIndex(index);
    }
  };

  // Gestion de la soumission du formulaire de téléphone
  const handlePhoneSubmit = (phoneNumber, successMessage) => {
    ToastSuccess(successMessage);
  };

  // Gestion des erreurs du formulaire
  const handlePhoneError = (errorMessage, phoneNumber) => {
    ToastWarning(errorMessage);
  };

  // Fonction pour obtenir la couleur active des points de pagination
  const getActiveDotColor = (index, currentIdx) => {
    if (index === currentIdx && onboardingSteps[currentIdx]?.colorClasses?.primary) {
      return onboardingSteps[currentIdx].colorClasses.primary;
    }
    return 'bg-blue-500'; // Couleur par défaut
  };

  // Rendu d'un écran d'onboarding
  const renderOnboardingSlide = (item, index) => (
    <OnboardingSlide key={item.id} item={item}>
      {/* Formulaire de préinscription pour le dernier écran */}
      {item.isLast && (
        <PhoneForm
          formConfig={item.form}
          buttonVariant="success"
          onSubmit={handlePhoneSubmit}
          onError={handlePhoneError}
          validationRegex={new RegExp(settings.phoneValidationRegex)}
          maxLength={settings.maxPhoneLength}
          customClass="w-full max-w-sm"
        />
      )}
    </OnboardingSlide>
  );

  const currentStep = onboardingSteps[currentIndex];
  const isLastStep = currentIndex === onboardingSteps.length - 1;
  const isFirstStep = currentIndex === 0;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* ScrollView horizontal pour les écrans */}
      <Animated.View 
        className="flex-1" 
        style={{ opacity: fadeAnim }}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {onboardingSteps.map((item, index) => renderOnboardingSlide(item, index))}
        </ScrollView>
      </Animated.View>

      {/* Indicateurs de pagination */}
      <PaginationDots
        data={onboardingSteps}
        currentIndex={currentIndex}
        getActiveColor={getActiveDotColor}
        dotSize="medium"
        containerClass="py-4"
      />

      {/* Boutons de navigation */}
      <View className="flex-row justify-between items-center px-8 pb-10">
        {/* Bouton Précédent */}
        {!isFirstStep ? (
          <Button
            title="Précédent"
            onPress={goToPrevious}
            variant="secondary"
            size="medium"
            iconName="chevron-back"
            iconPosition="left"
          />
        ) : (
          <View className="w-24" />
        )}

        {/* Spacer */}
        <View className="flex-1" />

        {/* Bouton Suivant */}
        {!isLastStep && (
          <Button
            title="Suivant"
            onPress={goToNext}
            variant="primary"
            size="medium"
            iconName="chevron-forward"
            iconPosition="right"
            customClass={currentStep?.colorClasses?.primary || 'bg-blue-500'}
            customStyle={{
              backgroundColor: currentStep?.legacy?.color || '#3B82F6'
            }}
          />
        )}
      </View>
    </View>
  );
};

export default OnboardingScreen;