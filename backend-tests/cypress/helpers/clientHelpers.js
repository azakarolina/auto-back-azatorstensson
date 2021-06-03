const faker = require("faker")

//functions
function createClientPayload(){
    let clientPayload = {
        "name": faker.name.firstName(),
        "email": faker.internet.email(),
        "telephone": faker.phone.phoneNumber()
       // "name":"Client01",
        //"email":"client01@email.com",
        //"telephone":"12312423423423"
    }

    return clientPayload
}   

function createClientRequest(){
    cy.request({
        method: 'POST',
        url:'http://localhost:3000/api/client/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },
        body:createClientPayload 
        
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({lastID:response.body.id})
       //cy.log(response.body.id)
    }))
}

function deleteClientRequest(idToDelete){
    cy.request({
        method: 'DELETE',
        url:'http://localhost:3000/api/client/'+idToDelete,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}
function changeClientRequest(){
    cy.request({
        method: "PUT",
        url:"http:localhost:3000/api/client/2",
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },
        body:{
        "id":2,
        "name":"Anna",
        "email":"anna@example.com",
        "telephone":"070 123 1234"
        }
        
        }).then((response => {
        expect(response.status).to.eq(200)
    }))
}
function changeClientReturnRequest() {
    cy.request({
        method: "PUT",
        url:"http:localhost:3000/api/client/2",
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },
        body: {
        "id":2,
        "name":"Mikael Eriksson",
        "email":"mikael.eriksson@example.com",
        "telephone":"070 000 0000"
        }
    }).then((response => {
        expect(response.status).to.eq(200)
}))
}
        
function performLogout(){
    cy.request({
        method: 'POST',
        url:'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}



//exports
module.exports = {
    createClientPayload,
    createClientRequest,
    deleteClientRequest,
    changeClientRequest,
    changeClientReturnRequest,
    performLogout
} 