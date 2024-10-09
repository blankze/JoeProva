const express = require('express')
const app = express()
const port = 3000

// Importante para converter os dados que chegam no POST para JSON. Sem isso o body da requisição não aparece
app.use(express.json());

let data = {
    'customers' : []
}

app.get('/customers', (req, res) => {
    res.json(data)
})

app.post('/customers', (req, res) => {
    
    // Normalmente, estes dados são enviados ao banco de dados, que nos retorna um ID
    // Vamos simular isso atribuindo ao ID o INDEX que o item terá no array
    
    let newCustomer = req.body
    newCustomer.id = data.customers.length

    data.customers.push(newCustomer)
    res.status(201).json({"new_customer_id": newCustomer.id})
})

// Buscar cliente por ID
app.get('/customers/:id', (req, res) => {
    let idUsuario = req.params.id;
    let customer = data.customers.find(c => c.id == idUsuario)

    if (customer) {
        res.json(customer)
    } else {
        res.status(404).json({"error": "Cliente não encontrado"})
    }
})

// Alterar dados do cliente por ID
app.put('/customers/:id', (req, res) => {
    let idUsuario = req.params.id
    let customer = data.customers.find(c => c.id == idUsuario)

    if (customer) {
        customer.name = req.body.name || customer.name
        customer.email = req.body.email || customer.email
        res.json({"message": "Cliente atualizado com sucesso"})
    } else {
        res.status(404).json({"error": "Cliente não encontrado"})
    }
});

// Remover cliente por ID
app.delete('/customers/:id', (req, res) => {
    let idUsuario = req.params.id
    let customer = data.customers.find(c => c.id == idUsuario)

    if (customer) {
        data.customers.splice(customer, 1)
        res.status(204).send()
    } else {
        res.status(404).json({"error": "Cliente não encontrado"})
    }
});


app.listen(port, () => {
    console.log('Example app listening on port: ' + port)
})
