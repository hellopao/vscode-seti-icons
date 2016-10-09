/**
 * @file 对二值图像进行膨胀
 * @author mengke01(kekee000@gmail.com)
 */




        var execute = require('../util/de').execute;

        module.exports = function (imageData, mode, radius) {
            return execute(imageData, 'dilate', mode, radius);
        };
    
