-- 既存のテーブルを削除（存在すれば）
DROP TABLE IF EXISTS master_cars CASCADE;

CREATE TABLE master_cars (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    no integer,
    unit_price numeric NOT NULL DEFAULT 0,
    remarks text,
    valid_at timestamp with time zone NOT NULL DEFAULT '2024-01-01T00:00:00Z',
    invalid_at timestamp with time zone NOT NULL DEFAULT '2050-12-31T00:00:00Z',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- updated_at自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column_master_cars()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_timestamp_master_cars
BEFORE UPDATE ON master_cars
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column_master_cars();



-- RLSを有効化
ALTER TABLE master_cars ENABLE ROW LEVEL SECURITY;

-- 全行の読み書きを許可するポリシー
CREATE POLICY "Allow all access to master_cars"
    ON master_cars
    FOR ALL
    USING (true)
    WITH CHECK (true);
