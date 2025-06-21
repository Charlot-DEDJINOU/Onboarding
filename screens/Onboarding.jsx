import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Données des étapes d'onboarding
const onboardingData = [
  {
    id: 1,
    title: 'Online Sellers Today',
    subtitle: 'Vendez en ligne facilement',
    description: 'Rejoignez des milliers de vendeurs qui font confiance à notre plateforme pour développer leur business.',
    icon: 'cube-outline',
    color: '#FF8A65',
    backgroundColor: '#FFF3E0',
  },
  {
    id: 2,
    title: 'Marketing',
    subtitle: 'Boostez vos ventes',
    description: 'Utilisez nos outils marketing avancés pour atteindre plus de clients et augmenter vos revenus.',
    icon: 'bar-chart-outline',
    color: '#9C27B0',
    backgroundColor: '#F3E5F5',
  },
  {
    id: 3,
    title: 'Customer Engagement',
    subtitle: 'Fidélisez vos clients',
    description: 'Créez des relations durables avec vos clients grâce à nos fonctionnalités d\'engagement.',
    icon: 'search-outline',
    color: '#FF5722',
    backgroundColor: '#FBE9E7',
  },
  {
    id: 4,
    title: 'Sankofa Shop',
    subtitle: 'Votre succès commence ici',
    description: 'Commencez votre aventure entrepreneuriale avec la plateforme de vente la plus innovante.',
    icon: 'storefront-outline',
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    isLast: true,
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Animation de transition entre les écrans
  const animateTransition = (index) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Navigation vers l'écran suivant
  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      animateTransition(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }
  };

  // Navigation vers l'écran précédent
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      animateTransition(prevIndex);
      scrollViewRef.current?.scrollTo({
        x: prevIndex * width,
        animated: true,
      });
    }
  };

  // Gestion du scroll manuel
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex && index >= 0 && index < onboardingData.length) {
      setCurrentIndex(index);
    }
  };

  // Validation et soumission du numéro de téléphone
  const handlePreregistration = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Erreur', 'Numéro requis');
      return;
    }

    // Validation basique du format de numéro
    const phoneRegex = /^[+]?[\d\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      Alert.alert('Erreur', 'Format de numéro invalide');
      return;
    }

    Alert.alert(
      'Confirmation',
      `Merci ! Votre préinscription avec le numéro ${phoneNumber} a été enregistrée avec succès.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setPhoneNumber('');
            // Ici, vous pourriez naviguer vers l'écran principal de l'app
          },
        },
      ]
    );
  };

  // Rendu d'un écran d'onboarding
  const renderOnboardingItem = ({ item, index }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.content}>
        {/* Icône principale */}
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={60} color="white" />
        </View>

        {/* Texte principal */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Formulaire de préinscription pour le dernier écran */}
        {item.isLast && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Votre numéro de téléphone"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={15}
            />
            <TouchableOpacity
              style={[styles.preregisterButton, { backgroundColor: item.color }]}
              onPress={handlePreregistration}
            >
              <Text style={styles.preregisterButtonText}>Préinscription</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* ScrollView horizontal pour les écrans */}
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id}>
              {renderOnboardingItem({ item, index })}
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Indicateurs de pagination */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? onboardingData[currentIndex].color : '#E0E0E0',
                transform: [{ scale: index === currentIndex ? 1.2 : 1 }],
              },
            ]}
          />
        ))}
      </View>

      {/* Boutons de navigation */}
      <View style={styles.navigationContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={goToPrevious}>
            <Ionicons name="chevron-back" size={24} color="#666" />
            <Text style={styles.navButtonText}>Précédent</Text>
          </TouchableOpacity>
        )}

        <View style={styles.spacer} />

        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, { backgroundColor: onboardingData[currentIndex].color }]}
            onPress={goToNext}
          >
            <Text style={styles.nextButtonText}>Suivant</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  animatedContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  phoneInput: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  preregisterButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  preregisterButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  nextButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  navButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  nextButtonText: {
    marginRight: 8,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  spacer: {
    flex: 1,
  },
});

export default OnboardingScreen;