exports.handler = function (event, context, callback) {
    const midtransClient = require('midtrans-client');

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    }

    // Create Snap API instance
    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    const { id, amount, name, email } = JSON.parse(event.body);

    const names = name.split(' ');
    let first_name, last_name;

    if (names && names.length > 1) {
        first_name = names[0];
        last_name = names[1];
    } else if (names.length == 1) {
        first_name = names[0];
        last_name = '';
    }

    let parameters = {
        "transaction_details": {
            "order_id": `SHR-BWL-${id}-${+new Date()}`,
            "gross_amount": parseInt(amount)
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            first_name,
            last_name,
            email
        }
    }

    snap.createTransaction(parameters)
        .then((transaction) => {
            // transaction token
            console.log(transaction);

            const { token, redirect_url } = transaction;
            console.log('Token ' + token);
            console.log('Redirect Url ' + redirect_url);

            callback(null, {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    url: redirect_url,
                    params: parameters
                })
            })
        }).catch(function (err) {
            callback(null, {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: err.message
                })
            })
        })
}