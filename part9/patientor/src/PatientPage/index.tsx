import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Entry, EntryFormValues, Gender, Patient } from '../types';
import EntryDetails from './EntryDetails';

const GenderIcon = ({gender}: {gender: Gender}): JSX.Element => {
  if (gender === 'female') return <Icon name='venus' />;
  else if (gender === 'male') return <Icon name='mars' />;
  else return <Icon name='venus mars' />;
};

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();
  const patient = patients[id];
  if (!patient) return <div>No data found</div>;

  const fetchData = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patient));
    } catch (e) {
      console.error(e);
    }
  };

  if (!patient.ssn || !patient.dateOfBirth || !patient.entries) {
    void fetchData(id);
  }

  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      patient.entries.push(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || `'Unknown error'`);
    }
  };

  return (
    <div>
      <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>Entries</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      {patient.entries?.map(entry => 
        <EntryDetails key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default PatientPage;