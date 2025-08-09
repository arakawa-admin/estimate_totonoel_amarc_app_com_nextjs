"use client";

import {
    Table, TableHead, TableRow, TableCell, TableBody,
    IconButton, Button,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
    Controller,
    useFormContext,
    useFieldArray,
    useWatch,
} from "react-hook-form";
import * as React from "react";
// import { z } from "zod";
import {
    // estimateDetailCreateSchema,
    EstimateDetailCreateInput
} from "@/schemas/estimateDetailSchema";

import UnitSelectField from "./UnitSelectField";
import NormSelectField from "./NormSelectField";
import AbstractSelectField from "./AbstractSelectField";
import NumberInputField from "./NumberInputField";

// type LineItem = Omit<
//     z.infer<typeof estimateDetailCreateSchema>,
//     "estimate_id" | "sequence"
// >;
/** 親フォームが最低限もっているべき型 */
export type HasItems = {
    details: EstimateDetailCreateInput[];
};

/** 金額セル（数量×単価を自動計算） */
function AmountCell({ index }: { index: number }) {
    const quantity = useWatch<HasItems>({ name: `details.${index}.quantity` });
    const unitPrice = useWatch<HasItems>({ name: `details.${index}.unit_price` });
    const amount = (Number(quantity) || 0) * (Number(unitPrice) || 0);
    return <TableCell align="right">¥ {amount.toLocaleString()}</TableCell>;
}

export default function LinesTable() {
    const { control } = useFormContext<HasItems>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "details",
    });

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell width={48}>No.</TableCell>
                    <TableCell>摘要</TableCell>
                    <TableCell>規格</TableCell>
                    <TableCell width={160}>数量</TableCell>
                    <TableCell width={80}>単位</TableCell>
                    <TableCell width={160}>単価</TableCell>
                    <TableCell width={160} align="right">金額</TableCell>
                    <TableCell width={48}></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {fields.map((row, i) => (
                    <TableRow key={row.id}>
                        <TableCell>{i + 1}</TableCell>

                        <TableCell>
                            <Controller
                                control={control}
                                name={`details.${i}.abstract`}
                                render={({ field, fieldState }) => (
                                    <AbstractSelectField {...field} errorText={fieldState.error?.message} />
                                )}
                            />
                        </TableCell>

                        <TableCell>
                            <Controller
                                control={control}
                                name={`details.${i}.norm`}
                                render={({ field, fieldState }) => (
                                    <NormSelectField {...field} errorText={fieldState.error?.message} />
                                )}
                            />
                        </TableCell>

                        <TableCell>
                            <Controller
                                control={control}
                                name={`details.${i}.quantity`}
                                render={({ field, fieldState }) => (
                                    <NumberInputField {...field} errorText={fieldState.error?.message} label="数量" min={0} />
                                )}
                            />
                        </TableCell>

                        <TableCell>
                            <Controller
                                control={control}
                                name={`details.${i}.unit`}
                                render={({ field, fieldState }) => (
                                    <UnitSelectField {...field} errorText={fieldState.error?.message} />
                                )}
                            />
                        </TableCell>

                        <TableCell>
                            <Controller
                                control={control}
                                name={`details.${i}.unit_price`}
                                render={({ field, fieldState }) => (
                                    <NumberInputField {...field} errorText={fieldState.error?.message} label="単価" step={0.1} min={-99999} />
                                )}
                            />
                        </TableCell>

                        <AmountCell index={i} />

                        <TableCell>
                            <IconButton onClick={() => remove(i)} aria-label="delete" size="small">
                                <Delete fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}

                {/* 行追加 */}
                <TableRow>
                    <TableCell colSpan={8}>
                        <Button
                            startIcon={<Add />}
                            onClick={() =>
                                append({norm: "", abstract: "", unit: "", quantity: 0, unit_price: 0})
                            }
                            variant="outlined"
                            size="small"
                        >
                            行を追加
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
