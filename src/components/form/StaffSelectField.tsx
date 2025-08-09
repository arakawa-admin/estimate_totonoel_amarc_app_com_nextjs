"use client";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MasterStaffType } from "@/schemas/masterStaffSchema";
import { EstimateCreateInput } from "@/schemas/estimateSchema";

import { getMasterStaffs } from "@/app/actions/masterStaff";

type Props = {
    name?: "staff_id";
    label?: string;
    labelId?: string;
    sx?: object;
};

export default function StaffSelectField({
    name = "staff_id",
    label = "担当者",
    labelId = "staff-label",
    sx = { mb: 0 },
}: Props) {

    const {
        register,
        watch,
        formState: { errors },
        setValue,
    } = useFormContext<EstimateCreateInput>();

    const value = watch(name) ?? "";

    const [staffs, setStaffs] = useState<MasterStaffType[]>([]);
    useEffect(() => {
        (async () => {
            const data = await getMasterStaffs();
            setStaffs(data);
            if (data.length > 0) {
                setValue("staff_id", data[0].id);
            }
        })();
    }, [setValue]);

    return (
        <FormControl fullWidth error={!!errors[name]} sx={sx}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                label={label}
                defaultValue=""
                value={value}
                {...register(name)}
            >
                {staffs.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                        {staff.name}
                    </MenuItem>
                ))}
            </Select>
            {errors[name] && (
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            )}
        </FormControl>
    );
}
