module.exports = function() {
    var client = 'app',
        clientApp = './app'
        dist = 'dist',
        tmp = '.tmp';            
    var config = {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + "/index.html",
        alljs: [
            client + "/**/*.js",
            './*.js'
        ],
        assets: [
            client + "/views/**/*.html",            
            client + "/libs/**/*", 
            client + "/images/**/*",
            client + "/fonts/**/*"
        ],
        fonts: client + "/components/components-font-awesome/fonts/**/*.*" , 
        js: [
            clientApp + "/**/*.module.js",
            clientApp + "/**/*.js"
        ],          
        allToClean: [
            tmp, 
            ".DS_Store",           
            "node_modules",
            ".git",
            client + "/components",              
            "readme.md"
        ]
    };
 
    return config;
};