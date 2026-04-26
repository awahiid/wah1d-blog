INSERT INTO tag (name) VALUES ('Spring Boot') ON CONFLICT (name) DO NOTHING;
INSERT INTO tag (name) VALUES ('Kotlin') ON CONFLICT (name) DO NOTHING;
INSERT INTO tag (name) VALUES ('React') ON CONFLICT (name) DO NOTHING;
INSERT INTO tag (name) VALUES ('TypeScript') ON CONFLICT (name) DO NOTHING;

INSERT INTO section (name) VALUES ('Software') ON CONFLICT (name) DO NOTHING;
INSERT INTO section (name) VALUES ('Learning') ON CONFLICT (name) DO NOTHING;
INSERT INTO section (name) VALUES ('Thoughts') ON CONFLICT (name) DO NOTHING;