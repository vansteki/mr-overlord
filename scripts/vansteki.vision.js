/**
 * Created by minecraft on 2016/5/6.
 */
var cmd = require("commander");
var fetch = require("node-fetch");
var API_KEY = GOOGLE_VISION_APIKEY;
var base64 = require('node-base64-image');

function detectFaces(msg, cmd, image) {
    vision.detectFaces(image, (err, faces, apiResponse) => {
        if (!image) return;
        if (err) throw err;
        if (cmd.debug) console.log(faces, apiResponse);
        msg.send(JSON.stringify(faces));
    });
}


module.exports = (robot) => {
    robot.hear(/vi */i, (msg) => {
        var input = msg.match.input.split(" ");
        input.unshift("padding");

        cmd
            .option('-d, --detect [detect]', 'feed me an image')
            //.option('-f, --face [face]', 'identify face')
            //.option('-g, --debug', 'show detail info')
            //.option('-t, --test', 'test what u want')
            .parse(input);

        //if (cmd.debug) console.log(Object.prototype.toString.call(msg.match.input), input);
        if (cmd.detect) {
            detect(msg, cmd.detect);
        }
    });
};

function detect(msg, imageUrl) {
    if (!imageUrl) return;
    var options = {string: true};
    base64.base64encoder(imageUrl, options, function (err, image) {
        if (err) {
            console.log(err);
            msg.send("vi failed");
        }
        handler(image);
    });
    function handler(imageBase64){
        var req = {
            "requests": [
                {
                    "features": [
                        {
                            "type": "LABEL_DETECTION"
                        }
                    ],
                    "image": {
                        "content": imageBase64
                    }
                }
            ]
        };
        var api = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;
        fetch(api, {
            method: 'POST',
            body: JSON.stringify(req)
        }).then(function (res) {
            return res.json()
        }).then( (data) => {
            //console.log(JSON.stringify(data.responses[0].labelAnnotations))
            var descs = data.responses[0].labelAnnotations.map(val=>{
                return val.description
            });
            msg.send(descs);
        });
    }
}
