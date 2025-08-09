"use client";

import { FormControl, Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import { getMasterAbstracts } from "@/app/actions/masterAbstract";
import type { MasterAbstractType } from "@/schemas/masterAbstractSchema";

/** 親の Controller から渡される field をそのまま受け取る Props */
type RHFField = ControllerRenderProps<FieldValues, string>;

type Props = Partial<RHFField> & {
    label?: string;
    sx?: object;
    /** 親の fieldState.error?.message を渡したい場合に使う */
    errorText?: string;
};

export default function AbstractSelectField({
    value,
    onChange,
    onBlur,
    // name,                 // 使わなくても受け取ってOK
    ref: fieldRef,        // ← 親の field.ref。TextField の inputRef に渡す
    label = "摘要",
    sx,
    errorText,
}: Props) {
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const data: MasterAbstractType[] = await getMasterAbstracts();
            setOptions(data.map((d) => d.name));
            // 値が未設定なら最初の候補を初期値に（不要なら削除）
            if ((value == null || value === "") && data.length > 0) {
                onChange?.(data[0].name);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FormControl fullWidth sx={sx}>
            <Autocomplete
                freeSolo
                options={options}
                value={(value as string) ?? ""}
                isOptionEqualToValue={(opt, v) => opt === v}
                onChange={(_, newValue) => onChange?.((newValue ?? "") as string)}
                onInputChange={(_, newInput) => onChange?.(newInput)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        inputRef={fieldRef}
                        onBlur={onBlur}
                        error={!!errorText}
                        helperText={errorText}
                    />
                )}
            />
        </FormControl>
    );
}
