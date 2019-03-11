const server = require('http').createServer();
const io = require('socket.io')(server);

const userInfo = {};

const wordList = [
    {'word': 'aliceblue', 'color': '#F0F8FF'}, 
    {'word': 'antiquewhite', 'color': '#FAEBD7'}, 
    {'word': 'aqua', 'color': '#00FFFF'}, 
    {'word': 'aquamarine', 'color': '#7FFFD4'}, 
    {'word': 'azure', 'color': '#F0FFFF'}, 
    {'word': 'beige', 'color': '#F5F5DC'}, 
    {'word': 'bisque', 'color': '#FFE4C4'}, 
    {'word': 'black', 'color': '#000000'}, 
    {'word': 'blanchedalmond', 'color': '#FFEBCD'}, 
    {'word': 'blue', 'color': '#0000FF'}, 
    {'word': 'blueviolet', 'color': '#8A2BE2'}, 
    {'word': 'brown', 'color': '#A52A2A'}, 
    {'word': 'burlywood', 'color': '#DEB887'}, 
    {'word': 'cadetblue', 'color': '#5F9EA0'}, 
    {'word': 'chartreuse', 'color': '#7FFF00'}, 
    {'word': 'chocolate', 'color': '#D2691E'}, 
    {'word': 'coral', 'color': '#FF7F50'}, 
    {'word': 'cornflowerblue', 'color': '#6495ED'}, 
    {'word': 'cornsilk', 'color': '#FFF8DC'}, 
    {'word': 'crimson', 'color': '#DC143C'}, 
    {'word': 'cyan', 'color': '#00FFFF'}, 
    {'word': 'darkblue', 'color': '#00008B'}, 
    {'word': 'darkcyan', 'color': '#008B8B'}, 
    {'word': 'darkgoldenrod', 'color': '#B8860B'}, 
    {'word': 'darkgray', 'color': '#A9A9A9'}, 
    {'word': 'darkgreen', 'color': '#006400'}, 
    {'word': 'darkgrey', 'color': '#A9A9A9'}, 
    {'word': 'darkkhaki', 'color': '#BDB76B'}, 
    {'word': 'darkmagenta', 'color': '#8B008B'}, 
    {'word': 'darkolivegreen', 'color': '#556B2F'}, 
    {'word': 'darkorange', 'color': '#FF8C00'}, 
    {'word': 'darkorchid', 'color': '#9932CC'}, 
    {'word': 'darkred', 'color': '#8B0000'}, 
    {'word': 'darksalmon', 'color': '#E9967A'}, 
    {'word': 'darkseagreen', 'color': '#8FBC8F'}, 
    {'word': 'darkslateblue', 'color': '#483D8B'}, 
    {'word': 'darkslategray', 'color': '#2F4F4F'}, 
    {'word': 'darkslategrey', 'color': '#2F4F4F'}, 
    {'word': 'darkturquoise', 'color': '#00CED1'}, 
    {'word': 'darkviolet', 'color': '#9400D3'}, 
    {'word': 'deeppink', 'color': '#FF1493'}, 
    {'word': 'deepskyblue', 'color': '#00BFFF'}, 
    {'word': 'dimgray', 'color': '#696969'}, 
    {'word': 'dimgrey', 'color': '#696969'}, 
    {'word': 'dodgerblue', 'color': '#1E90FF'}, 
    {'word': 'firebrick', 'color': '#B22222'}, 
    {'word': 'floralwhite', 'color': '#FFFAF0'}, 
    {'word': 'forestgreen', 'color': '#228B22'}, 
    {'word': 'fuchsia', 'color': '#FF00FF'}, 
    {'word': 'gainsboro', 'color': '#DCDCDC'}, 
    {'word': 'ghostwhite', 'color': '#F8F8FF'}, 
    {'word': 'gold', 'color': '#FFD700'}, 
    {'word': 'goldenrod', 'color': '#DAA520'}, 
    {'word': 'gray', 'color': '#808080'}, 
    {'word': 'grey', 'color': '#808080'}, 
    {'word': 'green', 'color': '#008000'}, 
    {'word': 'greenyellow', 'color': '#ADFF2F'}, 
    {'word': 'honeydew', 'color': '#F0FFF0'}, 
    {'word': 'hotpink', 'color': '#FF69B4'}, 
    {'word': 'indianred', 'color': '#CD5C5C'}, 
    {'word': 'indigo', 'color': '#4B0082'}, 
    {'word': 'ivory', 'color': '#FFFFF0'}, 
    {'word': 'khaki', 'color': '#F0E68C'}, 
    {'word': 'lavender', 'color': '#E6E6FA'}, 
    {'word': 'lavenderblush', 'color': '#FFF0F5'}, 
    {'word': 'lawngreen', 'color': '#7CFC00'}, 
    {'word': 'lemonchiffon', 'color': '#FFFACD'}, 
    {'word': 'lightblue', 'color': '#ADD8E6'}, 
    {'word': 'lightcoral', 'color': '#F08080'}, 
    {'word': 'lightcyan', 'color': '#E0FFFF'}, 
    {'word': 'lightgoldenrodyellow', 'color': '#FAFAD2'}, 
    {'word': 'lightgray', 'color': '#D3D3D3'}, 
    {'word': 'lightgreen', 'color': '#90EE90'}, 
    {'word': 'lightgrey', 'color': '#D3D3D3'}, 
    {'word': 'lightpink', 'color': '#FFB6C1'}, 
    {'word': 'lightsalmon', 'color': '#FFA07A'}, 
    {'word': 'lightseagreen', 'color': '#20B2AA'}, 
    {'word': 'lightskyblue', 'color': '#87CEFA'}, 
    {'word': 'lightslategray', 'color': '#778899'}, 
    {'word': 'lightslategrey', 'color': '#778899'}, 
    {'word': 'lightsteelblue', 'color': '#B0C4DE'}, 
    {'word': 'lightyellow', 'color': '#FFFFE0'}, 
    {'word': 'lime', 'color': '#00FF00'}, 
    {'word': 'limegreen', 'color': '#32CD32'}, 
    {'word': 'linen', 'color': '#FAF0E6'}, 
    {'word': 'magenta', 'color': '#FF00FF'}, 
    {'word': 'maroon', 'color': '#800000'}, 
    {'word': 'mediumaquamarine', 'color': '#66CDAA'}, 
    {'word': 'mediumblue', 'color': '#0000CD'}, 
    {'word': 'mediumorchid', 'color': '#BA55D3'}, 
    {'word': 'mediumpurple', 'color': '#9370DB'}, 
    {'word': 'mediumseagreen', 'color': '#3CB371'}, 
    {'word': 'mediumslateblue', 'color': '#7B68EE'}, 
    {'word': 'mediumspringgreen', 'color': '#00FA9A'}, 
    {'word': 'mediumturquoise', 'color': '#48D1CC'}, 
    {'word': 'mediumvioletred', 'color': '#C71585'}, 
    {'word': 'midnightblue', 'color': '#191970'}, 
    {'word': 'mintcream', 'color': '#F5FFFA'}, 
    {'word': 'mistyrose', 'color': '#FFE4E1'}, 
    {'word': 'moccasin', 'color': '#FFE4B5'}, 
    {'word': 'navajowhite', 'color': '#FFDEAD'}, 
    {'word': 'navy', 'color': '#000080'}, 
    {'word': 'oldlace', 'color': '#FDF5E6'}, 
    {'word': 'olive', 'color': '#808000'}, 
    {'word': 'olivedrab', 'color': '#6B8E23'}, 
    {'word': 'orange', 'color': '#FFA500'}, 
    {'word': 'orangered', 'color': '#FF4500'}, 
    {'word': 'orchid', 'color': '#DA70D6'}, 
    {'word': 'palegoldenrod', 'color': '#EEE8AA'}, 
    {'word': 'palegreen', 'color': '#98FB98'}, 
    {'word': 'paleturquoise', 'color': '#AFEEEE'}, 
    {'word': 'palevioletred', 'color': '#DB7093'}, 
    {'word': 'papayawhip', 'color': '#FFEFD5'}, 
    {'word': 'peachpuff', 'color': '#FFDAB9'}, 
    {'word': 'peru', 'color': '#CD853F'}, 
    {'word': 'pink', 'color': '#FFC0CB'}, 
    {'word': 'plum', 'color': '#DDA0DD'}, 
    {'word': 'powderblue', 'color': '#B0E0E6'}, 
    {'word': 'purple', 'color': '#800080'}, 
    {'word': 'red', 'color': '#FF0000'}, 
    {'word': 'rosybrown', 'color': '#BC8F8F'}, 
    {'word': 'royalblue', 'color': '#4169E1'}, 
    {'word': 'saddlebrown', 'color': '#8B4513'}, 
    {'word': 'salmon', 'color': '#FA8072'}, 
    {'word': 'sandybrown', 'color': '#F4A460'}, 
    {'word': 'seagreen', 'color': '#2E8B57'}, 
    {'word': 'seashell', 'color': '#2E8B57'}, 
    {'word': 'sienna', 'color': '#A0522D'}, 
    {'word': 'silver', 'color': '#C0C0C0'}, 
    {'word': 'skyblue', 'color': '#87CEEB'}, 
    {'word': 'slateblue', 'color': '#6A5ACD'}, 
    {'word': 'slategray', 'color': '#708090'}, 
    {'word': 'slategrey', 'color': '#708090'}, 
    {'word': 'snow', 'color': '#FFFAFA'}, 
    {'word': 'springgreen', 'color': '#00FF7F'}, 
    {'word': 'steelblue', 'color': '#4682B4'}, 
    {'word': 'tan', 'color': '#D2B48C'}, 
    {'word': 'teal', 'color': '#008080'}, 
    {'word': 'thistle', 'color': '#D8BFD8'}, 
    {'word': 'tomato', 'color': '#FF6347'}, 
    {'word': 'turquoise', 'color': '#40E0D0'}, 
    {'word': 'violet', 'color': '#EE82EE'}, 
    {'word': 'wheat', 'color': '#F5DEB3'}, 
    {'word': 'white', 'color': '#FFFFFF'}, 
    {'word': 'whitesmoke', 'color': '#F5F5F5'}, 
    {'word': 'yellow', 'color': '#FFFF00'}, 
    {'word': 'yellowgreen', 'color': '#9ACD32'}
];

