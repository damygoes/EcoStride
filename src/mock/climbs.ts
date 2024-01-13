import type { Climb } from "@type-definitions/Climb";

export const climbs: Climb[] = [
  {
    id: "climb1",
    name: "Majestic Peak",
    slug: "majestic-peak",
    summary:
      "A challenging and scenic climb up the Majestic Peak, offering breathtaking views.",
    description:
      "Majestic Peak presents a formidable challenge to climbers, ascending through varied terrains that test endurance and skill. The climb starts with a gentle slope, gradually steepening as it winds through dense forests and rocky paths. Along the journey, climbers encounter a mix of terrains, offering a comprehensive climbing experience. The summit, standing at an elevation gain of 1200 meters, rewards climbers with a stunning panoramic view of Mountainville and beyond. The descent is equally thrilling, providing a different perspective of the breathtaking landscapes encountered along the way.",
    gradient: {
      minGrade: 5,
      maxGrade: 8,
      averageGrade: 6.5,
    },
    elevationGain: 1200,
    distance: 5.2,
    category: "three",
    location: {
      city: "Mountainville",
      state: "Colorado",
      country: "USA",
    },
    tags: ["scenic", "challenging", "popular"],
    photos: [
      "https://images.unsplash.com/photo-1501610862033-8787c0add568?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3ljbGluZyUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1534146789009-76ed5060ec70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ljbGluZyUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1699389359817-6d17d0880c2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN5Y2xpbmclMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
    ],
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-02T12:00:00Z",
    startLocation: {
      latitude: 39.5501,
      longitude: -105.7821,
    },
    endLocation: {
      latitude: 39.5969,
      longitude: -105.7821,
    },
  },
  {
    id: "climb2",
    name: "River's Edge",
    slug: "rivers-edge",
    summary:
      "A serene climb alongside a river, perfect for beginners or those looking for a relaxing hike.",
    description:
      "River's Edge is a serene and picturesque climb, perfect for those seeking a leisurely experience in nature. The route follows a meandering river, providing a tranquil backdrop with the soothing sound of flowing water. The climb features gentle slopes and minimal elevation gain, making it accessible and enjoyable for beginners. Along the path, climbers will find lush greenery and an abundance of wildlife, adding to the scenic beauty of the journey. The climb concludes with a stunning riverside viewpoint, a perfect spot for relaxation and reflection.",
    gradient: {
      minGrade: 2,
      maxGrade: 4,
      averageGrade: 3,
    },
    elevationGain: 800,
    distance: 3.5,
    category: "three",
    location: {
      city: "Riverstown",
      state: "Oregon",
      country: "USA",
    },
    tags: ["serene", "beginner-friendly", "river"],
    photos: [
      "https://images.unsplash.com/photo-1687860910109-fb6c7a6c8a6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3ljbGluZyUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1699389359923-99c59a2e064f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN5Y2xpbmclMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1699389359830-7b49eac067ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN5Y2xpbmclMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
    ],
    createdAt: "2023-02-15T08:00:00Z",
    updatedAt: "2023-02-16T08:00:00Z",
    startLocation: {
      latitude: 45.52823,
      longitude: -123.05956,
    },
    endLocation: {
      latitude: 45.52822,
      longitude: -123.01476,
    },
  },
  {
    id: "climb3",
    name: "Alpine Vista",
    slug: "alpine-vista",
    summary: "An exhilarating climb with stunning views of the Alps.",
    description:
      "Alpine Vista offers an exhilarating climb with breathtaking views of the majestic Alps. The route takes climbers through diverse landscapes, from alpine meadows to rocky terrains, each offering a unique challenge. The climb is demanding, with steep ascents and technical sections that require skill and stamina. At the summit, climbers are rewarded with spectacular views of the surrounding peaks and valleys. The descent provides a different challenge, navigating through narrow paths and rocky outcrops.",
    gradient: {
      minGrade: 6,
      maxGrade: 9,
      averageGrade: 7.5,
    },
    elevationGain: 1500,
    distance: 7.0,
    category: "four",
    location: {
      city: "Chamonix",
      state: "Auvergne-Rhône-Alpes",
      country: "France",
    },
    tags: ["breathtaking", "Alps", "advanced"],
    photos: [
      "https://images.unsplash.com/photo-1558980394-dbb9770398b1?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-06-10T09:00:00Z",
    updatedAt: "2023-06-11T09:00:00Z",
    startLocation: {
      latitude: 45.923697,
      longitude: 6.869433,
    },
    endLocation: {
      latitude: 45.986675,
      longitude: 6.869433,
    },
  },
  {
    id: "climb4",
    name: "Dolomite Challenge",
    slug: "dolomite-challenge",
    summary: "A steep and technical climb through the dramatic Dolomites.",
    description:
      "The Dolomite Challenge is a steep and technical climb through the dramatic landscapes of the Dolomites. Climbers face a variety of terrains, including steep inclines, rocky paths, and narrow ridges. The route offers stunning views of the surrounding mountains and valleys, providing a sense of accomplishment with each step. The climb is challenging, requiring both physical and mental endurance, but the reward at the summit is unparalleled, with panoramic views of the iconic Dolomite peaks.",
    gradient: {
      minGrade: 7,
      maxGrade: 10,
      averageGrade: 8.5,
    },
    elevationGain: 1800,
    distance: 6.5,
    category: "one",
    location: {
      city: "Cortina d'Ampezzo",
      state: "Veneto",
      country: "Italy",
    },
    tags: ["steep", "Dolomites", "technical"],
    photos: [
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562911666-31a0b0a69a7e?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-07-20T10:00:00Z",
    updatedAt: "2023-07-21T10:00:00Z",
    startLocation: {
      latitude: 46.540471,
      longitude: 12.135652,
    },
    endLocation: {
      latitude: 46.581802,
      longitude: 12.195617,
    },
  },
  {
    id: "climb5",
    name: "Sierra Serenity",
    slug: "sierra-serenity",
    summary: "A peaceful climb through the serene Sierra Nevada mountains.",
    description:
      "Sierra Serenity takes climbers through the peaceful and serene landscapes of the Sierra Nevada mountains. The climb is moderate, with gentle slopes and an elevation gain suitable for intermediate climbers. Along the route, climbers will experience the tranquility of the mountain environment, surrounded by lush forests and wildlife. The summit offers a peaceful retreat, with views of the surrounding peaks and valleys, making it a perfect destination for those seeking a calm and rejuvenating climb.",
    gradient: {
      minGrade: 3,
      maxGrade: 5,
      averageGrade: 4,
    },
    elevationGain: 1000,
    distance: 5.0,
    category: "three",
    location: {
      city: "Granada",
      state: "Andalusia",
      country: "Spain",
    },
    tags: ["peaceful", "Sierra Nevada", "serene"],
    photos: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1524231719719-1d94e8e9a0e2?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-08-15T11:00:00Z",
    updatedAt: "2023-08-16T11:00:00Z",
    startLocation: {
      latitude: 37.177336,
      longitude: -3.598557,
    },
    endLocation: {
      latitude: 37.132283,
      longitude: -3.598557,
    },
  },
  {
    id: "climb6",
    name: "Bavarian Traverse",
    slug: "bavarian-traverse",
    summary:
      "A scenic journey through the lush landscapes and rolling hills of Bavaria.",
    description:
      "The Bavarian Traverse is a scenic journey through the lush landscapes and rolling hills of Bavaria. This climb features a blend of gentle slopes and moderate inclines, providing a balanced challenge suitable for a range of skill levels. The route is characterized by its picturesque scenery, with panoramic views of the Bavarian countryside. Climbers can enjoy the natural beauty of the region, with opportunities to observe local flora and fauna along the way.",
    gradient: {
      minGrade: 4,
      maxGrade: 6,
      averageGrade: 5,
    },
    elevationGain: 1100,
    distance: 8.0,
    category: "Hors Catégorie (HC)",
    location: {
      city: "Garmisch-Partenkirchen",
      state: "Bavaria",
      country: "Germany",
    },
    tags: ["scenic", "rolling-hills", "Bavaria"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-09-10T09:00:00Z",
    updatedAt: "2023-09-11T09:00:00Z",
    startLocation: {
      latitude: 47.491694,
      longitude: 11.095498,
    },
    endLocation: {
      latitude: 47.491645,
      longitude: 10.989335,
    },
  },
  {
    id: "climb7",
    name: "Black Forest Ascent",
    slug: "black-forest-ascent",
    summary:
      "An enchanting climb through the dense, mystical woods of the Black Forest.",
    description:
      "Black Forest Ascent offers an enchanting climb through the dense, mystical woods of the Black Forest. The route takes climbers on a journey through a fairy-tale landscape, with towering trees and hidden clearings. The climb is moderately challenging, with a consistent ascent that tests endurance. As climbers reach the summit, they are greeted with stunning views of the forest canopy and beyond, providing a magical conclusion to the climb.",
    gradient: {
      minGrade: 5,
      maxGrade: 7,
      averageGrade: 6,
    },
    elevationGain: 1300,
    distance: 6.0,
    category: "Hors Catégorie (HC)",
    location: {
      city: "Freiburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["enchanting", "dense-woods", "Black-Forest"],
    photos: [
      "https://images.unsplash.com/photo-1568625501381-a11a5f1f1ede?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1568625501745-2474789f37f9?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-10-20T10:00:00Z",
    updatedAt: "2023-10-21T10:00:00Z",
    startLocation: {
      latitude: 47.999008,
      longitude: 7.842104,
    },
    endLocation: {
      latitude: 47.960837,
      longitude: 7.898914,
    },
  },
  {
    id: "climb8",
    name: "Saxon Switzerland Challenge",
    slug: "saxon-switzerland-challenge",
    summary:
      "A rigorous climb featuring the unique sandstone formations of Saxon Switzerland.",
    description:
      "The Saxon Switzerland Challenge is a rigorous climb featuring the unique sandstone formations of the region. Climbers face a variety of challenges, including steep ascents and technical sections that require careful navigation. The route offers stunning views of the surrounding landscapes, with the sandstone formations providing a unique backdrop. The summit offers a sense of achievement, with panoramic views of the Saxon Switzerland National Park.",
    gradient: {
      minGrade: 7,
      maxGrade: 9,
      averageGrade: 8,
    },
    elevationGain: 1400,
    distance: 7.5,
    category: "one",
    location: {
      city: "Bad Schandau",
      state: "Saxony",
      country: "Germany",
    },
    tags: ["rigorous", "sandstone-formations", "Saxon-Switzerland"],
    photos: [
      "https://images.unsplash.com/photo-1581323127298-92e8e1a0d0d6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1581323127360-8e60a4b381d3?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-11-15T11:00:00Z",
    updatedAt: "2023-11-16T11:00:00Z",
    startLocation: {
      latitude: 50.917911,
      longitude: 14.152345,
    },
    endLocation: {
      latitude: 50.965558,
      longitude: 14.227837,
    },
  },
  {
    id: "climb9",
    name: "Swabian Alb Adventure",
    slug: "swabian-alb-adventure",
    summary:
      "A picturesque climb offering panoramic views of the Swabian Alb's unique landscapes.",
    description:
      "The Swabian Alb Adventure offers a picturesque climb with breathtaking panoramic views of the unique landscapes of the Swabian Alb. The route begins with a gentle ascent, winding through rolling hills and lush meadows. This climb is particularly enchanting in spring and autumn when the natural scenery is at its most vibrant, making it a favorite among photographers and nature enthusiasts. As climbers progress, they encounter various vantage points that provide stunning views of the surrounding countryside. The path is well-marked and manageable, making it suitable for climbers of all skill levels. This climb is perfect for those seeking a day of leisurely exploration in a scenic setting, offering a blend of physical activity and natural beauty.",
    gradient: {
      minGrade: 4,
      maxGrade: 6,
      averageGrade: 5,
    },
    elevationGain: 950,
    distance: 5.5,
    category: "three",
    location: {
      city: "Reutlingen",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["picturesque", "panoramic", "Swabian-Alb"],
    photos: [
      "https://images.unsplash.com/photo-1581323127298-92e8e1a0d0d6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1581323127360-8e60a4b381d3?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-02T10:00:00Z",
    startLocation: {
      latitude: 48.49144,
      longitude: 9.21156,
    },
    endLocation: {
      latitude: 48.456454,
      longitude: 9.15898,
    },
  },
  {
    id: "climb10",
    name: "Heidelberg Heights",
    slug: "heidelberg-heights",
    summary:
      "Experience the historic charm of Heidelberg as you climb its surrounding hills.",
    description:
      "Heidelberg Heights offers an immersive experience combining historic charm and natural beauty. The climb takes you through the scenic hills surrounding the historic city of Heidelberg, providing glimpses of the city's architectural marvels from a unique vantage point. The route is moderately challenging, making it accessible to most climbers. Upon reaching the higher points of the climb, you are rewarded with stunning views of Heidelberg, the Neckar River, and the surrounding forests. The descent offers a different perspective of the landscape, with opportunities to explore the historic city's outskirts. This climb is ideal for those who appreciate a blend of cultural history and outdoor adventure.",
    gradient: {
      minGrade: 3,
      maxGrade: 5,
      averageGrade: 4,
    },
    elevationGain: 700,
    distance: 4.0,
    category: "Hors Catégorie (HC)",
    location: {
      city: "Heidelberg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["historic", "charming", "Heidelberg"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2023-12-15T11:00:00Z",
    updatedAt: "2023-12-16T11:00:00Z",
    startLocation: {
      latitude: 49.39875,
      longitude: 8.672434,
    },
    endLocation: {
      latitude: 49.434715,
      longitude: 8.672434,
    },
  },
  {
    id: "climb11",
    name: "Black Forest Peak",
    slug: "black-forest-peak",
    summary:
      "Ascend to the highest peaks of the Black Forest for an unforgettable climbing experience.",
    description:
      "Black Forest Peak is an exhilarating climb that takes you to the highest peaks of the Black Forest. The route is challenging, with steep ascents and varying terrain, offering an adventure for experienced climbers. As you ascend, the dense forest canopy opens up to reveal stunning vistas of the surrounding area. The summit provides a breathtaking panoramic view, allowing climbers to fully appreciate the vastness and beauty of the Black Forest. The descent is equally rewarding, with different paths to explore and new sights to see. This climb is perfect for those seeking a challenging adventure amidst some of Germany's most iconic natural scenery.",
    gradient: {
      minGrade: 6,
      maxGrade: 8,
      averageGrade: 7,
    },
    elevationGain: 1200,
    distance: 6.5,
    category: "Hors Catégorie (HC)",
    location: {
      city: "Freudenstadt",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["high-peaks", "unforgettable", "Black-Forest"],
    photos: [
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562911666-31a0b0a69a7e?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-01-05T09:30:00Z",
    updatedAt: "2024-01-06T09:30:00Z",
    startLocation: {
      latitude: 48.463423,
      longitude: 8.411423,
    },
    endLocation: {
      latitude: 48.463389,
      longitude: 8.499315,
    },
  },
  {
    id: "climb12",
    name: "Offenburg Outlook",
    slug: "offenburg-outlook",
    summary:
      "A serene climb leading to a spectacular view over Offenburg and the Rhine valley.",
    description:
      "Offenburg Outlook is a serene climb that leads to a spectacular viewpoint over Offenburg and the Rhine valley. The ascent is gentle, making it suitable for climbers of all levels, including families and beginners. The path winds through picturesque landscapes, offering glimpses of local wildlife and flora. The summit is the highlight of the climb, providing a panoramic view of the valley, the city of Offenburg, and on clear days, the distant Black Forest. The peaceful atmosphere makes it an ideal spot for contemplation and enjoying nature. This climb is perfect for a relaxing day out, offering both physical activity and stunning views.",
    gradient: {
      minGrade: 3,
      maxGrade: 5,
      averageGrade: 4,
    },
    elevationGain: 600,
    distance: 4.5,
    category: "four",
    location: {
      city: "Offenburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["serene", "viewpoint", "Rhine-valley"],
    photos: [
      "https://images.unsplash.com/photo-1573485544620-71c1130d9a30?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1573485545053-63d11a4a6a44?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-02-10T08:30:00Z",
    updatedAt: "2024-02-11T08:30:00Z",
    startLocation: {
      latitude: 48.476105,
      longitude: 7.945607,
    },
    endLocation: {
      latitude: 48.504712,
      longitude: 7.902546,
    },
  },
  {
    id: "climb13",
    name: "Vineyard Venture",
    slug: "vineyard-venture",
    summary:
      "Wander through the rolling vineyards surrounding Offenburg, a blend of nature and culture.",
    description:
      "Vineyard Venture is a unique climb that takes you through the rolling vineyards surrounding Offenburg. The route is dotted with picturesque vineyards, offering climbers a chance to experience the region's rich wine culture. The climb is gentle, suitable for all skill levels, and particularly enjoyable during the grape harvest season. As you ascend, the panoramic views of the vineyards and surrounding countryside become increasingly spectacular. The climb offers a perfect blend of nature and culture, providing an opportunity to learn about the local wine-making traditions. Vineyard Venture is ideal for those looking for a leisurely climb that combines scenic beauty with cultural enrichment.",
    gradient: {
      minGrade: 2,
      maxGrade: 4,
      averageGrade: 3,
    },
    elevationGain: 500,
    distance: 3.8,
    category: "four",
    location: {
      city: "Offenburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["vineyards", "cultural", "nature"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-03-15T09:45:00Z",
    updatedAt: "2024-03-16T09:45:00Z",
    startLocation: {
      latitude: 48.4715,
      longitude: 7.9531,
    },
    endLocation: {
      latitude: 48.44733,
      longitude: 7.916778,
    },
  },
  {
    id: "climb14",
    name: "Ortenberg Castle Climb",
    slug: "ortenberg-castle-climb",
    summary:
      "A historic route leading to the Ortenberg Castle, offering both a physical challenge and a lesson in history.",
    description:
      "The Ortenberg Castle Climb is a historic route that leads to the majestic Ortenberg Castle. The climb is moderately challenging, offering a blend of physical activity and historical exploration. As you ascend, the path takes you through lush forests and open fields, with occasional glimpses of the castle in the distance. Reaching the castle, climbers are rewarded with stunning views of the surrounding landscape and the opportunity to explore the historic fortress. The descent provides a different perspective on the area, with chances to discover more of the region's history. This climb is perfect for those who enjoy combining their outdoor adventures with a touch of history.",
    gradient: {
      minGrade: 5,
      maxGrade: 7,
      averageGrade: 6,
    },
    elevationGain: 750,
    distance: 5.0,
    category: "two",
    location: {
      city: "Offenburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["historic", "castle", "challenging"],
    photos: [
      "https://images.unsplash.com/photo-1568625501381-a11a5f1f1ede?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1568625501745-2474789f37f9?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-04-20T11:00:00Z",
    updatedAt: "2024-04-21T11:00:00Z",
    startLocation: {
      latitude: 48.4681,
      longitude: 7.9405,
    },
    endLocation: {
      latitude: 48.499885,
      longitude: 7.988341,
    },
  },
  {
    id: "climb15",
    name: "Gengenbach Gateway",
    slug: "gengenbach-gateway",
    summary:
      "A gentle climb through the historic vineyards leading up to the picturesque town of Gengenbach.",
    description:
      "Gengenbach Gateway is a gentle climb through the historic vineyards leading up to the picturesque town of Gengenbach. The route is relatively easy, making it ideal for families and those looking for a relaxing hike. The path is lined with historic vineyards, offering a glimpse into the region's winemaking heritage. As you approach Gengenbach, the climb offers beautiful views of the town and its traditional architecture. The descent back through the vineyards provides a peaceful end to the climb, allowing for reflection and appreciation of the natural and cultural beauty of the area. Gengenbach Gateway is perfect for those seeking a gentle climb with a picturesque and historic backdrop.",
    gradient: {
      minGrade: 2,
      maxGrade: 4,
      averageGrade: 3,
    },
    elevationGain: 400,
    distance: 3.5,
    category: "one",
    location: {
      city: "Offenburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["gentle", "historic", "picturesque"],
    photos: [
      "https://images.unsplash.com/photo-1581323127298-92e8e1a0d0d6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1581323127360-8e60a4b381d3?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-05-12T07:30:00Z",
    updatedAt: "2024-05-13T07:30:00Z",
    startLocation: {
      latitude: 48.4633,
      longitude: 7.9487,
    },
    endLocation: {
      latitude: 48.485551,
      longitude: 7.915221,
    },
  },
  {
    id: "climb16",
    name: "Rench River Ramble",
    slug: "rench-river-ramble",
    summary:
      "Follow the serene Rench River through lush meadows and forests on this peaceful climb.",
    description:
      "The Rench River Ramble is a peaceful climb that follows the serene Rench River through lush meadows and dense forests. The route is relatively flat, making it an excellent choice for beginners or those looking for a calm and rejuvenating experience in nature. The gentle sound of the river adds to the tranquility of the climb. Along the way, climbers can enjoy the rich biodiversity of the area, with opportunities to spot various bird species and other wildlife. The climb is particularly beautiful in the early morning or late afternoon when the light casts a magical glow over the landscape. Rench River Ramble is ideal for those seeking a serene escape in the heart of nature.",
    gradient: {
      minGrade: 1,
      maxGrade: 3,
      averageGrade: 2,
    },
    elevationGain: 300,
    distance: 4.0,
    category: "two",
    location: {
      city: "Offenburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["serene", "river", "meadows"],
    photos: [
      "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1562911666-31a0b0a69a7e?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-06-20T09:00:00Z",
    updatedAt: "2024-06-21T09:00:00Z",
    startLocation: {
      latitude: 48.4594,
      longitude: 7.9412,
    },
    endLocation: {
      latitude: 48.495371,
      longitude: 7.9412,
    },
  },
  {
    id: "climb17",
    name: "Zell-Weierbach Ascent",
    slug: "zell-weierbach-ascent",
    summary:
      "Ascend through the famous vineyards of Zell-Weierbach, renowned for their scenic beauty and fine wines.",
    description:
      "The Zell-Weierbach Ascent is a scenic climb through the famous vineyards of Zell-Weierbach, known for their beauty and fine wines. The route offers moderate challenges, making it suitable for climbers with some experience. The ascent provides stunning views of the vineyards and the surrounding countryside. The summit offers a panoramic view of the area, with the vineyards stretching out below. The descent allows climbers to explore different parts of the vineyards and perhaps even sample some of the local wines. Zell-Weierbach Ascent is perfect for those who enjoy a scenic climb with a taste of the local culture.",
    gradient: {
      minGrade: 3,
      maxGrade: 5,
      averageGrade: 4,
    },
    elevationGain: 550,
    distance: 4.2,
    category: "one",
    location: {
      city: "Offenburg",
      state: "Baden-Württemberg",
      country: "Germany",
    },
    tags: ["vineyards", "scenic", "wine"],
    photos: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1506748686219-c5cb9f6beae7?w=800&auto=format&fit=crop&q=60",
    ],
    createdAt: "2024-07-30T10:45:00Z",
    updatedAt: "2024-07-31T10:45:00Z",
    startLocation: {
      latitude: 48.4681,
      longitude: 7.9405,
    },
    endLocation: {
      latitude: 48.493103,
      longitude: 7.9405,
    },
  },
];
