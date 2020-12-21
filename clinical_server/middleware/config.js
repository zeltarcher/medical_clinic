const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
       
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb+srv://ltthanh:thanh213@cluster0.pntnj.mongodb.net/Admin-Portal?retryWrites=true&w=majority'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}