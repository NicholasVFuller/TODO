CREATE TABLE TodoItems (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    IsCompleted BOOLEAN NOT NULL DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO TodoItems (Title, Description, IsCompleted) VALUES
('Sample Todo 1', 'This is a sample todo item.', FALSE),
('Sample Todo 2', 'This is another sample todo item.', TRUE);