export interface CSVLine {
  day: string;
  locationDe: string;
  locationIt: string;
  streetDe: string;
  streetIt: string;
}

export interface ILanguage {
  location: string;
  street: string;
}

export interface IDateEntry {
  day: Date;
  german: ILanguage;
  italian: ILanguage;
}
