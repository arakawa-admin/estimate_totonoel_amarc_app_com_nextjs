"use client";

import { FormControl, TextField } from "@mui/material";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { CSSProperties } from "react";

type RHFField = ControllerRenderProps<FieldValues, string>;

type Props = Partial<RHFField> & {
    label?: string;
    sx?: CSSProperties | object;
    step?: number;
    min?: number;
    max?: number;
    errorText?: string;
};

export default function NumberInputField({
    value,
    onChange,
    onBlur,
    ref: fieldRef,
    label,
    sx = { mt: 0 },
    step = 1,
    min,
    max,
    errorText,
}: Props) {
    return (
        <FormControl fullWidth sx={sx} error={!!errorText}>
            <TextField
                type="number"
                label={label ?? ""}
                inputRef={fieldRef}
                onBlur={onBlur}
                value={value ?? ""} // uncontrolled→controlled警告を防止
                onChange={(e) => {
                    const v = e.target.value;
                    onChange?.(v === "" ? "" : Number(v));
                }}
                slotProps={{
                    input: {
                        inputProps: {
                            step,
                            min,
                            max,
                        }
                    }
                }}
                error={!!errorText}
                helperText={errorText}
            />
        </FormControl>
    );
}
