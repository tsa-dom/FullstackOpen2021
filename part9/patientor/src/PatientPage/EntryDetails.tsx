import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from '../types';

const Diagnoses = ({ diagnosisCodes }: { diagnosisCodes: string[] | undefined }) => {
  const [{ diagnoses }] = useStateValue();
  if (!diagnosisCodes) return null;
  
  return (
    <div>
      <h5>Diagnoses:</h5>
      <ul>
        {diagnosisCodes?.map(code => 
          <li style={{ fontStyle: 'italic' }} key={code}>{code} {diagnoses[code].name}</li>
        )}
      </ul>
    </div>
  );
};

const HealthRating = ({ rating }: { rating: HealthCheckRating }) => {
  if (rating === HealthCheckRating.Healthy) return <Icon color='green' name='heart' />;
  else if (rating === HealthCheckRating.LowRisk) return <Icon color='yellow' name='heart' />;
  else if (rating === HealthCheckRating.HighRisk) return <Icon color='red' name='heart' />;
  else return <Icon color='red' name='heartbeat' />;
};

const assertNever = (value: Entry): never => {
  throw new Error(
    `Error: ${JSON.stringify(value)}`
  );
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Segment>
      <h4>{entry.date} <Icon size='big' name='hospital' /></h4>
      <div style={{ fontStyle: 'italic' }}>
        <p>{entry.description}</p>
        <p>{entry.discharge.date} {entry.discharge.criteria}</p>
        <p></p>
      </div>
      <Diagnoses diagnosisCodes={entry.diagnosisCodes} />
    </Segment>
  );
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Segment>
      <h4>{entry.date} <Icon size='big' name='stethoscope' /> {entry.employerName}</h4>
      <div style={{ fontStyle: 'italic' }}>
        <p>{entry.description}</p>
        {entry.sickLeave && 
          <p>Sickness period: {entry?.sickLeave?.startDate} to {entry.sickLeave?.endDate}</p>
        }
        <p></p>
      </div>
      <Diagnoses diagnosisCodes={entry.diagnosisCodes} />
    </Segment>
  );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Segment>
      <h4>{entry.date} <Icon size='big' name='user md' /></h4>
      <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
      <Diagnoses diagnosisCodes={entry.diagnosisCodes} />
      <HealthRating rating={entry.healthCheckRating} />
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;