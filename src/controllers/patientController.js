import patientService from '../services/patientServices'

let postBookAppoinment = async (req, res) => {
    try {
        let response = await patientService.postBookAppoinment(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postVerifyBookAppoinment = async (req, res) => {
    try {
        let response = await patientService.postVerifyBookAppoinment(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    postBookAppoinment, postVerifyBookAppoinment
}