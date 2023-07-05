const db = require('../database/db')

exports.get = async (id,email,activationLink) => {
    return ((await db.query(`select * from API_users where id=${id} or email='${email}' or activationlink='${activationLink}'`)).rows)[0]
}

exports.create = async (user) => {
    await db.query(`
        insert into API_users 
        (email, username, activationLink, isactivated, password) 
        values('${user.email}','${user.username}', '${user.activationLink}',false, '${user.password}');
    `)
    return (await db.query(`select * from API_users where email='${user.email}'`)).rows[0]
}


exports.activate = async (id) => {
    console.log(id);
    await db.query(`
        update API_users 
        set isactivated=true, activationlink='activated'
        where id=${id}
    `)
}