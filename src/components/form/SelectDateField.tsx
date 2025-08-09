"use client";

import { FormControl, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import SelectDate from "@/components/SelectDate";

type Props = {
    name: string;
    label?: string;
    minDate?: Date;
    maxDate?: Date;
    sx?: object;
};

export default function SelectDateField({
    name,
    label,
    minDate,
    maxDate,
    sx,
}: Props) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormControl fullWidth error={!!errors[name]} sx={sx}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <SelectDate
                            value={field.value}
                            label={label ?? ""}
                            onChange={field.onChange}
                            minDate={minDate ?? undefined}
                            maxDate={maxDate ?? undefined}
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
