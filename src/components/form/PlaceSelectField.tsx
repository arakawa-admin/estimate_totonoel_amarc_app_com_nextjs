"use client";

import {
    FormControl,
    Autocomplete,
    FormHelperText,
    TextField,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { MasterPlaceType } from "@/schemas/masterPlaceSchema";
import { EstimateCreateInput } from "@/schemas/estimateSchema";

import { getMasterPlaces } from "@/app/actions/masterPlace";

type Props = {
    name?: "place";
    label?: string;
    labelId?: string;
    sx?: object;
};

export default function PlaceSelectField({
    name="place",
    label,
    sx = { mb: 0 },
}: Props) {

    const {
        control,
        formState: { errors },
        setValue,
        getValues
    } = useFormContext<EstimateCreateInput>();

    const [places, setPlaces] = useState<MasterPlaceType[]>([]);
    useEffect(() => {
        (async () => {
            const data = await getMasterPlaces();
            setPlaces(data);
            if (!getValues(name) && data.length > 0) {
                setValue(name, data[0].name, { shouldValidate: true });
            }
        })();
    }, [setValue, getValues, name]);

        return (
        <FormControl fullWidth error={!!errors[name]} sx={sx}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                <Autocomplete
                    freeSolo
                    options={places.map((place) => place.name)}
                    isOptionEqualToValue={(option, value) => option === value}
                    value={field.value ?? ""}
                    // 選択時
                    onChange={(_, newValue) => {
                        field.onChange((newValue ?? "") as string);
                    }}
                    // 入力中も即時反映（不要なら削ってOK）
                    onInputChange={(_, newInputValue) => {
                        field.onChange(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                        />
                    )}
                />
                )}
            />
            {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
        </FormControl>
    );
}
