"use strict";
exports.__esModule = true;
var DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
var MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
function getTime(d) {
    if (d === void 0) { d = new Date; }
    var day = DAYS[d.getDay()];
    var month = MONTHS[d.getMonth()];
    var hour = d.getHours();
    var ampm;
    if (hour > 12) {
        hour = hour - 12;
        ampm = 'pm';
    }
    else {
        ampm = 'am';
    }
    var salutation;
    switch (d.getHours().toString()) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
            salutation = 'Go to sleep,';
            break;
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '11':
            salutation = 'Good morning,';
            break;
        case '12':
        case '13':
        case '14':
        case '15':
        case '16':
        case '17':
            salutation = 'Good afternoon,';
            break;
        case '18':
        case '19':
        case '20':
        case '21':
        case '22':
        case '23':
            salutation = 'Good evening,';
            break;
    }
    var date = day + ", " + month + " " + d.getDate() + ", " + d.getFullYear();
    var time = hour + ":" + d.getMinutes() + ampm;
    return salutation + " it's " + time + " on " + date + " in Portland, OR.\r\n";
}
var net = require("net");
function tcpServer(messageProvider) {
    net.createServer(function (socket) {
        console.log("tcp connection from " + socket.remoteAddress);
        socket.write(messageProvider());
        socket.end();
    })
        .listen(13, function () {
        console.log('daytime listening on tcp :13');
    });
}
var udp = require("dgram");
function udpServer(messageProvider) {
    var udpSock = udp.createSocket('udp4');
    udpSock.on('message', function (msg, rinfo) {
        console.log("udp dgram from " + rinfo.address + ":" + rinfo.port);
        udpSock.send(messageProvider(), rinfo.port, rinfo.address);
    })
        .on('listening', function () {
        console.log('daytime listening on udp :13');
    })
        .bind(13);
}
tcpServer(getTime);
udpServer(getTime);
