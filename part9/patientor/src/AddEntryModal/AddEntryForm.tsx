import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryFormValues, EntryTypes, HealthCheckRating } from '../types';
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from './Entries';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryTypes.HealthCheck,
        specialist: "",
        diagnosisCodes: [],
        description: "",
        healthCheckRating: HealthCheckRating.LowRisk,
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!Date.parse(values.date)) {
          errors.name = "Date is invalid";
        }
        if (!values.specialist) {
          errors.name = requiredError;
        }
        if (values.type === EntryTypes.Hospital) {
          if (!Date.parse(values.discharge.date) || !values.discharge.criteria) {
            errors.name = requiredError;
          }
        }
        if (values.type === EntryTypes.OccupationalHealthcare && !values.employerName) {
          errors.name = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
      return (
        <Form className="form ui">
          <Grid>
            <Grid.Column floated="left">
              <Button type="button" onClick={() => setFieldValue("type", "HealthCheck")}>
                Health check
              </Button>
              <Button type="button" onClick={() => setFieldValue("type", "OccupationalHealthcare")}>
                Occupational health care
              </Button>
              <Button type="button" onClick={() => setFieldValue("type", "Hospital")}>
                Hospital
              </Button>
            </Grid.Column>
          </Grid>
          <h3>Basic information</h3>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          {values.type === "HealthCheck" && <HealthCheckEntry />}
          {values.type === "Hospital" && <HospitalEntry />}
          {values.type === "OccupationalHealthcare" && <OccupationalHealthcareEntry />}
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
    </Formik>
  );
};

export default AddEntryForm;