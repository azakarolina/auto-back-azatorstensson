//const faker = require("faker")

//functions
function createRoomPayload(){
    let roomPayload = {
       // "name": faker.name.firstName(),
        //"email": faker.internet.email(),
        //"telephone": faker.phone.phoneNumber()
       // "name":"Client01",
        //"email":"client01@email.com",
        //"telephone":"12312423423423"
       
        "CATEGORY": "Double", //Det här kommer inte med i testen och jag förstår inte riktigt varför. har letat i inspectorn efter ledtrådar
        "NUMBER": "3",
        "FLOOR": "3",
        "AVAILABLE": "click",
        "PRICE": "3000",
        "FEATURES": "Balcony"
    }

    return roomPayload
}   

function createRoomRequest(){
    cy.request({
        method: 'POST',
        url:'http://localhost:3000/api/room/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },
        body:createRoomPayload 
        
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({lastID:response.body.id})
       //cy.log(response.body.id)
    }))
}

function deleteRoomRequest(idToDelete){
    cy.request({
        method: 'DELETE',
        url:'http://localhost:3000/api/room/'+idToDelete,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
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
    createRoomPayload,
    createRoomRequest,
    deleteRoomRequest,
    performLogout
} 