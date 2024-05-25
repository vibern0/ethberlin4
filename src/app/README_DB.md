CREATE FUNCTION get_mentors_with_connection_status(current_user_identifier VARCHAR)
RETURNS TABLE (
    mentor_id BIGINT,
    mentor_identifier VARCHAR,
    social JSONB,
    username VARCHAR,
    bio VARCHAR,
    events JSONB,
    topic_title VARCHAR,
    topic_description VARCHAR,
    expire_at TIMESTAMP WITH TIME ZONE,
    connection_status INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        aum.user_id AS mentor_id,
        au.identifier AS mentor_identifier,
        au.social,
        au.username,
        au.bio,
        au.events,
        aum.topic_title,
        aum.topic_description,
        aum.expire_at,
        CASE 
            WHEN EXISTS (
                SELECT 1
                FROM app_user_connections auc
                JOIN app_user cu ON auc.from = cu.id
                WHERE auc.to = au.id 
                AND cu.identifier = current_user_identifier
            ) THEN 
                CASE 
                    WHEN (SELECT auc.accepted FROM app_user_connections auc WHERE auc.to = au.id AND auc.from = (SELECT id FROM app_user WHERE identifier = current_user_identifier) LIMIT 1) IS TRUE THEN 1
                    ELSE 0
                END
            ELSE 0 
        END AS connection_status
    FROM 
        app_user_mentor aum
    JOIN 
        app_user au ON aum.user_id = au.id
    WHERE 
        aum.expire_at > NOW();
END;
$$ LANGUAGE plpgsql;







CREATE VIEW mentor_requests AS
SELECT 
    auc.id AS connection_id,
    auc.from AS mentee_id,
    auc.to AS mentor_id,
    auc.channel AS channel,
    mentee.identifier AS mentee_identifier,
    mentee.username AS mentee_username,
    mentee.social AS mentee_social,
    mentee.bio AS mentee_bio,
    mentee.events AS mentee_events,
    mentor.identifier AS mentor_identifier,
    auc.accepted AS request_status
FROM 
    app_user_connections auc
JOIN 
    app_user mentee ON auc.from = mentee.id
JOIN 
    app_user mentor ON auc.to = mentor.id
JOIN 
    app_user_mentor aum ON auc.to = aum.user_id
WHERE 
    aum.expire_at > NOW();
