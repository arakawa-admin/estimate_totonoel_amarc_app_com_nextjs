"use client";

import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
    name: string;
    label?: string;
    sx?: object;
};

export default function TextInputField({
    name,
    label,
    sx = { mt: 0 },
}: Props) {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FormControl fullWidth error={!!errors[name]} sx={sx}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                    <TextField
                        value={field.value}
                        label={label ?? ""}
                        {...register(name)}
                        />
                    {fieldState.error && (
                        <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                    </>
                )}
            />
        </FormControl>
    );
}
