import { Field } from 'formik';
import React from 'react';
import { NumberField, TextField } from '../AddPatientModal/FormField';

export const OccupationalHealthcareEntry = () => {
  return (
    <div>
      <h3>Sickness period</h3>
        <Field
          label="Employer name"
          placeholder="Name"
          name="employerName"
          component={TextField}
        />
        <Field
          label="Start date (optional)"
          placeholder="YYYY-MM-DD"
          name="sickLeave.startDate"
          component={TextField}
        />
        <Field 
          label="End date (optional)"
          placeholder="YYYY-MM-DD"
          name="sickLeave.endDate"
          component={TextField}
        />
      <p></p>
    </div>
  );
};

export const HealthCheckEntry = () => {
  return (
    <Field
      label="Healt Rating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  );
};

export const HospitalEntry = () => {
  return (
    <div>
      <h3>Discharge:</h3>
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Criteria"
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
      />
      <p></p>
    </div>
  );
};