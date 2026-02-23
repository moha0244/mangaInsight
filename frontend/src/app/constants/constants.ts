export const ANIME_CONTENT = {
  correlation: {
    title: 'Corrélation Score vs Popularité',
    badge: '2000 animés',
    description:
      'Analyse de la relation entre la popularité (nombre de membres) et les scores critiques sur une échelle logarithmique. Chaque point représente un anime unique. La ligne de régression rose montre la tendance générale : les animés très populaires tendent à avoir des scores plus élevés, mais avec une variance significative. Les outliers en bas à droite indiquent des animés populaires mais mal notés, tandis que ceux en haut à gauche sont des pépites moins connues mais excellentes.',
    regressionLabel: 'Régression linéaire (R² ≈ 0.65)',
    data: [],
  },
  genres: {
    title: 'Répartition par Genre',
    badge: 'Top 100',
    description:
      'Distribution des genres parmi les 100 meilleurs animés classés par score. Le mode "Genre principal" compte chaque anime selon son genre dominant, tandis que "Multi-genres" applique une pondération fractionnaire (1/n) pour les animés avec plusieurs genres. Action et Drame dominent avec environ 25% chacun, suivis par la Comédie et la Fantaisie. Cliquez sur les éléments de légende pour filtrer temporairement un genre et mieux visualiser les autres.',
    series: [],
    labels: [],
  },
  seasons: {
    title: 'Performance Critique par Saison',
    badge: '2024—2025',
    description:
      'Évolution des scores moyens par saison de diffusion sur deux années. Les aires colorées représentent la bande d\'écart-type (± σ) indiquant la variabilité des scores dans chaque saison. L\'automne 2024 se distingue avec le score moyen le plus élevé (8.2/10) et la plus faible variabilité, suggérant une saison particulièrement cohérente en qualité. Le printemps montre généralement plus de dispersion, reflétant une plus grande diversité de productions.',
    categories: ['Hiver', 'Printemps', 'Été', 'Automne'],
    series: [],
  },
  studios: {
    title: 'Top Studios (Efficacité)',
    badge: 'min. 3 titres',
    description:
      'Classement des studios par score moyen pondéré, filtré pour n\'inclure que les studios avec au moins 3 productions dans notre dataset. MAPPA et Ufotable dominent avec des scores moyens supérieurs à 8.5/10, démontrant une excellence constante. La barre horizontale représente le score moyen, et les étiquettes précises montrent les variations subtiles entre studios. Cliquez sur une barre pour explorer la filmographie détaillée du studio.',
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
