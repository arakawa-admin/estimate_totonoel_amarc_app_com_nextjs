-- 既存のテーブルを削除（存在すれば）
DROP TABLE IF EXISTS master_staffs CASCADE;

CREATE TABLE master_staffs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    login_user_id uuid NOT NULL,
    name text NOT NULL,
    kana text NOT NULL,
    is_editor boolean NOT NULL DEFAULT false,
    remarks text,
    valid_at timestamp with time zone NOT NULL DEFAULT '2024-01-01T00:00:00Z',
    invalid_at timestamp with time zone NOT NULL DEFAULT '2050-12-31T00:00:00Z',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),

    -- 外部キー制約
    CONSTRAINT fk_login_user
        FOREIGN KEY (login_user_id)
        REFERENCES master_login_users(id)
        ON DELETE CASCADE
);

-- updated_at自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column_master_staffs()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_timestamp_master_staffs
BEFORE UPDATE ON master_staffs
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column_master_staffs();



-- RLSを有効化
ALTER TABLE master_staffs ENABLE ROW LEVEL SECURITY;

-- 全行の読み書きを許可するポリシー
CREATE POLICY "Allow all access to master_staffs"
    ON master_staffs
    FOR ALL
    USING (true)
    WITH CHECK (true);
