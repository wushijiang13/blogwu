let config = {
    entryUrl: process.env.PACK_NAME == 'articleAdmin' ? "./src/view/module/articleAdmin/main.js"
        : "./src/main.js",
}
module.exports=config;