export const ANIME_CONTENT = {
  correlation: {
    title: 'Corrélation Score vs Popularité',
    badge: ' Animés',
    description:
      'Ce graphique illustre la corrélation entre la popularité des animes (basée sur le nombre de membres) et leurs notes critiques. La ligne de tendance rose met en évidence une corrélation positive globale : les œuvres les plus populaires tendent à obtenir de meilleures évaluations. Toutefois, la dispersion importante des points indique que la popularité ne garantit pas la qualité, révélant à la fois des succès critiques moins connus et des titres très populaires au score plus modeste.',
    regressionLabel: 'Régression linéaire ',
    data: [],
  },
  genres: {
    title: 'Répartition par Genre',
    badge: 'Top 100',
    description:
      "Répartition thématique des 100 animes les mieux notés. Ce graphique illustre la prédominance des différents genres au sein du top 100 actuel. La taille de chaque section reflète la proportion représentée par chaque genre dans le classement, offrant une vue d'ensemble sur les thématiques qui dominent les œuvres les plus plébiscitées par la critique. Cliquez sur les éléments de légende pour filtrer temporairement un genre et mieux visualiser les autres.",
    series: [],
    labels: [],
  },
  seasons: {
    title: 'Performance Critique par Saison',
    badge: '2024—2025',
    description:
      "Analyse comparative de la performance critique saisonnière sur deux années. Les courbes retracent l'évolution des scores moyens, tandis que les zones ombrées illustrent la volatilité des notes au sein de chaque saison (écart-type). Ce graphique permet d'identifier les périodes de l'année caractérisées par une homogénéité qualitative élevée ou, à l'inverse, par une plus grande dispersion dans la réception critique des œuvres.",
    categories: ['Hiver', 'Printemps', 'Été', 'Automne'],
    series: [],
  },
  studios: {
    title: 'Top Studios (Efficacité)',
    badge: 'min. 3 titres',
    description:
      "Classement des studios selon leur score critique moyen pondéré, filtré pour inclure uniquement les structures ayant produit au moins trois titres dans notre base de données. Ce palmarès met en lumière les studios démontrant la plus grande constance qualitative. La longueur des barres offre une lecture immédiate de la performance relative, permettant d'identifier rapidement les leaders en termes d'efficacité critique.",
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
