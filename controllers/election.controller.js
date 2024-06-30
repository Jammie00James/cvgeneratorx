const ElectionService = require('../services/election.services')
const CustomError = require('../utils/custom-errors')


exports.generate = async (req, res) => {
    try {
        const { personal_info,contact_info, skills, years_expirience, projects, professional_experience, education } = req.body
        let result = await ElectionService.generate(personal_info,contact_info, skills, years_expirience, projects, professional_experience, education)

        res.status(201).json({ result })

    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'An error occured' });
        }
    }
}

// exports.get = async (req, res) => {
//     try {
//         const id = req.params.id
//         let election = await ElectionService.get(id)
//         res.status(201).json({ "Message": "found", election })

//     } catch (error) {
//         if (error instanceof CustomError) {
//             res.status(error.status).json({ error: error.message });
//         } else {
//             console.error(error);
//             res.status(500).json({ error: 'An error occured' });
//         }
//     }
// }

// exports.vote = async (req, res) => {
//     try {
//         const id = req.params.id
//         const { votes, userId } = req.body
//         let election = await ElectionService.vote(id,userId, votes )
//         res.status(201).json({ "Message": "voted", election })

//     } catch (error) {
//         if (error instanceof CustomError) {
//             res.status(error.status).json({ error: error.message });
//         } else {
//             console.error(error);
//             res.status(500).json({ error: 'An error occured' });
//         }
//     }
// }