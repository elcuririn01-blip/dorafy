import { BibleBook, BibleChapter } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento
  { id: 'gn', name: 'Gênesis', testament: 'AT', category: 'Pentateuco', chaptersCount: 50 },
  { id: 'ex', name: 'Êxodo', testament: 'AT', category: 'Pentateuco', chaptersCount: 40 },
  { id: 'sl', name: 'Salmos', testament: 'AT', category: 'Poéticos', chaptersCount: 150 },
  { id: 'pv', name: 'Provérbios', testament: 'AT', category: 'Poéticos', chaptersCount: 31 },
  { id: 'ec', name: 'Eclesiastes', testament: 'AT', category: 'Poéticos', chaptersCount: 12 },
  { id: 'is', name: 'Isaías', testament: 'AT', category: 'Profetas Maiores', chaptersCount: 66 },
  { id: 'jr', name: 'Jeremias', testament: 'AT', category: 'Profetas Maiores', chaptersCount: 52 },
  { id: 'dn', name: 'Daniel', testament: 'AT', category: 'Profetas Maiores', chaptersCount: 12 },

  // Novo Testamento
  { id: 'mt', name: 'Mateus', testament: 'NT', category: 'Evangelhos', chaptersCount: 28 },
  { id: 'mc', name: 'Marcos', testament: 'NT', category: 'Evangelhos', chaptersCount: 16 },
  { id: 'lc', name: 'Lucas', testament: 'NT', category: 'Evangelhos', chaptersCount: 24 },
  { id: 'jo', name: 'João', testament: 'NT', category: 'Evangelhos', chaptersCount: 21 },
  { id: 'at', name: 'Atos', testament: 'NT', category: 'Históricos', chaptersCount: 28 },
  { id: 'rm', name: 'Romanos', testament: 'NT', category: 'Cartas Paulinas', chaptersCount: 16 },
  { id: '1co', name: '1 Coríntios', testament: 'NT', category: 'Cartas Paulinas', chaptersCount: 16 },
  { id: 'fp', name: 'Filipenses', testament: 'NT', category: 'Cartas Paulinas', chaptersCount: 4 },
  { id: 'cl', name: 'Colossenses', testament: 'NT', category: 'Cartas Paulinas', chaptersCount: 4 },
  { id: 'tg', name: 'Tiago', testament: 'NT', category: 'Cartas Gerais', chaptersCount: 5 },
  { id: 'ap', name: 'Apocalipse', testament: 'NT', category: 'Revelação', chaptersCount: 22 },
];

