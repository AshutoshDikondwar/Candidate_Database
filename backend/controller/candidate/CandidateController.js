const createCandidate = (req, res) => {
    const { name, email, skills, experience, location, video_results, coding_results } = req.body;
    const db = req.db;

    const sql = `Insert into candidates (name, email, skills, experience, location, video_results, coding_results) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, skills, experience, location, video_results, coding_results], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding candidate', success: false });
        }
        res.status(201).json({ message: "Candidate added successfully", success: true });
    })

}

const getCandidates = (req, res) => {
    const { skills, experience, location } = req.query;
    const db = req.db;

    let sql = `select * from candidates where 1=1`;

    if (skills) sql += ` and skills LIKE '%${skills}%'`;
    if (experience) sql += ` and experience >= ${experience}`;
    if (location) sql += ` and location LIKE '%${location}%'`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching candidates", success: false });
        }
        res.status(200).json({ candidates: results, success: true })
    })

}

const updateCandidate = async (req, res) => {
    const { id } = req.params;
    const { name, email, skills, experience, location, video_results, coding_results } = req.body;
    const db = req.db;

    const candidateExist = await checkIfCandidateExists(db, id)
    if (!candidateExist) {
        return res.status(409).json({ message: 'Candidate does not exist', success: false });
    }

    const sql = `update candidates set name = ?, email = ?, skills = ?, experience = ?, location = ?, video_results = ?, coding_results = ? WHERE id = ?`;

    db.query(sql, [name, email, skills, experience, location, video_results, coding_results, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating candidate", success: false });
        }
        res.status(200).json({ message: "Updated candidate successfully", success: true })
    })
}

const deleteCandidate = (req, res) => {
    const { id } = req.params;
    const db = req.db;
    const sql = `delete from candidates where id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting candidate", success: false })
        }
        res.status(200).json({ message: "Candidate deleted successfully", success: true })
    })
}


const checkIfCandidateExists = async (db, id) => {
    return new Promise((resolve, reject) => {
        const checkCandidateSql = 'SELECT * FROM candidates WHERE id = ?';
        db.query(checkCandidateSql, [id], (err, results) => {
            if (err) {
                return reject('Error checking candidate');
            }
            resolve(results.length > 0);
        });
    });
};



module.exports = {
    createCandidate,
    getCandidates,
    updateCandidate,
    deleteCandidate
}