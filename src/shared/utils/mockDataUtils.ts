import { IPostsListData, ISinglePostData } from 'shared/types';

const mockData = [
  {
    id: 1,
    title: 'Сборная модель: из чего складывается стоимость строительства и почему она растет',
    date: '20 мая 2025, 11:26',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 2,
    title: 'Ипотека в 2025 году: новые условия и лучшие предложения банков',
    date: '19 мая 2025, 14:15',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 3,
    title: 'Цены на новостройки в Москве выросли на 15% за квартал',
    date: '18 мая 2025, 09:42',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 4,
    title: 'ТОП-5 районов Подмосковья для инвестиций в недвижимость',
    date: '17 мая 2025, 16:30',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 5,
    title: 'Как изменился рынок коммерческой недвижимости после пандемии',
    date: '16 мая 2025, 12:18',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 6,
    title: 'Строительные материалы подорожали на 20%: как это скажется на рынке',
    date: '15 мая 2025, 10:05',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 7,
    title: 'Эксперты прогнозируют рост спроса на загородную недвижимость',
    date: '14 мая 2025, 08:22',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 8,
    title: 'Новые правила долевого строительства: что изменится для покупателей',
    date: '13 мая 2025, 15:47',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 9,
    title: 'Реновация в Москве: какие дома попадут под снос в 2025 году',
    date: '12 мая 2025, 11:33',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 10,
    title: 'Как выбрать квартиру в новостройке: советы риелторов',
    date: '11 мая 2025, 09:14',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 11,
    title: 'Ипотека для IT-специалистов: специальные условия от банков',
    date: '10 мая 2025, 13:25',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 12,
    title: 'Сколько стоит построить дом в Подмосковье в 2025 году',
    date: '9 мая 2025, 17:08',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 13,
    title: 'Тенденции дизайна интерьеров в новостройках 2025 года',
    date: '8 мая 2025, 10:51',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 14,
    title: 'Как продать квартиру быстро и выгодно: инструкция от экспертов',
    date: '7 мая 2025, 14:37',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 15,
    title: 'Налоговые льготы при покупке жилья: что изменилось в 2025 году',
    date: '6 мая 2025, 11:19',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 16,
    title: 'Рейтинг самых надежных застройщиков Москвы по версии РБК',
    date: '5 мая 2025, 09:42',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 17,
    title: 'Бюджетные варианты ремонта в новостройке: советы дизайнеров',
    date: '4 мая 2025, 16:25',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 18,
    title: 'Как оформить налоговый вычет при покупке квартиры в 2025 году',
    date: '3 мая 2025, 12:10',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 19,
    title: 'Аренда vs покупка: что выгоднее в текущих рыночных условиях',
    date: '2 мая 2025, 08:55',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  },
  {
    id: 20,
    title: 'Квартиры с отделкой: плюсы и минусы готовых решений',
    date: '1 мая 2025, 10:30',
    previewImageUrl:
      'https://n1s1.hsmedia.ru/78/2d/cf/782dcf676a2d2434856e11973d375990/656x437_1_f00f16b4d7b1cd6db40bca07c706f079@1255x835_0x0kBIf5ey_4508037425966424333.jpg.webp'
  }
];

export const generatePostListsData = (): IPostsListData => {
  return {
    data: mockData,
    totalResults: mockData.length
  };
};

export const generateSinglePostData = (id: number): ISinglePostData => {
  const currentPostData = mockData[id - 1];
  const mockPostDescription = `
  В 2024 году спрос на первичном рынке элитного жилья Санкт-Петербурга вырос на 67% по площади и на 55% по количеству сделок. Средняя площадь приобретаемого жилья составила 130,6 кв. м, что говорит о предпочтении покупателей к более просторным объектам. Однако, несмотря на высокий спрос, объем предложения сократился на 32% по площади и на 27% по количеству лотов.

  На круглом столе «Фонтанки» планируется обсудить ключевые факторы, влияющие на выбор элитного жилья, такие как локация, архитектурные решения, инфраструктура и концепции, соответствующие образу жизни состоятельных клиентов. Особое внимание будет уделено тому, как создать жилую среду, подчеркивающую статус и индивидуальность владельцев, а также каким элементам должны соответствовать современные элитные дома.

  Круглый стол пройдет 27 мая в 12:00. По вопросам участия обращаться: Галина Демидова, +7 (921) 759–38–23, galina@fontanka.ru.
  `;

  return {
    ...currentPostData,
    tag: 'аналитика',
    source: 'ФОНТАНКА.ру',
    sourceUrl: 'https://www.fontanka.ru/2025/05/20/75477347/',
    description: mockPostDescription
  };
};
