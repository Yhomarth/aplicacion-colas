const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {



    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                ok: false,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        callback(atenderTicket);



        //actualizar/notificar cambios en los ultimos 4



    });

});