let lastScores = [];
const numberOfWords = 15;

const sendWords = function sendWord(client) {

    const words = [];
    for (let x = 0; x < numberOfWords; x++) {
        let wordIndex = Math.floor(Math.random() * wordList.length);
        let colourIndex = Math.floor(Math.random() * wordList.length);
        words.push({
            word: wordList[wordIndex].word,
            color: wordList[colourIndex].color,
        });
    }
    console.log('Sending words', words);
    client.emit('words', words);
};

io.on('connection', client => {
    client.join('/game-room', () => {
        console.info(`New user joined ${Object.keys(userInfo).length} users in game.`);
        sendWords(client);        
    });

    client.on('disconnect', (reason) => {
        delete userInfo[client.userName];
        console.info(`User left. ${Object.keys(userInfo).length} users left in game.`);
    });

    client.on('score', (data) => {
        const { userName, totalTime } = data;

        if (!userInfo[userName]) {
            userInfo[userName] = { totalTime: 0, sessions: 0 };
        }

        userInfo[userName].sessions++;
        userInfo[userName].totalTime += totalTime;
        client.userName = userName;
    });
});

setInterval(() => {

    const scores = [];

    const userNames = Object.keys(userInfo);

    for (let user of userNames) {
        if (!userInfo[user].sessions) {
            continue;
        }

        const sessions = userInfo[user].sessions;
        const average = userInfo[user].totalTime / (1.0 * userInfo[user].sessions * numberOfWords);
        scores.push({user, average});
        console.log(scores);
    }

    scores.sort((userA, userB) =>  userA.average - userB.average).reverse();
    
    // let sendScores = false;

    // if (lastScores.length != 0)  {
    //     console.log('comparing', { scores, lastScores});
    //     for (let x = 0; x < Math.min(10, scores.length, lastScores.length); x++) {
    //         if (scores[x].userName != lastScores[x].userName) {
    //             sendScores = true;
    //         }
    //     }

    //     if (!sendScores) {
    //         return;
    //     }
    // }

    // lastScores = scores.slice(0);
    // console.log('Last score', lastScores);

    io.emit('leaderboard', scores);
}, 5000);



server.listen(4000);