/**
 * Created by minecraft on 2016/5/6.
 */
const config = {
    projectId: 'api-project-936567901853',
    credentials: {
            "type": process.env.GC_TYPE,
            "project_id": process.env.GC_PROJECT_ID,
            "private_key_id": process.env.PRIVATE_KEY_ID,
            "private_key": process.env.PRIVATE_KEY,
            "client_email": process.env.CLIENT_EMAIL,
            "client_id": process.env.CLIENT_ID,
            "auth_uri": process.env.AUTH_URI,
            "token_uri": process.env.TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
            "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
    }
};
//const testConfig = {
//    projectId: 'api-project-936567901853',
//    keyFilename: 'scripts/test-06eca1432d47.json'
//};
var gcloud = require('gcloud')(testConfig),
    vision = gcloud.vision();
var cmd = require("commander");

function detectFaces(msg, cmd, image) {
    vision.detectFaces(image, (err, faces, apiResponse) => {
        if (!image) return;
        if (err) throw err;
        if (cmd.debug) console.log(faces, apiResponse);
        msg.send(JSON.stringify(faces));
    });
}
function detect(msg, cmd, image, types = ['label']) {
    if (!image) return;
    vision.detect(image, types, (err, detection, apiResponse) => {
        if (err) throw err;
            console.log(detection);
            msg.send(detection);
    });
}

module.exports = (robot) => {
    robot.hear(/vi */i, (msg)=> {
        var input = msg.match.input.split(" ");
            input.unshift("padding");

        cmd
            .option('-d, --detect [detect]', 'feed me an image')
            //.option('-f, --face [face]', 'identify face')
            //.option('-g, --debug', 'show detail info')
            //.option('-t, --test', 'test what u want')
            .parse(input);

        //if (cmd.debug) console.log(Object.prototype.toString.call(msg.match.input), input);
        if (cmd.detect){
            detect(msg, cmd, cmd.detect);
        }else{
            detect(msg, cmd, input[2]);
        }
    });
};
