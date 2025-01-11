exports.createProfile = (req, res) => {
    const { name, age, gender, location, interests } = req.body;

    if (!name || !age || !gender || !location || !interests) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Mock success response
    res.status(201).json({ message: 'Profile created successfully.' });
};
