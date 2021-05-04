import { NewPatientEntry, Gender, Entry, EntryWithoutId, HealthCheckRating } from './types';

const isString = (str: unknown): str is string => {
  return (typeof str === 'string' || str instanceof String);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Missing or incorrect name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Missing or incorrect occupation');
  }
  return occupation;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Missing or incorrect date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Invalid gender' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Missing or incorrect snn');
  }
  return ssn;
};

type PatientInfo = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  entries: Entry[],
  occupation: unknown
};

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, entries, occupation }: PatientInfo): NewPatientEntry => {
  const entry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    entries: entries,
    occupation: parseOccupation(occupation),
  };

  return entry;
};

type EntryInfo = {
  date: unknown,
  type: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
  description: unknown,
  discharge: {
    date: unknown,
    criteria: unknown,
  }
  employerName: unknown,
  sickLeave: {
    startDate: unknown,
    endDate: unknown,
  }
  healthCheckRating: unknown,
};

const isStringArray = (array: unknown): array is string[] => {
  return (
    Array.isArray(array) && array.every(item => typeof item === 'string' || item instanceof String)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Invalid health check rating');
  }
  return rating;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Missing or incorrect data');
  }
  return str;
};

const parseStringArray = (array: unknown): string[] => {
  if (!isStringArray(array)) {
    throw new Error('Missing or incorrect data');  
  }
  return array;
};

const isEmptySickLeave = ({ startDate, endDate }: { startDate: unknown, endDate: unknown}): boolean => {
  if (isString(startDate) && startDate.length > 0) return false;
  if (isString(endDate) && endDate.length > 0) return false;
  return true;
};

export const toNewEntry = ({ date, type, specialist, diagnosisCodes, description, discharge, employerName, sickLeave, healthCheckRating }: EntryInfo): EntryWithoutId => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Missing or incorrect date: ${date}`);
  }
  const basicData = {
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: parseStringArray(diagnosisCodes),
    description: parseString(description),
    type: parseString(type),
  };

  switch(type) {
    case 'Hospital':
      return {
        ...basicData,
        type,
        discharge: {
          criteria: parseString(discharge.criteria),
          date: parseDate(discharge.date),
        }
      };
    case 'HealthCheck':
      return {
        ...basicData,
        type,
        healthCheckRating: parseRating(healthCheckRating)
      };
    case 'OccupationalHealthcare':
      const entry = {
        ...basicData,
        type,
        employerName: parseString(employerName)
      };
      if (!isEmptySickLeave(sickLeave)) {
        return {
          ...entry,
          sickLeave: {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)
        }};
      }
      return entry;
  }
  throw new Error('Invalid entry');
};
