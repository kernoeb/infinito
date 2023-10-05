const topics = [
  {
    id: 'music',
    title: 'Musique',
    iconName: 'uil:music',
    customClass: {
      'bg-pink-300': true
    },
    borderClass: {
      'border-pink-300': true
    },
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
    id: 'ia-ml',
    title: 'IA & ML',
    iconName: 'uil:robot',
    customClass: {
      'bg-blue-300': true
    },
    borderClass: {
      'border-blue-300': true
    },
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
    id: 'dev',
    title: 'Développement',
    iconName: 'uil:code',
    customClass: {
      'bg-indigo-300': true
    },
    borderClass: {
      'border-indigo-300': true
    },
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
    id: 'cybersecurity-osint',
    title: 'Cybersécurité & OSINT',
    iconName: 'uil:shield',
    customClass: {
      'bg-green-300': true
    },
    borderClass: {
      'border-green-300': true
    },
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
    id: 'languages',
    title: 'Langues',
    iconName: 'uil:language',
    customClass: {
      'bg-yellow-300': true
    },
    borderClass: {
      'border-yellow-300': true
    },
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
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Confidentialité',
    iconName: 'uil:lock',
    customClass: {
      'bg-purple-300': true
    },
    borderClass: {
      'border-purple-300': true
    },
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
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI & UX',
    iconName: 'uil:web-grid',
    customClass: {
      'bg-orange-300': true
    },
    borderClass: {
      'border-orange-300': true
    },
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
]

for (const topic of topics) {
  topic.websites.sort((a, b) => a.title.localeCompare(b.title))
}

export default topics
