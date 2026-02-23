export const ANIME_CONTENT = {
  correlation: {
    title: 'Corrélation Score vs Popularité',
    badge: '2000 animés',
    description:
      'Nuage de points en échelle logarithmique. Survolez les points pour voir les détails. La ligne de tendance illustre la corrélation linéaire entre la popularité et le score attribué par la communauté.',
    regressionLabel: 'Régression linéaire',

    data: [],
  },
  genres: {
    title: 'Répartition par Genre',
    badge: 'Top 100',
    description:
      'Distribution des genres parmi les 100 meilleurs animés (par score). Basculez entre genre principal et multi-genres pour voir la pondération fractionnaire (1/n). Cliquez sur la légende pour masquer un genre.',
    series: [],
    labels: [],
  },
  seasons: {
    title: 'Performance Critique par Saison',
    badge: '2024—2025',
    description:
      "Score moyen par saison avec bande d'écart-type (± σ) et barres d'erreur. Compare la qualité perçue entre les saisons. La dispersion indique la variabilité au sein d'une saison donnée.",
    categories: ['Hiver', 'Printemps', 'Été', 'Automne'],
    series: [],
  },
  studios: {
    title: 'Top Studios (Efficacité)',
    badge: 'min. 3 titres',
    description:
      'Classement des studios par score moyen (studios avec au minimum 3 titres dans le jeu de données). Cliquez sur un studio pour afficher la liste détaillée de ses titres avec scores et popularité.',
    names: [],
    scores: [],
  },
};

export const PROJECT_DATA = {
  title: 'Anime & Manga Insights',
  subtitle: "Plateforme d'analyse de données animés",
  description:
    "Découvrez des analyses approfondies de 100 animés japonais produits entre 2024 et 2025. Notre plateforme utilise des algorithmes d'analyse de données pour vous fournir des insights précieux sur les tendances du marché de l'animation.",
  features: [
    {
      icon: '📊',
      title: 'Analyse de Corrélation',
      description:
        'Explorez les relations entre les notes des utilisateurs et les scores des plateformes',
    },
    {
      icon: '🎭',
      title: 'Répartition par Genre',
      description:
        'Visualisez la distribution des animés par genre et identifiez les tendances populaires',
    },
    {
      icon: '📅',
      title: 'Tendances Saisonnières',
      description:
        'Analysez les patterns de diffusion par saison et comparez les années 2024 et 2025',
    },
    {
      icon: '🏢',
      title: 'Performance des Studios',
      description: "Évaluez la production et la qualité des principaux studios d'animation",
    },
  ],
  stats: [],
};
