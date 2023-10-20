import { toLowerCase, replaceAll } from 'strz'

enum TopicId {
  Games = 'games',
  Music = 'music',
  IaMl = 'ia-ml',
  Dev = 'dev',
  CybersecurityOsint = 'cybersecurity-osint',
  Languages = 'languages',
  Privacy = 'privacy',
  UiUx = 'ui-ux'
}

interface Website {
  title: string;
  url: string;
  keywords: string[];
  description: string;
  uniqueId: `${TopicId}-${Lowercase<string>}`;
}

interface Topic {
  id: TopicId;
  title: string;
  iconName: string;
  customClass: any;
  borderClass: any;
  color: string;
  websites: Website[];
}

const getWebsite = (topicId: TopicId, website: Omit<Website, 'uniqueId'>): Website => {
  const slug = toLowerCase(replaceAll(website.title, ' ', '-'))
  return {
    ...website,
    uniqueId: `${topicId}-${slug}`
  }
}

const topics: Topic[] = [
  {
    id: TopicId.Games,
    title: 'Jeux',
    iconName: 'uil:golf-ball',
    customClass: {
      'bg-red-300': true
    },
    borderClass: {
      'border-red-300': true
    },
    color: 'red',
    websites: [
      {
        title: 'Wordle',
        url: 'https://wordle.louan.me',
        keywords: ['mot du jour'],
        description: 'Mot du jour - Motus'
      },
      {
        title: 'Jumblie',
        url: 'https://jumblie.com/',
        keywords: ['mot du jour', 'anglais'],
        description: 'Thème du jour (anglais)'
      },
      {
        title: 'Sutom',
        url: 'https://sutom.nocle.fr',
        keywords: ['motus', 'pendu', 'mot du jour'],
        description: 'Mot du jour - Motus'
      },
      {
        title: 'LeMot',
        url: 'https://solitaire-play.com/lemot',
        keywords: ['motus', 'pendu', 'mot du jour'],
        description: 'Mot du jour - Motus'
      },
      {
        title: 'Tusmo',
        url: 'https://www.tusmo.xyz',
        keywords: ['motus', 'pendu', 'mot du jour'],
        description: 'Mot du jour - Motus'
      },
      {
        title: 'Cemantix',
        url: 'https://cemantix.certitudes.org',
        keywords: ['sémantique', 'mot du jour'],
        description: 'Mot du jour - Sémantique'
      },
      {
        title: 'Pedantix',
        url: 'https://pedantix.certitudes.org',
        keywords: ['sémantique', 'wikipédia'],
        description: 'Page Wikipédia du jour - Sémantique'
      },
      {
        title: 'Nerdle',
        url: 'https://nerdlegame.com',
        keywords: ['calcul mental', 'calcul du jour'],
        description: 'Calcul mental'
      },
      {
        title: 'SauteCanton',
        url: 'https://sautecanton.fr',
        keywords: ['géographie', 'ville'],
        description: 'Trouver la ville la grande ville'
      },
      {
        title: 'Drapeau du Jour',
        url: 'https://drapeaudujour.noewen.com',
        keywords: ['drapeau du jour', 'géographie'],
        description: 'Connaissez-vous les drapeaux du monde ? ⭐'
      },
      {
        title: 'Worldle',
        url: 'https://worldle.teuteuf.fr',
        keywords: ['pays du jour', 'géographie'],
        description: 'Pays et capitales du jour'
      },
      {
        title: 'WhereTaken',
        url: 'https://wheretaken.teuteuf.fr',
        keywords: ['géographie', 'photo du jour'],
        description: 'Reconnaissance de lieux à partir de photos'
      },
      {
        title: 'Chronophoto',
        url: 'https://www.chronophoto.app',
        keywords: ['photo du jour'],
        description: 'Trouver la date d\'une photo'
      },
      {
        title: 'TimeGuessr',
        url: 'https://www.timeguessr.com',
        keywords: ['géographie', 'photo du jour'],
        description: 'Trouver la date et le lieu d\'une photo'
      },
      {
        title: 'GeoGuessr',
        url: 'https://www.geoguessr.com',
        keywords: ['géographie'],
        description: 'Saurez-vous trouver où vous êtes ?'
      },
      {
        title: 'Neal.fun',
        url: 'https://neal.fun/',
        keywords: ['jeux', 'games'],
        description: 'Jeux interactifs'
      }
    ]
  },
  {
    id: TopicId.Music,
    title: 'Musique',
    iconName: 'uil:music',
    customClass: {
      'bg-pink-300': true
    },
    borderClass: {
      'border-pink-300': true
    },
    color: 'mediumvioletred',
    websites: [
      {
        title: 'WhoSampled',
        url: 'https://www.whosampled.com/',
        keywords: ['samples'],
        description: 'Samples de musiques'
      },
      {
        title: 'Song Finder',
        url: 'https://aha-music.com/',
        keywords: ['shazam'],
        description: 'Recherche de musique'
      }
    ]
  },
  {
    id: TopicId.IaMl,
    title: 'IA & ML',
    iconName: 'uil:robot',
    customClass: {
      'bg-blue-300': true
    },
    borderClass: {
      'border-blue-300': true
    },
    color: 'blue',
    websites: [
      {
        title: 'Perplexity',
        url: 'https://perplexity.ai/',
        keywords: ['gpt', 'llm'],
        description: 'Moteur de recherche'
      },
      {
        title: 'Poe.com',
        url: 'https://poe.com/',
        keywords: ['gpt'],
        description: 'Moteur de recherche et générateur de texte'
      },
      {
        title: 'ChatbotUI',
        url: 'https://chatbotui.com/',
        keywords: ['gpt', 'ChatGPT'],
        description: 'Interface pour ChatGPT'
      },
      {
        title: 'Leonardo',
        url: 'https://app.leonardo.ai/ai-generations',
        keywords: ['image generation', 'génération d\'images'],
        description: 'Génération d\'images'
      },
      {
        title: 'Recraft.ai',
        url: 'https://app.recraft.ai/',
        keywords: ['image generation', 'génération d\'images', 'logo'],
        description: 'Génération de logos'
      }
    ]
  },
  {
    id: TopicId.Dev,
    title: 'Développement',
    iconName: 'uil:code',
    customClass: {
      'bg-indigo-300': true
    },
    borderClass: {
      'border-indigo-300': true
    },
    color: 'indigo',
    websites: [
      {
        title: 'Refined GitHub',
        url: 'https://github.com/refined-github/refined-github',
        keywords: ['github', 'git', 'extension'],
        description: 'Extension pour GitHub'
      },
      {
        title: 'JSON Viewer',
        url: 'https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh',
        keywords: ['json', 'extension', 'chrome'],
        description: 'Extension Chrome pour afficher du JSON'
      },
      {
        title: 'Orbstack',
        url: 'https://orbstack.dev/',
        keywords: ['docker', 'macOS'],
        description: 'Docker pour macOS'
      },
      {
        title: 'Typora',
        url: 'https://typora.io/',
        keywords: ['markdown', 'éditeur', 'editor'],
        description: 'Éditeur Markdown'
      }
    ]
  },
  {
    id: TopicId.CybersecurityOsint,
    title: 'Cybersécurité & OSINT',
    iconName: 'uil:shield',
    customClass: {
      'bg-green-300': true
    },
    borderClass: {
      'border-green-300': true
    },
    color: 'green',
    websites: [
      {
        title: 'GTFOBins',
        url: 'https://gtfobins.github.io/',
        keywords: ['ctf', 'vulnérabilité', 'vulnerability'],
        description: 'Liste de binaires avec des vulnérabilités'
      },
      {
        title: 'AperiSolve',
        url: 'https://aperisolve.com/',
        keywords: ['ctf', 'stéganographie', 'steganography'],
        description: 'Stéganographie'
      },
      {
        title: 'FotoForensics',
        url: 'https://fotoforensics.com/',
        keywords: ['ctf', 'stéganographie', 'steganography'],
        description: 'Stéganographie'
      },
      {
        title: 'Decompiler Explorer',
        url: 'https://dogbolt.org/',
        keywords: ['DogBolt', 'decompiler'],
        description: 'Décompilateur en ligne'
      },
      {
        title: 'CyberChef',
        url: 'https://gchq.github.io/CyberChef/',
        keywords: ['ctf', 'cryptography', 'encoding'],
        description: 'Cryptographie, encodage, etc.'
      },
      {
        title: 'HackTricks',
        url: 'https://book.hacktricks.xyz/',
        keywords: ['ctf', 'pentest', 'hack'],
        description: 'CTF, pentest, hacking'
      },
      {
        title: 'Forebears',
        url: 'https://forebears.io/',
        keywords: ['généalogie', 'genealogy'],
        description: 'Généalogie'
      },
      {
        title: 'PimEyes',
        url: 'https://pimeyes.com/',
        keywords: ['face recognition', 'reconnaissance faciale'],
        description: 'Reconnaissance faciale'
      },
      {
        title: 'Subdomain Finder',
        url: 'https://subdomainfinder.c99.nl/',
        keywords: ['subdomains', 'sous-domaines'],
        description: 'Recherche de sous-domaines'
      },
      {
        title: 'Overpass Turbo',
        url: 'https://overpass-turbo.eu/',
        keywords: ['maps', 'geo', 'geography', 'géographie'],
        description: 'Recherche sur OpenStreetMap'
      },
      {
        title: 'PredictaSearch',
        url: 'https://predictasearch.com/',
        keywords: ['footprint'],
        description: 'Recherche OSINT'
      },
      {
        title: 'Pappers',
        url: 'https://www.pappers.fr/',
        keywords: ['entreprises'],
        description: 'Informations sur les entreprises'
      },
      {
        title: 'PayloadAllTheThings',
        url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/',
        keywords: ['ctf', 'pentest', 'hack'],
        description: 'CTF, pentest, hacking'
      }
    ]
  },
  {
    id: TopicId.Languages,
    title: 'Langues',
    iconName: 'uil:language',
    customClass: {
      'bg-yellow-300': true
    },
    borderClass: {
      'border-yellow-300': true
    },
    color: '#fdff00',
    websites: [
      {
        title: 'YouGlish',
        url: 'https://youglish.com/',
        keywords: ['prononciation', 'pronunciation', 'youtube'],
        description: 'Prononciation des mots (YouTube)'
      },
      {
        title: 'WordReference',
        url: 'https://www.wordreference.com/',
        keywords: ['dictionnaire', 'dictionary', 'traduction', 'translation'],
        description: 'Dictionnaire multilingue'
      },
      {
        title: 'Pronounce',
        url: 'https://app.getpronounce.com/',
        keywords: ['prononciation', 'pronunciation', 'gpt'],
        description: 'Prononciation des mots (IA)'
      }
    ]
  },
  {
    id: TopicId.Privacy,
    title: 'Confidentialité',
    iconName: 'uil:lock',
    customClass: {
      'bg-purple-300': true
    },
    borderClass: {
      'border-purple-300': true
    },
    color: 'purple',
    websites: [
      {
        title: 'Bitwarden',
        url: 'https://bitwarden.com/',
        keywords: ['mots de passe', 'mdp', 'passwords'],
        description: 'Gestionnaire de mots de passe'
      },
      {
        title: 'PrivacyGuides',
        url: 'https://privacyguides.org/',
        keywords: ['privacy'],
        description: 'Guides de confidentialité'
      },
      {
        title: 'What every Browser knows about you',
        url: 'https://webkay.robinlinus.com/',
        keywords: ['privacy', 'navigateur', 'browser'],
        description: 'Ce que votre navigateur sait de vous'
      },
      {
        title: 'Windscribe',
        url: 'https://windscribe.com/',
        keywords: ['vpn'],
        description: 'VPN'
      },
      {
        title: 'ProtonMail',
        url: 'https://protonmail.com/',
        keywords: ['mail', 'email'],
        description: 'Messagerie chiffrée'
      },
      {
        title: 'StevenBlack Hosts',
        url: 'https://github.com/StevenBlack/hosts',
        keywords: ['hosts', 'adblock', 'publicités', 'ads', 'trackers'],
        description: 'Liste de blocage des publicités et des trackers'
      },
      {
        title: 'SponsorBlock',
        url: 'https://sponsor.ajay.app/',
        keywords: ['youtube', 'publicités', 'ads'],
        description: 'Suppression des publicités sur YouTube'
      },
      {
        title: 'Terms of Service; Didn\'t Read',
        url: 'https://tosdr.org/',
        keywords: ['terms of service', 'conditions d\'utilisation'],
        description: 'Conditions d\'utilisation des sites'
      }
    ]
  },
  {
    id: TopicId.UiUx,
    title: 'UI & UX',
    iconName: 'uil:web-grid',
    customClass: {
      'bg-orange-300': true
    },
    borderClass: {
      'border-orange-300': true
    },
    color: 'darkorange',
    websites: [
      {
        title: 'icons8',
        url: 'https://icons8.com/',
        keywords: ['icons', 'icônes'],
        description: 'Icônes'
      },
      {
        title: 'LordIcon',
        url: 'https://lordicon.com/',
        keywords: ['icons', 'icônes', 'animation'],
        description: 'Icônes animées'
      },
      {
        title: 'SimpleIcons',
        url: 'https://simpleicons.org/',
        keywords: ['icons', 'icônes'],
        description: 'Icônes'
      }
    ]
  }
].map((topic) => ({
  ...topic,
  websites: topic.websites.map((website) => getWebsite(topic.id, website))
}))

for (const topic of topics) {
  topic.websites.sort((a, b) => a.title.localeCompare(b.title))
}

export default topics
