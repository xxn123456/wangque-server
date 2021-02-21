
const cheerio = require('cheerio');
const https = require('https');
const fs = require('fs')
 
async function crawlingMKWImpl() {

    var strHtml = "";
        var results = [];
        https.get('https://www.imooc.com/search/?words=mongodb', function (res) {
            res.on('data', function (chunk) {//监听事件 传输
                strHtml += chunk;
            })
            res.on('end', function () {//数据传输完
                var $ = cheerio.load(strHtml);//cheerio模块开始处理 DOM处理
                        
                $('.tab_con > a').each((item, i) => {//遍历处理需要爬取的数据
                    var job = {};
                    //爬取内容时，一定要注意标签结构。按标签结构一层一层获取。
                    job.title = $(i).text().trim();
                    // job.desc = $(i).find(".item-detail > p").text().trim();
                    // //当一个div中有多个span标签及其他标签且没有选择器时，就要选择下标获取。eq(0)表示处于第一个span标签的内容。
                    // job.teacher = $(i).find(".item-detail > div > span > a").eq(0).text().trim();
                    // job.class = $(i).find(".item-detail > div > span").eq(1).text().trim();
                    // job.viewsNumber = $(i).find(".item-detail > div > span").eq(2).text().trim();
                    // job.tag = $(i).find(".item-detail > div > a > span").text().trim();
                    results.push(job);
                })
                console.log(results);
              
            })
        })

   
    // //通过https模块的get方法,请求 如下的网站链接,回调函数中 res就是请求所获取的资源
    // https.get('https://movie.douban.com/top250',function(res){
    //     // 由于获取的资源是分段返回的 我们需要自己拼接,因此创建一个空字符串用于拼接
    //     let html = ''
    //     // res.on类似于addEventListener,只不过这个监听的是data,
    //     //只要有数据产生就执行这个函数,chunk就是获取的数据,用html拼接
    //     res.on('data',function(chunk){
    //         html += chunk
    //     })
    //     // 监听只要res数据加载完成,那么我们就执行下面的回调函数
    //     res.on('end',function(){
    //         //这个时候就用到了cheerio,是我们可以使用dom操作
    //         const $ = cheerio.load(html)  //$是 cherrio 规定的
    //         //用该数组存放我们爬取的数据
    //         let allFilms = [] 
            
    //         $('li .item').each(function(){
    //             //this 循环时当前这个电影
    //             //当前这个电影下面的title
    //             const title = $('.title',this).text()
    //             const star = $('.rating_num',this).text()
    //             const pic = $('.pic img',this).attr('src')
    //             // 存成一个 json 文件 fs
    //             allFilms.push({title,star,pic})
    //         })
    //         fs.writeFile('./files.json',JSON.stringify(allFilms),function(err){
    //             if(!err){
    //                 console.log('文件写入完毕')
    //             }
    //         })
    //     })
    // })

}
module.exports={
    crawlingMKWImpl
}
