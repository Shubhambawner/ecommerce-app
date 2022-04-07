import { Controller, useForm } from 'react-hook-form';

const { handleSubmit, control, reset, formState: { errors } } = useForm();

const onSubmit = React.useCallback((values) => {
    console.log(values);
    reset();
}, []);
<form onSubmit={handleSubmit(onSubmit)}>
    <Controller
        render={({ field: { name, value, onChange } }) => (
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                // or shorter {...field}
                label={fields.firstName.label}
                error={Boolean(errors[fields.firstName.name])}
                helperText={errors[fields.firstName.name] ? errors[fields.firstName.name].message : ''}
            />
        )}
        control={control}
        name={fields.firstName.name}
        defaultValue=""
        rules={{ required: { value: true, message: 'Invalid input' } }}
    />
</form>