export const MOCK_CHAPTERS_DATA: Record<string, BibleChapter> = {
  'sl-23': {
    bookId: 'sl',
    bookName: 'Salmos',
    chapter: 23,
    totalChapters: 150,
    testament: 'AT',
    verses: [
      { number: 1, text: 'O Senhor é o meu pastor; de nada terei falta.' },
      { number: 2, text: 'Em verdes pastagens me faz repousar e me conduz a águas tranquilas;' },
      { number: 3, text: 'restaura-me o vigor. Guia-me pelas veredas da justiça por amor do seu nome.' },
      { number: 4, text: 'Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me consolam.' },
      { number: 5, text: 'Preparas um banquete para mim à vista dos meus inimigos. Tu unges a minha cabeça com óleo, e o meu cálice transborda.' },
      { number: 6, text: 'Sei que a bondade e a fidelidade me acompanharão todos os dias da minha vida, e voltarei à casa do Senhor enquanto eu viver.' },
    ],
  },
  'fp-4': {
    bookId: 'fp',
    bookName: 'Filipenses',
    chapter: 4,
    totalChapters: 4,
    testament: 'NT',
    verses: [
      { number: 1, text: 'Portanto, meus irmãos amados e mui queridos, minha alegria e coroa, permanecei assim firmes no Senhor, amados.' },
      { number: 2, text: 'Rogo a Evódia e rogo a Síntique que pensem concordemente no Senhor.' },
      { number: 3, text: 'Sim, e peço a ti também, fiel companheiro de jugo, que as ajudes, pois lutaram ao meu lado no evangelho, junto com Clemente e os demais cooperadores meus, cujos nomes estão no livro da vida.' },
      { number: 4, text: 'Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos!' },
      { number: 5, text: 'Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor.' },
      { number: 6, text: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica, com ações de graças.' },
      { number: 7, text: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.' },
      { number: 8, text: 'Finalmente, irmãos, tudo o que é verdadeiro, tudo o que é nobre, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se há alguma virtude e se há algum louvor, nisso pensai.' },
      { number: 9, text: 'O que aprendestes, recebestes, ouvistes e vistes em mim, isso praticai; e o Deus da paz será convosco.' },
      { number: 10, text: 'Alegrei-me sobremaneira no Senhor porque, agora, uma vez mais, renovastes a meu favor o vosso cuidado; certamente já vos preocupáveis, mas vos faltava oportunidade.' },
      { number: 11, text: 'Não digo isto por causa de necessidade, porque aprendi a viver contente em toda e qualquer situação.' },
      { number: 12, text: 'Sei o que é passar necessidade e sei também o que é ter fartura. Aprendi o segredo de viver contente em toda e qualquer situação, seja bem alimentado, seja com fome, tendo muito, ou passando necessidade.' },
      { number: 13, text: 'Tudo posso naquele que me fortalece.' },
      { number: 14, text: 'Apesar disso, fizestes bem participando da minha aflição.' },
      { number: 19, text: 'O meu Deus suprirá todas as necessidades de vocês, de acordo com as suas gloriosas riquezas em Cristo Jesus.' },
      { number: 20, text: 'A nosso Deus e Pai seja a glória para todo o sempre. Amém.' },
    ],
  },
  'rm-8': {
    bookId: 'rm',
    bookName: 'Romanos',
    chapter: 8,
    totalChapters: 16,
    testament: 'NT',
    verses: [
      { number: 1, text: 'Portanto, agora já não há condenação para os que estão em Cristo Jesus,' },
      { number: 2, text: 'porque por meio de Cristo Jesus a lei do Espírito de vida me libertou da lei do pecado e da morte.' },
      { number: 3, text: 'Porque, aquilo que a lei fora incapaz de fazer por estar enfraquecida pela carne, Deus os fez, enviando seu próprio Filho à semelhança do homem pecador, como oferta pelo pecado.' },
      { number: 14, text: 'porque todos os que são guiados pelo Espírito de Deus são filhos de Deus.' },
      { number: 15, text: 'Pois vocês não receberam um espírito que os escravize para novamente temerem, mas receberam o Espírito que os adota como filhos, por meio do qual clamamos: "Aba, Pai".' },
      { number: 16, text: 'O próprio Espírito testemunha ao nosso espírito que somos filhos de Deus.' },
      { number: 26, text: 'Da mesma forma o Espírito nos ajuda em nossa fraqueza, pois não sabemos como orar, mas o próprio Espírito intercede por nós com gemidos inexprimíveis.' },
      { number: 28, text: 'Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.' },
      { number: 31, text: 'Que diremos, pois, diante dessas coisas? Se Deus é por nós, quem será contra nós?' },
      { number: 37, text: 'Mas, em todas estas coisas somos mais que vencedores, por meio daquele que nos amou.' },
      { number: 38, text: 'Pois estou convencido de que nem morte nem vida, nem anjos nem demônios, nem o presente nem o futuro, nem quaisquer poderes,' },
      { number: 39, text: 'nem altura nem profundidade, nem qualquer outra coisa na criação será capaz de nos separar do amor de Deus que está em Cristo Jesus, nosso Senhor.' },
    ],
  },
  'jo-15': {
    bookId: 'jo',
    bookName: 'João',
    chapter: 15,
    totalChapters: 21,
    testament: 'NT',
    verses: [
      { number: 1, text: 'Eu sou a videira verdadeira, e meu Pai é o agricultor.' },
      { number: 2, text: 'Todo ramo que, estando em mim, não dá fruto, ele corta; e todo que dá fruto, ele poda, para que dê mais fruto ainda.' },
      { number: 3, text: 'Vocês já estão limpos, pela palavra que lhes tenho falado.' },
      { number: 4, text: 'Permaneçam em mim, e eu permanecerei em vocês. Nenhum ramo pode dar fruto por si mesmo, se não permanecer na videira. Vocês também não podem dar fruto, se não permanecerem em mim.' },
      { number: 5, text: 'Eu sou a videira; vocês são os ramos. Se alguém permanecer em mim e eu nele, esse dará muito fruto; pois sem mim vocês não podem fazer coisa alguma.' },
      { number: 7, text: 'Se vocês permanecerem em mim, e as minhas palavras permanecerem em vocês, pedirão o que quiserem, e lhes será concedido.' },
      { number: 9, text: 'Como o Pai me amou, assim eu os amei; permaneçam no meu amor.' },
      { number: 11, text: 'Tenho lhes dito estas palavras para que a minha alegria esteja em vocês e a alegria de vocês seja completa.' },
      { number: 12, text: 'O meu mandamento é este: Amem-se uns aos outros como eu os amei.' },
    ],
  },
  'pv-3': {
    bookId: 'pv',
    bookName: 'Provérbios',
    chapter: 3,
    totalChapters: 31,
    testament: 'AT',
    verses: [
      { number: 1, text: 'Meu filho, não se esqueça da minha lei, mas guarde no coração os meus mandamentos,' },
      { number: 2, text: 'pois eles prolongarão a sua vida por muitos anos e lhe darão prosperidade e paz.' },
      { number: 3, text: 'Que o amor e a fidelidade jamais o abandonem; ate-os ao redor do seu pescoço, escreva-os na tábua do seu coração.' },
      { number: 5, text: 'Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento;' },
      { number: 6, text: 'reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.' },
      { number: 7, text: 'Não seja sábio aos seus próprios olhos; tema o Senhor e evite o mal.' },
      { number: 8, text: 'Isso lhe dará saúde ao corpo e vigor aos ossos.' },
      { number: 9, text: 'Honre o Senhor com todos os seus recursos e com os primeiros frutos de todas as suas plantações;' },
      { number: 10, text: 'os seus celeiros ficarão plenamente cheios, e os seus barris transbordarão de vinho.' },
    ],
  },
  'is-40': {
    bookId: 'is',
    bookName: 'Isaías',
    chapter: 40,
    totalChapters: 66,
    testament: 'AT',
    verses: [
      { number: 1, text: 'Consolem, consolem o meu povo, diz o seu Deus.' },
      { number: 8, text: 'A relva murcha e as flores caem, mas a palavra de nosso Deus permanece para sempre.' },
      { number: 28, text: 'Será que você não sabe? Nunca ouviu falar? O Senhor é o Deus eterno, o Criador de toda a terra. Ele não se cansa nem fica exausto; sua sabedoria é insondável.' },
      { number: 29, text: 'Ele fortalece o cansado e multiplica as forças ao que não tem nenhum vigor.' },
      { number: 30, text: 'Até os jovens se cansam e ficam exaustos, e os rapazes tropeçam e caem;' },
      { number: 31, text: 'mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.' },
    ],
  },
};

export function getChapterData(bookId: string, chapter: number): BibleChapter {
  const key = `${bookId}-${chapter}`;
  if (MOCK_CHAPTERS_DATA[key]) {
    return MOCK_CHAPTERS_DATA[key];
  }

  const book = BIBLE_BOOKS.find((b) => b.id === bookId) || BIBLE_BOOKS[0];
  
  // Realistic fallback generated for any other chapter
  return {
    bookId: book.id,
    bookName: book.name,
    chapter: chapter,
    totalChapters: book.chaptersCount,
    testament: book.testament,
    verses: [
      { number: 1, text: `No princípio da revelação de ${book.name}, capítulo ${chapter}, a graça divina se manifesta com poder e misericórdia.` },
      { number: 2, text: 'Instrua o povo no caminho da justiça, guardando a palavra no íntimo do coração para que haja fruto em abundância.' },
      { number: 3, text: 'Porque a luz resplandece nas trevas, e aquele que busca a sabedoria encontra refúgio sob a sombra do Altíssimo.' },
      { number: 4, text: 'Não desfaleça o vosso ânimo na hora da provação; o Senhor é socorro bem presente na angústia.' },
      { number: 5, text: 'Bendito seja o nome dAquele que reina para sempre, cuja fidelidade alcança as gerações futuras.' },
      { number: 6, text: 'Andai em paz, sede vigilantes na oração e perseverai com espírito humilde e amor fraterno.' },
      { number: 7, text: 'Pois grande é a recompensa reservada para os que colocam a sua confiança no Criador dos céus e da terra.' },
      { number: 8, text: 'A graça, a paz e a alegria do Senhor repousem sobre todos vocês agora e por todos os séculos. Amém.' },
    ],
  };
}
