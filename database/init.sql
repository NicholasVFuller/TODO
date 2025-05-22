DROP TABLE IF EXISTS todoitems;

CREATE TABLE todoitems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    iscomplete BOOLEAN NOT NULL DEFAULT FALSE,
    completedat BIGINT,
    ordernum INT NOT NULL DEFAULT 0
);

INSERT INTO todoitems (name, iscomplete, completedat, ordernum) VALUES
('Sample Todo 1', FALSE, NULL, 0),
('Sample Todo 2', TRUE, EXTRACT(EPOCH FROM NOW())::BIGINT, 1);