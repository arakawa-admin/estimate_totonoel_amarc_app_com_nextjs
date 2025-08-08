-- 既存テーブルを削除（存在すれば）
DROP TABLE IF EXISTS estimates CASCADE;

CREATE TABLE estimates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_at timestamp with time zone NOT NULL DEFAULT now(),

    title text NOT NULL,
    customer_name text NOT NULL,

    -- FK
    author_id uuid NOT NULL,
    staff_id uuid NOT NULL,

    place text NOT NULL,
    remarks text,

    deleted_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),

    -- 外部キー制約
    CONSTRAINT fk_author
        FOREIGN KEY (author_id)
        REFERENCES master_staffs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_staff
        FOREIGN KEY (staff_id)
        REFERENCES master_staffs(id)
        ON DELETE CASCADE
);


-- updated_at自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column_estimates()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_timestamp_estimates
BEFORE UPDATE ON estimates
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column_estimates();


-- RLSを有効化
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;

-- 全行の読み書きを許可するポリシー
CREATE POLICY "Allow all access to estimates"
    ON estimates
    FOR ALL
    USING (true)
    WITH CHECK (true);
