-- 既存のテーブルを削除（存在すれば）
DROP TABLE IF EXISTS estimate_details CASCADE;

CREATE TABLE estimate_details (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id uuid NOT NULL,
    sequence integer NOT NULL,

    norm text NOT NULL,
    abstract text NOT NULL,
    unit text NOT NULL,

    quantity numeric NOT NULL DEFAULT 0,
    unit_price numeric NOT NULL DEFAULT 0,

    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),

    -- 外部キー制約
    CONSTRAINT fk_estimate
        FOREIGN KEY (estimate_id)
        REFERENCES estimates(id)
        ON DELETE CASCADE,

    -- 1つの estimate_id に同じ sequence が入らないよう 複合UNIQUE
    CONSTRAINT uq_estimate_sequence UNIQUE (estimate_id, sequence)
);

-- updated_at自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column_estimate_details()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_timestamp_estimate_details
BEFORE UPDATE ON estimate_details
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column_estimate_details();

-- RLSを有効化
ALTER TABLE estimate_details ENABLE ROW LEVEL SECURITY;

-- 全行の読み書きを許可するポリシー
CREATE POLICY "Allow all access to estimate_details"
    ON estimate_details
    FOR ALL
    USING (true)
    WITH CHECK (true);
