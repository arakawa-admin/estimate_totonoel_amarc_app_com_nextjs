"use client";
import { Box, Button, ButtonGroup } from "@mui/material";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from "date-fns/locale";
import { addDays, subDays, startOfDay, isBefore, isAfter } from "date-fns";
import { useState } from "react";

export type SelectDateProps = {
    value: Date | null;
    label?: string;
    onChange: (d: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
};

export default function SelectDate({
    value,
    label,
    onChange,
    minDate = subDays(new Date(), 180),
    maxDate = addDays(new Date(), 180),
}: SelectDateProps) {

    const [selectedDate, setSelectedDateState] = useState<Date>(value ?? startOfDay(new Date()));

    const handleChange = (date: Date | null) => {
        if (!date) return;
        const d = startOfDay(date);
        if (selectedDate && d.getTime() === startOfDay(selectedDate).getTime()) return;
        setSelectedDateState(d);
        onChange(d);
    };

    // 日付移動（±1日）
    const goDay = (delta: number) => {
        const base = selectedDate ?? new Date();
        const next = startOfDay(addDays(base, delta));
        if (isBefore(next, startOfDay(minDate)) || isAfter(next, startOfDay(maxDate))) return;
        setSelectedDateState(next);
        onChange(next);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DatePicker
                    label={label ?? undefined}
                    openTo="day"
                    value={value}
                    onChange={handleChange}
                    slotProps={{
                        toolbar: { hidden: true },
                        calendarHeader: { format: "yyyy年MM月" },
                        inputAdornment: { position: "start" },
                    }}
                    // sx={{ m: 1 }}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </LocalizationProvider>

            <ButtonGroup variant="contained" color="primary" size="small" sx={{ ml: 1 }}>
                <Button onClick={() => handleChange(new Date())}>今日</Button>
                <Button onClick={() => goDay(-1)}>
                    <ArrowLeftOutlined />
                </Button>
                <Button onClick={() => goDay(1)}>
                    <ArrowRightOutlined />
                </Button>
            </ButtonGroup>
        </Box>
    );
}
