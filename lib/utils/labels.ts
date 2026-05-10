/**
 * Etichette in italiano per gli enum del CMS.
 * Usate sia nei filtri che nelle schede veicolo.
 */
export const fuelLabels: Record<string, string> = {
  benzina: 'Benzina',
  diesel: 'Diesel',
  gpl: 'GPL',
  metano: 'Metano',
  ibrida: 'Ibrida',
  'ibrida-plug-in': 'Ibrida plug-in',
  elettrica: 'Elettrica',
}

export const transmissionLabels: Record<string, string> = {
  manuale: 'Manuale',
  automatico: 'Automatico',
  semiautomatico: 'Semiautomatico',
}

export const conditionLabels: Record<string, string> = {
  nuovo: 'Nuovo',
  km0: 'Km 0',
  aziendale: 'Aziendale',
  usato: 'Usato',
}

export const bodyTypeLabels: Record<string, string> = {
  berlina: 'Berlina',
  'station-wagon': 'Station Wagon',
  suv: 'SUV',
  crossover: 'Crossover',
  coupe: 'Coupé',
  cabrio: 'Cabrio',
  monovolume: 'Monovolume',
  'city-car': 'City Car',
  'pick-up': 'Pick-up',
}

export const drivetrainLabels: Record<string, string> = {
  anteriore: 'Anteriore',
  posteriore: 'Posteriore',
  integrale: 'Integrale',
}

export const euroLabels: Record<string, string> = {
  'euro-4': 'Euro 4',
  'euro-5': 'Euro 5',
  'euro-6': 'Euro 6',
  'euro-6d': 'Euro 6d',
  'euro-6e': 'Euro 6e',
}

export const statusLabels: Record<string, { label: string; tone: 'success' | 'warn' | 'danger' | 'info' }> = {
  available: { label: 'Disponibile', tone: 'success' },
  reserved: { label: 'Riservato', tone: 'warn' },
  sold: { label: 'Venduto', tone: 'danger' },
  incoming: { label: 'In arrivo', tone: 'info' },
}

export const optionalCategoryLabels: Record<string, string> = {
  comfort: 'Comfort',
  sicurezza: 'Sicurezza',
  multimedia: 'Multimedia',
  esterni: 'Esterni',
  interni: 'Interni',
  'assistenza-guida': 'Assistenza alla guida',
}