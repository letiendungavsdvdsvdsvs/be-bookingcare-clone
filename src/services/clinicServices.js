import db from "../models"

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imgBase64 || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imgBase64,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: ['contentMarkdown', 'contentHTML', 'name', 'address']
                })
                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: id },
                        attributes: ['doctorId', 'provinceId']
                    })
                    data.doctorClinic = doctorClinic
                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createClinic, getAllClinic,
    getDetailClinicById
}