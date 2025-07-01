const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require : true,  
    },
    slug:{
        type:String,
        require : false,
        unique : false   
    },
    price:{
        type:Number,
        require : false,
    },
    enableSize: {
        type: Boolean,
        default: false
    },
    sizes: {
        type: [String],
        default: []
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref : 'Category'
    },
    shortDescription:{
        type:String,
        require : false,
    },
    description:{
        type:String,
        require : false,
    },
    images:{
        type:[String],
        require : false
    },
    status:{
        type:Boolean,
        default : true
    },
    quantity:{
        type:Number,
        default : 0
    }
})


const productModel = mongoose.model('Product', productSchema)

module.exports = productModel