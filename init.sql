CREATE TABLE API_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isActivated Boolean NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tokens (
    id INT,
    refreshToken TEXT NOT NULL
);