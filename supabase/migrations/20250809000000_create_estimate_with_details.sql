create or replace function public.create_estimate_with_details(
    p_title text,
    p_author_id uuid,
    p_staff_id uuid,
    p_estimate_at date,
    p_customer_name text,
    p_place text,
    p_remarks text,
    p_details jsonb
)
returns uuid
language plpgsql
as $$
declare
    v_estimate_id uuid;
begin
    insert into estimates (title, author_id, staff_id, estimate_at, customer_name, place, remarks)
    values (p_title, p_author_id, p_staff_id, p_estimate_at, p_customer_name, p_place, p_remarks)
    returning id into v_estimate_id;

    insert into estimate_details (estimate_id, sequence, abstract, norm, quantity, unit, unit_price)
    select
        v_estimate_id,
        row_number() over (order by 1),   -- 1..N を自動で付与
        d.abstract, d.norm, d.quantity, d.unit, d.unit_price
    from jsonb_to_recordset(p_details) as d(
        abstract text, norm text, quantity numeric, unit text, unit_price numeric
    );

    return v_estimate_id;
end;
$$;
