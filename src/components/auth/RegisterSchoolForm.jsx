// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Material UI components
import { Box, TextField, Typography, Button } from '@mui/material';

// Custom components
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';
import schoolIcon from '../../assets/icon/schoolIcon.png';

// Validator
import { RegisterSchoolValidator } from '../../validators/validationSchemas';

const RegisterSchoolForm = ({ onClickBack, onFormChange, onSubmit }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  // New state to track submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchoolValidator),
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData) {
      setValue('name', formData.school_name);
      setValue('phone_number', formData.school_phone_number);
      setValue('address', formData.school_address);
    }
  }, [formData, setValue]);

  const handleFormSubmit = async (data) => {
    const formattedData = {
      ...formData,
      school_name: data.school_name,
      school_phone_number: data.school_phone_number,
      school_address: data.school_address,
    };

    dispatch(updateFormData(formattedData)); // Update Redux with form data

    if (onFormChange) {
      onFormChange(formattedData);
    }

    if (onSubmit) {
      setIsSubmitting(true); // Set to true when submission starts
      await onSubmit(); // Wait for the API call
      setIsSubmitting(false); // Set back to false when done
    }
  };

  return (
    <Box sx={containerStyles}>
      <GoBackButton handleOnClick={onClickBack} />
      <HeaderTitle
        title="Introduce Your School to WaveTrack"
        subTitle="Provide the information to begin your journey."
        center
      >
        <Box
          component="img"
          src={schoolIcon}
          sx={{ display: 'flex', alignSelf: 'center', maxWidth: '100px' }}
        />
      </HeaderTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School&apos;s Name</Typography>
            <TextField
              placeholder="School's name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School Phone Number</Typography>
            <TextField
              placeholder="School Phone number"
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />
          </Box>
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School Address</Typography>
            <TextField
              multiline
              minRows={5}
              placeholder="Phnom Penh, Street 210, ..."
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting} // Disable while submitting
          >
            {isSubmitting ? 'Starting Now' : 'Start Now'}{' '}
            {/* Conditionally render button text */}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterSchoolForm;

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 3, md: 4 },
};

const inputContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};
