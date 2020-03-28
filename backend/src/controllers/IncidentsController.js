const connection = require('../database/connection.js')

module.exports = {
    async index(request, response){
        // Listar casos

        const { page = 1 } = request.query

        // Obtendo o total de registros em 'incidents'
        const [count] = await connection('incidents').count()
        // console.log(count)

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) // mostrar apenas 5 registros
        .offset((page - 1) * 5) // Ignorar os primeiros n registros
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])
        
        // Informando o total de registros no cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response){
        // Cadastrar caso

        const { title, description, value } = request.body
        const ong_id = request.headers.authorization  //atributo authorization de header -> id logado

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents').where('id', id).select('ong_id').first()

        if(incident.ong_id != ong_id){
            // http status code 401 -> unauthorized
            return response.status(401).json({ erro: 'Operation not permitted.'})
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()  // 204 -> not content
    }
}
