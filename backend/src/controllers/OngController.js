const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        // Listar ONGs
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },
    
    async create(request, response) {
        // Cadastrar ONG no banco de dados

        const { name, email, whatsapp, city, uf } = request.body
        const id = crypto.randomBytes(4).toString('HEX') //Gerar 4 caract. aleatórios hexadecimais

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    }
}