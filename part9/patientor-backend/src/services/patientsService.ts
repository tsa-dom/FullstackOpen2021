import patients from '../../data/patients';
import { NewPatientEntry, PublicPatient, Patient, PublicData, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }: PublicData) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...entry,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( patientId: string, entry: EntryWithoutId ): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return undefined;
  const id: string = uuid();

  const newEntry = {
    id,
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addEntry
};