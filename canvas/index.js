window.drawStock = function (data) {
    var
        canvas = document.getElementById('stock-canvas'),
        width = canvas.width,
        height = canvas.height,
        ctx = canvas.getContext('2d');
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    // 画上背景
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // 得出数据中的最大和最小值
    //var highest = data[0].high;
    //var lowest = data[0].low;
    //for (let i = 1; i < data.length; i++){
    //    if (highest < data[i].high)
    //        highest = data[i].high;
    //    if (lowest > data[i].low)
    //        lowest = data[i].low;
    //}
    // 参考别人后求最大最小值的简化方式
    var highest = data.reduce(function(x, y){ return x.high > y.high ? x : y }).high;
    var lowest = data.reduce(function(x, y){ return x.low < y.low ? x : y }).low;

    // 计算每个柱形的宽度的一半（避免后面循环时需要除以二）
    var everyHalfWidth = width / data.length / 2;
    // 计算数据中最高点和最低点的差值
    var heightDiff = highest - lowest;

    // 循环绘制每个柱形
    for (var i = 0; i < data.length; i++){
        // 获取某点在Canvas中的Y轴坐标
        var getRealY = function(point){
            return (highest - point) / heightDiff * height;
        };

        var
            // 获取柱形中心X坐标
            centerX = everyHalfWidth * (i * 2 + 1),
            // 获取最高点Y坐标
            highY = getRealY(data[i].high),
            // 获取最低点Y坐标
            lowY = getRealY(data[i].low),
            // 获取开盘点Y坐标
            openY = getRealY(data[i].open),
            // 获取收盘点Y坐标
            closeY = getRealY(data[i].close);

        // 根据开盘点和收盘点的高低来判断是红色还是蓝色
        if (openY > closeY){
            ctx.fillStyle = '#F65655';
            ctx.strokeStyle = '#F65655';
        } else {
            ctx.fillStyle = '#56F1F2';
            ctx.strokeStyle = '#56F1F2';
        }
        // 绘制柱形
        ctx.fillRect(centerX - everyHalfWidth, openY, everyHalfWidth * 2, closeY - openY);

        // 绘制中间线
        ctx.beginPath();
        ctx.moveTo(centerX, highY);
        ctx.lineTo(centerX, lowY);
        ctx.stroke();
    }
};