const db = require('../database/db')

exports.find = async (id,refreshtoken) => {  
    return ((await db.query(`select * from tokens where id=${id} or refreshtoken='${refreshtoken}'`)).rows)[0]
}

exports.save = async (token) => {
    await db.query(`update tokens set refreshtoken='${token.refreshtoken}' where id=${token.id};`)
}

exports.create = async(id, refreshToken) => {
    await db.query(`insert into tokens (id, refreshToken) values('${id}','${refreshToken}');`)
}

exports.delete = async(refreshToken) => {
    const token = (await (await db.query(`select * from tokens where refreshToken='${refreshToken}'`)).rows)[0]
    if (!token) {
        throw {status: 500, error: "token error"}
    }
    await db.query(`delete from tokens where id=${token.id}`)
    return token
}
