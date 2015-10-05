var _ = require("lodash"),
    https = require("https"),
    EventEmitter = require('events').EventEmitter;
var fileDate = (function() { //return format like 20150926
    var d = new Date;
    var year = d.getFullYear().toString();
    var month = ((d.getMonth()+1).toString().length <= 1 ? "0" + (d.getMonth()+1) : (d.getMonth()+1));
    var date = ((d.getDate()).toString().length <= 1 ? "0" + (d.getDate()) : (d.getDate()));
    return year + month + date
})();

module.exports = function(robot) {

robot.hear(/ri (\D+)>(\D+)/i, function(msg) {
    var dataPrepare = new EventEmitter();
    var getUnique = function(arr) {
        var que = [];
        for(var i = 0; i < arr.length; i++) {
            for(var j = i + 1; j < arr.length; j++) {
              if(arr[i] === arr[j]) j = ++i;
            }
            que.push(arr[i]);
        }
        return que;
    };
    var getDuplicate = function(arr) {
        var que = [];
        for(var i = 0; i < arr.length; i++) {
            for(var j = i + 1; j < arr.length; j++) {
              if(arr[i] === arr[j]){
                j = ++i;
                que.push(arr[i]);
              }
            }
        }
        return getUnique(que);
    };

    var unixifyTime = function(convertTime) {
        ////new Date.parse('December 17, 1995 03:24:00');
        var dateObj = new Date();
        return Date.parse(monthNames[dateObj.getMonth()] + " " + dateObj.getDate() + "," + dateObj.getFullYear() + " " + convertTime);
    }

    var stationList = [{"id": 1001, "name": "基隆"}, {"id": 1002, "name": "八堵"}, {"id": 1003, "name": "七堵"}, {"id": 1004, "name": "五堵"}, {"id": 1005, "name": "汐止"}, {"id": 1006, "name": "南港"}, {"id": 1007, "name": "松山"}, {"id": 1008, "name": "台北"}, {"id": 1009, "name": "萬華"}, {"id": 1011, "name": "板橋"}, {"id": 1032, "name": "浮洲"}, {"id": 1012, "name": "樹林"}, {"id": 1013, "name": "山佳"}, {"id": 1014, "name": "鶯歌"}, {"id": 1015, "name": "桃園"}, {"id": 1016, "name": "內壢"}, {"id": 1017, "name": "中壢"}, {"id": 1018, "name": "埔心"}, {"id": 1019, "name": "楊梅"}, {"id": 1020, "name": "富岡"}, {"id": 1021, "name": "湖口"}, {"id": 1022, "name": "新豐"}, {"id": 1023, "name": "竹北"}, {"id": 1024, "name": "北新竹"}, {"id": 1025, "name": "新竹"}, {"id": 1026, "name": "香山"}, {"id": 1027, "name": "崎頂"}, {"id": 1028, "name": "竹南"}, {"id": 1029, "name": "三坑"}, {"id": 1030, "name": "百福"}, {"id": 1031, "name": "汐科"}, {"id": 1102, "name": "談文"}, {"id": 1103, "name": "談文南"}, {"id": 1104, "name": "大山"}, {"id": 1105, "name": "後龍"}, {"id": 1106, "name": "龍港"}, {"id": 1107, "name": "白沙屯"}, {"id": 1108, "name": "新埔"}, {"id": 1109, "name": "通霄"}, {"id": 1110, "name": "苑裡"}, {"id": 1111, "name": "日南"}, {"id": 1112, "name": "大甲"}, {"id": 1113, "name": "台中港"}, {"id": 1114, "name": "清水"}, {"id": 1115, "name": "沙鹿"}, {"id": 1116, "name": "龍井"}, {"id": 1117, "name": "大肚"}, {"id": 1118, "name": "追分"}, {"id": 1119, "name": "大肚溪南"}, {"id": 1120, "name": "彰化"}, {"id": 1202, "name": "花壇"}, {"id": 1203, "name": "員林"}, {"id": 1204, "name": "永靖"}, {"id": 1205, "name": "社頭"}, {"id": 1206, "name": "田中"}, {"id": 1207, "name": "二水"}, {"id": 1208, "name": "林內"}, {"id": 1209, "name": "石榴"}, {"id": 1210, "name": "斗六"}, {"id": 1211, "name": "斗南"}, {"id": 1212, "name": "石龜"}, {"id": 1213, "name": "大林"}, {"id": 1214, "name": "民雄"}, {"id": 1215, "name": "嘉義"}, {"id": 1217, "name": "水上"}, {"id": 1218, "name": "南靖"}, {"id": 1219, "name": "後壁"}, {"id": 1220, "name": "新營"}, {"id": 1221, "name": "柳營"}, {"id": 1222, "name": "林鳳營"}, {"id": 1223, "name": "隆田"}, {"id": 1224, "name": "拔林"}, {"id": 1225, "name": "善化"}, {"id": 1226, "name": "新市"}, {"id": 1227, "name": "永康"}, {"id": 1228, "name": "台南"}, {"id": 1229, "name": "保安"}, {"id": 1230, "name": "中洲"}, {"id": 1231, "name": "大湖"}, {"id": 1232, "name": "路竹"}, {"id": 1233, "name": "岡山"}, {"id": 1234, "name": "橋頭"}, {"id": 1235, "name": "楠梓"}, {"id": 1236, "name": "左營"}, {"id": 1237, "name": "鼓山"}, {"id": 1238, "name": "高雄"}, {"id": 1239, "name": "大橋"}, {"id": 1240, "name": "大村"}, {"id": 1241, "name": "嘉北"}, {"id": 1242, "name": "新左營"}, {"id": 1302, "name": "造橋"}, {"id": 1304, "name": "豐富"}, {"id": 1305, "name": "苗栗"}, {"id": 1307, "name": "南勢"}, {"id": 1308, "name": "銅鑼"}, {"id": 1310, "name": "三義"}, {"id": 1314, "name": "泰安"}, {"id": 1315, "name": "后里"}, {"id": 1317, "name": "豐原"}, {"id": 1318, "name": "潭子"}, {"id": 1319, "name": "台中"}, {"id": 1320, "name": "烏日"}, {"id": 1321, "name": "成功"}, {"id": 1322, "name": "大慶"}, {"id": 1323, "name": "太原"}, {"id": 1324, "name": "新烏日"}, {"id": 1402, "name": "鳳山"}, {"id": 1403, "name": "後庄"}, {"id": 1404, "name": "九曲堂"}, {"id": 1405, "name": "六塊厝"}, {"id": 1406, "name": "屏東"}, {"id": 1407, "name": "歸來"}, {"id": 1408, "name": "麟洛"}, {"id": 1409, "name": "西勢"}, {"id": 1410, "name": "竹田"}, {"id": 1411, "name": "潮州"}, {"id": 1412, "name": "崁頂"}, {"id": 1413, "name": "南州"}, {"id": 1414, "name": "鎮安"}, {"id": 1415, "name": "林邊"}, {"id": 1416, "name": "佳冬"}, {"id": 1417, "name": "東海"}, {"id": 1418, "name": "枋寮"}, {"id": 1502, "name": "加祿"}, {"id": 1503, "name": "內獅"}, {"id": 1504, "name": "枋山"}, {"id": 1505, "name": "枋野"}, {"id": 1506, "name": "中央"}, {"id": 1507, "name": "古莊"}, {"id": 1508, "name": "大武"}, {"id": 1510, "name": "瀧溪"}, {"id": 1511, "name": "多良"}, {"id": 1512, "name": "金崙"}, {"id": 1514, "name": "太麻里"}, {"id": 1516, "name": "知本"}, {"id": 1517, "name": "康樂"}, {"id": 1602, "name": "吉安"}, {"id": 1604, "name": "志學"}, {"id": 1605, "name": "平和"}, {"id": 1606, "name": "壽豐"}, {"id": 1607, "name": "豐田"}, {"id": 1608, "name": "溪口"}, {"id": 1609, "name": "南平"}, {"id": 1610, "name": "鳳林"}, {"id": 1611, "name": "萬榮"}, {"id": 1612, "name": "光復"}, {"id": 1613, "name": "大富"}, {"id": 1614, "name": "富源"}, {"id": 1616, "name": "瑞穗"}, {"id": 1617, "name": "三民"}, {"id": 1619, "name": "玉里"}, {"id": 1620, "name": "安通"}, {"id": 1621, "name": "東里"}, {"id": 1622, "name": "東竹"}, {"id": 1623, "name": "富里"}, {"id": 1624, "name": "池上"}, {"id": 1625, "name": "海端"}, {"id": 1626, "name": "關山"}, {"id": 1627, "name": "月美"}, {"id": 1628, "name": "瑞和"}, {"id": 1629, "name": "瑞源"}, {"id": 1630, "name": "鹿野"}, {"id": 1631, "name": "山里"}, {"id": 1632, "name": "台東"}, {"id": 1633, "name": "馬(廢)蘭"}, {"id": 1634, "name": "台(廢)東"}, {"id": 1635, "name": "舞鶴"}, {"id": 1703, "name": "永樂"}, {"id": 1704, "name": "東澳"}, {"id": 1705, "name": "南澳"}, {"id": 1706, "name": "武塔"}, {"id": 1708, "name": "漢本"}, {"id": 1709, "name": "和平"}, {"id": 1710, "name": "和仁"}, {"id": 1711, "name": "崇德"}, {"id": 1712, "name": "新城"}, {"id": 1713, "name": "景美"}, {"id": 1714, "name": "北埔"}, {"id": 1715, "name": "花蓮"}, {"id": 1802, "name": "暖暖"}, {"id": 1803, "name": "四腳亭"}, {"id": 1804, "name": "瑞芳"}, {"id": 1805, "name": "侯硐"}, {"id": 1806, "name": "三貂嶺"}, {"id": 1807, "name": "牡丹"}, {"id": 1808, "name": "雙溪"}, {"id": 1809, "name": "貢寮"}, {"id": 1810, "name": "福隆"}, {"id": 1811, "name": "石城"}, {"id": 1812, "name": "大里"}, {"id": 1813, "name": "大溪"}, {"id": 1814, "name": "龜山"}, {"id": 1815, "name": "外澳"}, {"id": 1816, "name": "頭城"}, {"id": 1817, "name": "頂埔"}, {"id": 1818, "name": "礁溪"}, {"id": 1819, "name": "四城"}, {"id": 1820, "name": "宜蘭"}, {"id": 1821, "name": "二結"}, {"id": 1822, "name": "中里"}, {"id": 1823, "name": "羅東"}, {"id": 1824, "name": "冬山"}, {"id": 1825, "name": "新馬"}, {"id": 1826, "name": "蘇澳新"}, {"id": 1827, "name": "蘇澳"}, {"id": 1903, "name": "大華"}, {"id": 1904, "name": "十分"}, {"id": 1905, "name": "望古"}, {"id": 1906, "name": "嶺腳"}, {"id": 1907, "name": "平溪"}, {"id": 1908, "name": "菁桐"}, {"id": 2002, "name": "深澳"}, {"id": 2102, "name": "五福"}, {"id": 2103, "name": "林口"}, {"id": 2104, "name": "電廠"}, {"id": 2105, "name": "桃中"}, {"id": 2106, "name": "寶山"}, {"id": 2107, "name": "南祥"}, {"id": 2108, "name": "長興"}, {"id": 2109, "name": "海山站"}, {"id": 2110, "name": "海湖站"}, {"id": 2212, "name": "千甲"}, {"id": 2213, "name": "新莊"}, {"id": 2203, "name": "竹中"}, {"id": 2214, "name": "六家"}, {"id": 2204, "name": "上員"}, {"id": 2205, "name": "竹東"}, {"id": 2206, "name": "橫山"}, {"id": 2207, "name": "九讚頭"}, {"id": 2208, "name": "合興"}, {"id": 2209, "name": "富貴"}, {"id": 2210, "name": "內灣"}, {"id": 2211, "name": "榮華"}, {"id": 2302, "name": "台中港貨"}, {"id": 2402, "name": "龍井煤場"}, {"id": 2502, "name": "神岡"}, {"id": 2702, "name": "源泉"}, {"id": 2703, "name": "濁水"}, {"id": 2704, "name": "龍泉"}, {"id": 2705, "name": "集集"}, {"id": 2706, "name": "水里"}, {"id": 2707, "name": "車埕"}, {"id": 2802, "name": "南調"}, {"id": 2902, "name": "高雄港"}, {"id": 3102, "name": "前鎮"}, {"id": 3202, "name": "花蓮港"}, {"id": 3302, "name": "中興一號"}, {"id": 3402, "name": "中興二號"}, {"id": 3902, "name": "機廠"}, {"id": 4102, "name": "樹調"}, {"id": 4202, "name": "東港支線"}, {"id": 4302, "name": "東南支線"}, {"id": 1244, "name": "南科"}, {"id": 5101, "name": "長榮大學"}, {"id": 5102, "name": "沙崙"}, {"id": 1033, "name": "北湖"}, {"id": 6103, "name": "海科館"}, {"id": 1243, "name": "仁德"} ];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // var input = "大慶>清水".match(/(\D+)>(\D+)/)
    var settings = {};
        settings.des = {id: undefined, name: undefined};
        settings.start = {id: undefined, name: undefined};
    var trainToStartOrDes = [];
    var trainInfo = {}; //res.TaiTrainList.TrainInfo

    (function() {
        var result = "";
        var url = "https://mr--overlord.firebaseio.com/rail/" + fileDate + ".json";
        https.get(url, function(res, err) {
            res.on("data", function(res) {
                result += res.toString();
            }).on("end", function() {
                // console.log(result)
                data = result;
                trainInfo = JSON.parse(result).TaiTrainList.TrainInfo;
                dataPrepare.emit('done', msg);
            });
        });
    })(trainInfo, msg);

    dataPrepare.on('donex', function() {
        console.log(trainInfo, typeof trainInfo, trainInfo.forEach, trainInfo.length)
        debugger
    })

    dataPrepare.on('done', function(msg) {

        stationList.map(function(station,k){
            if (station.name === msg.match[2]) settings.des = station;
            // if (station.name === input[2]) settings.des = station;
        });
        stationList.map(function(station,k){
            if (station.name === msg.match[1]) settings.start = station;
            // if (station.name === input[1]) settings.start = station;
        });
        // console.log(trainInfo, settings.des, settings.start, _.contains, trainInfo.length);

        trainInfo.forEach(function(train) {
           train.TimeInfo.forEach(function(tinfo,k){
               if(_.contains(_.values(tinfo), settings.des.id.toString()) || _.contains(_.values(tinfo), settings.start.id.toString())) trainToStartOrDes.push(train.Train);
           });
        });
        // console.log(trainToStartOrDes, "trainToStartOrDes")

        // var possibleTrain = getDuplicate(trainToStartOrDes).sort().length == 0 ? trainToStartOrDes: getDuplicate(trainToStartOrDes).sort();
        var possibleTrain = getDuplicate(trainToStartOrDes).sort();
        var unsortedList = []
        // console.log(possibleTrain, "possibleTrain")

        possibleTrain.forEach(function(v, k) {
            trainInfo.forEach(function(train) {
                 if (v === train.Train) unsortedList.push(train)
            })
        });

        var finalList = [];
        // console.log(unsortedList, "unsortedList")
        unsortedList.forEach(function(trainInfo) {
            var pair = _.filter(trainInfo.TimeInfo, function(info) {
                return info.Station == settings.des.id || info.Station == settings.start.id
            });
            // console.log(pair, "pair")
            var des = _.find(pair, function(v,k) { if (v.Station == settings.des.id) return v.ARRTime;  });
            var start = _.find(pair, function(v,k) { if (v.Station == settings.start.id) return v.ARRTime;  });
            if (unixifyTime(des.ARRTime) > unixifyTime(start.ARRTime)) finalList.push(trainInfo);
        });

        var outPutPairList = [];
        finalList.forEach(function(trainInfo) {
            _.values(trainInfo.TimeInfo).forEach(function(stage) {
                var pair = _.filter(trainInfo.TimeInfo, function(info) {
                    return info.Station == settings.des.id || info.Station == settings.start.id
                });
                trainInfo.pair = pair;
            })
            outPutPairList.push(trainInfo);
        })

        // console.log(outPutPairList)
        msg.send("\n"+ fileDate + " 由 " + msg.match[2] + " 開往 " + msg.match[1])
        msg.send("\n車次\t開車\t抵達\t\n")
        outPutPairList.forEach(function(trainInfo) {
            //console.log("%s\t%s\t%s", trainInfo.Train, trainInfo.pair[0].ARRTime.slice(0,-3), trainInfo.pair[1].DEPTime.slice(0,-3));
            msg.send(trainInfo.Train + "\t" + trainInfo.pair[0].ARRTime.slice(0,-3) + "\t" +  trainInfo.pair[1].DEPTime.slice(0,-3))
        });
    });//dataPrepare.on done
}); //end robot.hear
};//end module export
