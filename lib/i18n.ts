export const locales = ["sq", "en", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sq";

export const copy = {
  sq: {
    nav: {
      buy: "Blej",
      rent: "Me qira",
      sell: "Shit",
      search: "Kërko",
      create: "Shto listing",
      dashboard: "Paneli",
      admin: "Admin",
      about: "Rreth nesh",
      how: "Si funksionon",
      agents: "Agjentët",
      guides: "Guidat"
    },
    home: {
      headline: "Marketplace i pasurive të paluajtshme në Shqipëri",
      subheadline: "Gjej apartamente, shtëpi, toka dhe prona komerciale me kërkim të avancuar dhe agjentë të verifikuar.",
      ctaPrimary: "Kërko prona",
      ctaSecondary: "Listo pronën",
      searchPlaceholder: "Shkruaj qytetin ose zonën",
      featured: "Të veçuara",
      recent: "Sapo publikuar",
      guides: "Udhëzime për blerësit",
      popularCities: "Qytete të njohura"
    },
    listing: {
      contactAgent: "Kontakto agjentin",
      save: "Ruaj",
      share: "Ndaj",
      details: "Detajet",
      amenities: "Lehtësira",
      location: "Vendndodhja",
      similar: "Prona të ngjashme",
      estimate: "Vlerësim pagese",
      leadTitle: "Interesoheni për këtë pronë?"
    },
    forms: {
      name: "Emri",
      email: "Email",
      phone: "Telefon",
      message: "Mesazh",
      submit: "Dërgo kërkesën",
      success: "Kërkesa u dërgua me sukses."
    },
    search: {
      title: "Kërko prona",
      results: "Rezultate",
      map: "Harta",
      list: "Lista",
      empty: "Nuk u gjetën prona që përputhen."
    },
    dashboard: {
      title: "Paneli i agjentit",
      listings: "Listimet e mia",
      leads: "Kërkesat",
      plan: "Plani"
    },
    admin: {
      title: "Paneli admin",
      pending: "Në pritje të miratimit",
      users: "Përdoruesit",
      reports: "Raportimet"
    }
  },
  en: {
    nav: {
      buy: "Buy",
      rent: "Rent",
      sell: "Sell",
      search: "Search",
      create: "Create listing",
      dashboard: "Dashboard",
      admin: "Admin",
      about: "About",
      how: "How it works",
      agents: "Agents",
      guides: "Guides"
    },
    home: {
      headline: "Albania's premium real-estate marketplace",
      subheadline: "Discover apartments, houses, land, and commercial spaces with trusted agents and smart search.",
      ctaPrimary: "Search listings",
      ctaSecondary: "List your property",
      searchPlaceholder: "City or neighborhood",
      featured: "Featured",
      recent: "Recently added",
      guides: "Buyer guides",
      popularCities: "Popular cities"
    },
    listing: {
      contactAgent: "Contact agent",
      save: "Save",
      share: "Share",
      details: "Details",
      amenities: "Amenities",
      location: "Location",
      similar: "Similar listings",
      estimate: "Payment estimate",
      leadTitle: "Interested in this home?"
    },
    forms: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send request",
      success: "Your request has been sent."
    },
    search: {
      title: "Search listings",
      results: "Results",
      map: "Map",
      list: "List",
      empty: "No listings match your filters yet."
    },
    dashboard: {
      title: "Agent dashboard",
      listings: "My listings",
      leads: "Leads",
      plan: "Plan"
    },
    admin: {
      title: "Admin dashboard",
      pending: "Pending approvals",
      users: "Users",
      reports: "Reports"
    }
  },
  it: {
    nav: {
      buy: "Compra",
      rent: "Affitto",
      sell: "Vendi",
      search: "Cerca",
      create: "Crea annuncio",
      dashboard: "Dashboard",
      admin: "Admin",
      about: "Chi siamo",
      how: "Come funziona",
      agents: "Agenti",
      guides: "Guide"
    },
    home: {
      headline: "Marketplace immobiliare premium in Albania",
      subheadline: "Trova appartamenti, case, terreni e spazi commerciali con ricerca avanzata.",
      ctaPrimary: "Cerca annunci",
      ctaSecondary: "Inserisci proprietà",
      searchPlaceholder: "Città o quartiere",
      featured: "In evidenza",
      recent: "Aggiunti di recente",
      guides: "Guide",
      popularCities: "Città popolari"
    },
    listing: {
      contactAgent: "Contatta l'agente",
      save: "Salva",
      share: "Condividi",
      details: "Dettagli",
      amenities: "Servizi",
      location: "Posizione",
      similar: "Annunci simili",
      estimate: "Stima pagamento",
      leadTitle: "Interessato a questa proprietà?"
    },
    forms: {
      name: "Nome",
      email: "Email",
      phone: "Telefono",
      message: "Messaggio",
      submit: "Invia richiesta",
      success: "Richiesta inviata con successo."
    },
    search: {
      title: "Cerca annunci",
      results: "Risultati",
      map: "Mappa",
      list: "Lista",
      empty: "Nessun annuncio corrisponde ai filtri."
    },
    dashboard: {
      title: "Dashboard agente",
      listings: "I miei annunci",
      leads: "Richieste",
      plan: "Piano"
    },
    admin: {
      title: "Dashboard admin",
      pending: "In attesa di approvazione",
      users: "Utenti",
      reports: "Segnalazioni"
    }
  }
} as const;

export const getCopy = (locale: Locale) => copy[locale] ?? copy[defaultLocale];
