# 🔍 Audit UI/Tech – Sankofa Shop

## 🧠 Compréhension générale du projet

**Sankofa Shop** est une plateforme en ligne de **vente et d’achat de produits**, combinant e-commerce, interactions sociales (lives, commentaires, likes) et gestion de boutique pour vendeurs.  
Chaque utilisateur peut avoir un **rôle d’acheteur ou de vendeur**, avec des fonctionnalités dédiées.

---

## 🛠️ Fonctionnalités identifiées

### Authentification
- Inscription
- Connexion

### Utilisateur vendeur
- Créer une boutique
- Créer / Poster un produit
- Poster un live
- Voir sa boutique complète
- Voir l’historique des ventes (filtrable par date)
- Changer l’état d’une commande (en attente, en cours)
- Déclarer un litige
- Gérer les préférences via les paramètres

### Utilisateur acheteur
- Rechercher un produit, un live ou un vendeur
- Ajouter des produits au panier
- Effectuer un achat / transaction
- Laisser un avis sur un produit
- Voir l’historique de commandes
- Recevoir un code de validation à communiquer au vendeur
- Déclarer un litige
- Noter un produit

### Fonctions communes
- Messagerie
- Notifications
- Likes, commentaires et partages de lives
- Navigation dans la boutique d’un vendeur

---

## 🧩 Composants UI identifiés

| Composant          | Description                                |
|--------------------|--------------------------------------------|
| `Input`            | Champs de saisie                          |
| `Button`           | Boutons cliquables                        |
| `Modal`            | Fenêtre contextuelle                      |
| `SellerCard`       | Affichage résumé d’un vendeur             |
| `LiveCard`         | Affichage d’un live                       |
| `ProductDetail`    | Détail complet d’un produit               |
| `MessageItem`      | Un message dans la messagerie             |
| `ProductCard`      | Produit dans une liste / recherche        |
| `OrderCard`        | Affichage d’une commande                  |
| `CartItem`         | Produit dans le panier                    |
| `SellerProfile`    | Affichage du profil public d’un vendeur   |

---

## 📌 Écrans à clarifier

### 1. Accueil 5
- **Nom** : Accueil 5
- **But probable** : Afficher tous les articles d’un vendeur
- **Point flou** : Comment y accède-t-on ? Depuis un clic sur la boutique ? Sur un produit ?

### 2. Notification
- **Nom** : Notification
- **Point flou** : Comment y accède-t-on ? Un icon qui mène vers la page des notifications ?

### 3. Noter un produit
- **Nom** : Noter un produit
- **Point flou** : Est-ce que l’avis est demandé automatiquement après réception ? Ou n'importe qui peut noter cela ?

---

## ❓ Questions

1. **Écran de code côté vendeur :**  
   Le vendeur doit-il rester sur l'écran en attente du code ?  
   Peut-il quitter l’écran puis revenir plus tard ?
   Comment il aura se code sans quitter l'interface ?

2. **Paiement : Pourquoi ne pas envisager Fedapay ou Kkiapay ?**  
   👉 Ils sont adaptés au contexte local, faciles à intégrer, et optimisent les paiements mobiles.

---

## 💡 Suggestions

- **Ajouter une navigation interactive (prototype) dans Figma**  
  Cela aiderait à visualiser les transitions, flows utilisateurs et interactions attendues.
- **Clarifier certains flows utilisateurs** :  
  Par exemple : quand et comment un acheteur note un produit ?  
  Quand le vendeur voit une notification ou un litige ?