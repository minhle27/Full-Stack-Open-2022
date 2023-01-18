const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
const Person = mongoose.model('Person', peopleSchema)

if (process.argv.length === 3 || process.argv.length === 5) {
    const password = process.argv[2]
    const url = `mongodb+srv://minhle27:${password}@cluster0.miuidtm.mongodb.net/Phonebook?retryWrites=true&w=majority`

    if (process.argv.length === 5){
        field1 = process.argv[3]
        field2 = process.argv[4]
        mongoose
            .connect(url)
            .then(result => {
                console.log('connected')

                const person = new Person({
                    name: field1,
                    number: field2
                })
                
                return person.save()
            })
            .then(() => {
                console.log(`added ${field1} number ${field2} to phonebook`)
                return mongoose.connection.close()
            })
            .catch((err) => console.log(err))
    }

    else{
        mongoose
            .connect(url)
            .then(result => {
                console.log('phonebook:')
                Person.find({}).then(result => {
                    result.forEach(person => {
                        console.log(`${person.name} ${person.number}`)
                    })
                    mongoose.connection.close()
                })
            })
    }
}
else{
    console.log('Follow the form: node mongo.js <password> or node mongo.js <password> <name> <number>')
    process.exit(1)
}