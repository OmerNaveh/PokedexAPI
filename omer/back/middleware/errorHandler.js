function errorHandler(err, req, res, next) {
    if (err.massage) {
        if (err.massage == '404') {
            res.status(404).send('Pokemon not found!')
        }
        if (err.massage == '403') {
            res.status(403).send('Releasing an uncaught pokemon, or catching an already caught pokemon')
        }
        if(err.message == '401'){
            res.status(401).send('unauthenticated user request')
        }
    } else {
        res.status(500).send('something went wrong')
    }

}

module.exports = errorHandler