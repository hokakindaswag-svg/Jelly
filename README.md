# 🧸 Doudoumimi

Storefront de **Doudoumimi** — boutique française de doudous et peluches trop mignons.

- **Tous les doudous : 9,99 €**
- **Doudou Mystère : 2 €**
- **Aucun panier** : chaque bouton part directement au checkout.

Univers : *cute Halloween · kawaii · girly · cozy · collectible*, en rose, orange doux,
crème et violet pastel. Jamais sombre, jamais gore.

---

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

Stack : Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Aucune dépendance UI externe, aucune image bitmap : les doudous sont dessinés
en SVG inline (`components/Plushie.tsx`), donc le site charge instantanément.

---

## Parcours d'achat

```
DÉCOUVERTE → PRODUIT → ACHETER MAINTENANT → CHECKOUT → PAIEMENT → CONFIRMATION
```

Il n'existe **ni panier, ni page panier, ni mini-panier, ni icône panier**.
Tous les CTA produits (`BuyNowButton`) construisent une URL de checkout direct
via `lib/checkout.ts` :

```
/checkout?p={handle}&q={quantité}&m=1   # m=1 : Doudou Mystère ajouté
```

Le seul « ajout » possible est l'upsell Doudou Mystère à 2 €, proposé comme une
case à cocher dans le récapitulatif du checkout : il modifie la commande en
cours, il ne crée pas de panier.

---

## Arborescence

```
app/
  page.tsx                     Homepage (hero → prix → Halloween → mystère → best-sellers → nouveautés → collections → avis → réassurance)
  doudous/                     Toute la collection
  best-sellers/                Les plus adoptés
  collections/[handle]/        Halloween · classiques · spooky · cute · éditions limitées
  produit/[handle]/            Fiche produit + achat direct + barre collante mobile
  doudou-mystere/              Landing dédiée à l'offre 2 €
  checkout/                    Coordonnées → livraison → paiement (header/footer masqués)
  checkout/confirmation/       Merci + upsell best-sellers
  faq/ contact/ livraison/ retours/ cgv/ confidentialite/ mentions-legales/
  recherche/ compte/ not-found.tsx sitemap.ts robots.ts

components/
  Header · Logo · AnnouncementBar · Footer · Chrome
  Hero · PriceSection · CollectionCard · UrgencyStrip
  ProductCard · ProductGrid · ProductGallery · ProductPurchase
  MysteryBox · MysteryReveal
  Reviews · TrustBadges · InfoPage · Plushie
  BuyNowButton · CheckoutFlow
  ui/ Badge · PriceTag · Stars · Sparkles · SectionHeading

lib/
  products.ts   Catalogue (prix en centimes, badges, collections, stock, variantId)
  site.ts       Navigation, collections, réassurance, avis, FAQ
  checkout.ts   Construction des URLs de checkout + frais de port
```

---

## Passage à Shopify

Le code est structuré pour un portage direct, sans jamais réintroduire de panier.

| Ici | Shopify |
| --- | --- |
| `lib/products.ts` | Produits / variantes (Storefront API ou Liquid) |
| `Product.variantId` | `variant.id` réel |
| `Product.price` (centimes) | `variant.price` (minor units) |
| `buildCheckoutUrl()` | `/cart/{variantId}:{qty}` **ou** `cartCreate` → redirection `cart.checkoutUrl` |
| `CheckoutFlow.submitOrder()` | Redirection vers le checkout Shopify / PaymentIntent Stripe |
| `components/Plushie` | `<Image>` avec les vraies photos produit |
| `lib/site.ts` | Métaobjets / navigation Shopify |

Avec le permalien `/cart/{variantId}:{qty}`, Shopify redirige directement vers le
paiement : le panier reste un objet technique, jamais exposé à l'utilisateur.
L'upsell Doudou Mystère devient `/cart/{variantId}:{qty},{mysteryVariantId}:1`.

---

## À compléter avant mise en ligne

- Informations légales entre crochets dans `app/cgv`, `app/mentions-legales`,
  `app/confidentialite` (raison sociale, SIRET, hébergeur, prestataires).
- Comptes Instagram / TikTok et e-mail de contact dans `lib/site.ts`.
- Photos produit réelles à la place des illustrations SVG.
- Prestataire de paiement branché dans `CheckoutFlow.submitOrder()`
  (le formulaire actuel ne débite rien : il mène à la page de confirmation).
- Avis clients : ceux de `lib/site.ts` sont des exemples de mise en page,
  à remplacer par de vrais avis vérifiés.
